from django.urls import path
from . import views

urlpatterns = [
    path("menu/", views.MenuItemListView.as_view(), name="menu-list"),
    path("menu/<int:pk>/", views.MenuItemDetailView.as_view(), name="menu-detail"),
    path("reservations/", views.ReservationCreateView.as_view(), name="reservation-create"),
    path("reservations/<int:pk>/", views.ReservationDetailView.as_view(), name="reservation-detail"),
]
