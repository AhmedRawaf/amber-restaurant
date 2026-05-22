from django.contrib import admin
from django.utils.html import format_html
from .models import MenuItem, Reservation


@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ["name_ar", "name", "category", "price_display", "is_featured", "is_available", "image_preview"]
    list_filter = ["category", "is_featured", "is_available", "spice_level"]
    search_fields = ["name", "name_ar", "description"]
    list_editable = ["is_featured", "is_available"]
    list_per_page = 25
    fieldsets = (
        ("المعلومات الأساسية | Basic Info", {
            "fields": ("name", "name_ar", "category", "price", "image")
        }),
        ("الوصف | Description", {
            "fields": ("description", "description_ar")
        }),
        ("التفاصيل | Details", {
            "fields": ("spice_level", "calories", "prep_time", "is_featured", "is_available")
        }),
    )

    def price_display(self, obj):
        return format_html('<strong style="color:#FFD700">{} ريال</strong>', obj.price)
    price_display.short_description = "السعر"

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" style="object-fit:cover;border-radius:4px"/>', obj.image.url)
        return "—"
    image_preview.short_description = "الصورة"


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ["name", "phone", "date", "time", "guests", "status_badge", "created_at"]
    list_filter = ["status", "date", "guests"]
    search_fields = ["name", "phone", "email"]
    list_editable = []
    readonly_fields = ["created_at", "updated_at"]
    ordering = ["-date", "-created_at"]
    list_per_page = 30

    STATUS_COLORS = {
        "pending": "#F59E0B",
        "confirmed": "#10B981",
        "cancelled": "#EF4444",
        "completed": "#6366F1",
    }

    def status_badge(self, obj):
        color = self.STATUS_COLORS.get(obj.status, "#888")
        return format_html(
            '<span style="background:{};color:white;padding:3px 10px;border-radius:20px;font-size:12px">{}</span>',
            color,
            obj.get_status_display(),
        )
    status_badge.short_description = "الحالة"

    actions = ["mark_confirmed", "mark_cancelled"]

    @admin.action(description="تأكيد الحجوزات المحددة")
    def mark_confirmed(self, request, queryset):
        updated = queryset.update(status="confirmed")
        self.message_user(request, f"تم تأكيد {updated} حجز.")

    @admin.action(description="إلغاء الحجوزات المحددة")
    def mark_cancelled(self, request, queryset):
        updated = queryset.update(status="cancelled")
        self.message_user(request, f"تم إلغاء {updated} حجز.")
