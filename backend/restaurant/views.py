from rest_framework import generics, status
from rest_framework.response import Response
from .models import MenuItem, Reservation
from .serializers import MenuItemSerializer, ReservationSerializer


class MenuItemListView(generics.ListAPIView):
    serializer_class = MenuItemSerializer

    def get_queryset(self):
        queryset = MenuItem.objects.filter(is_available=True)
        category = self.request.query_params.get("category")
        featured = self.request.query_params.get("featured")

        if category:
            queryset = queryset.filter(category=category)
        if featured == "true":
            queryset = queryset.filter(is_featured=True)

        return queryset

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context


class MenuItemDetailView(generics.RetrieveAPIView):
    queryset = MenuItem.objects.filter(is_available=True)
    serializer_class = MenuItemSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context


class ReservationCreateView(generics.CreateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            reservation = serializer.save()
            return Response(
                {
                    "success": True,
                    "message": "تم تأكيد حجزك بنجاح! سنتواصل معك قريباً للتأكيد.",
                    "reservation_id": reservation.id,
                    "data": serializer.data,
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(
            {"success": False, "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )


class ReservationDetailView(generics.RetrieveAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
