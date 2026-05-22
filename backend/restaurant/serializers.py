from rest_framework import serializers
from django.utils import timezone
from .models import MenuItem, Reservation
import datetime


class MenuItemSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source="get_category_display", read_only=True)
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = MenuItem
        fields = [
            "id", "name", "name_ar", "description", "description_ar",
            "price", "category", "category_display", "image", "image_url",
            "is_featured", "is_available", "spice_level", "calories", "prep_time",
        ]

    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = [
            "id", "name", "phone", "email", "date", "time",
            "guests", "status", "notes", "created_at",
        ]
        read_only_fields = ["id", "status", "created_at"]

    def validate_date(self, value):
        if value < datetime.date.today():
            raise serializers.ValidationError("لا يمكن الحجز في تاريخ ماضٍ.")
        return value

    def validate_phone(self, value):
        cleaned = "".join(c for c in value if c.isdigit() or c == "+")
        if len(cleaned) < 9:
            raise serializers.ValidationError("رقم الجوال غير صحيح.")
        return value

    def validate_guests(self, value):
        if value < 1:
            raise serializers.ValidationError("يجب أن يكون عدد الأشخاص 1 على الأقل.")
        if value > 30:
            raise serializers.ValidationError("للحجوزات أكثر من 30 شخصاً، يرجى التواصل مباشرة.")
        return value
