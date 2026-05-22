from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class MenuItem(models.Model):
    CATEGORY_CHOICES = [
        ("appetizers", "المقبلات | Appetizers"),
        ("mains", "الأطباق الرئيسية | Main Courses"),
        ("desserts", "الحلويات | Desserts"),
        ("drinks", "المشروبات | Drinks"),
    ]

    name = models.CharField(max_length=200, verbose_name="الاسم")
    name_ar = models.CharField(max_length=200, blank=True, verbose_name="الاسم بالعربية")
    description = models.TextField(verbose_name="الوصف")
    description_ar = models.TextField(blank=True, verbose_name="الوصف بالعربية")
    price = models.DecimalField(
        max_digits=10, decimal_places=2,
        validators=[MinValueValidator(0)],
        verbose_name="السعر (ريال)"
    )
    category = models.CharField(
        max_length=50, choices=CATEGORY_CHOICES,
        verbose_name="الفئة"
    )
    image = models.ImageField(
        upload_to="menu/", blank=True, null=True,
        verbose_name="الصورة"
    )
    is_featured = models.BooleanField(default=False, verbose_name="مميز")
    is_available = models.BooleanField(default=True, verbose_name="متاح")
    spice_level = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(3)],
        verbose_name="مستوى الحرارة (0-3)",
        help_text="0 = بدون حرارة, 1 = خفيف, 2 = متوسط, 3 = حار"
    )
    calories = models.IntegerField(null=True, blank=True, verbose_name="السعرات الحرارية")
    prep_time = models.IntegerField(
        null=True, blank=True,
        verbose_name="وقت التحضير (دقيقة)"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "عنصر القائمة | Menu Item"
        verbose_name_plural = "قائمة الطعام | Menu Items"
        ordering = ["category", "name"]

    def __str__(self):
        return f"{self.name_ar or self.name} — {self.get_category_display()}"


class Reservation(models.Model):
    STATUS_CHOICES = [
        ("pending", "قيد الانتظار | Pending"),
        ("confirmed", "مؤكد | Confirmed"),
        ("cancelled", "ملغي | Cancelled"),
        ("completed", "مكتمل | Completed"),
    ]

    TIME_CHOICES = [
        ("12:00", "12:00 ظهراً"),
        ("12:30", "12:30 ظهراً"),
        ("13:00", "01:00 مساءً"),
        ("13:30", "01:30 مساءً"),
        ("14:00", "02:00 مساءً"),
        ("14:30", "02:30 مساءً"),
        ("15:00", "03:00 مساءً"),
        ("18:00", "06:00 مساءً"),
        ("18:30", "06:30 مساءً"),
        ("19:00", "07:00 مساءً"),
        ("19:30", "07:30 مساءً"),
        ("20:00", "08:00 مساءً"),
        ("20:30", "08:30 مساءً"),
        ("21:00", "09:00 مساءً"),
        ("21:30", "09:30 مساءً"),
        ("22:00", "10:00 مساءً"),
        ("22:30", "10:30 مساءً"),
        ("23:00", "11:00 مساءً"),
    ]

    name = models.CharField(max_length=200, verbose_name="الاسم الكامل")
    phone = models.CharField(max_length=20, verbose_name="رقم الجوال")
    email = models.EmailField(blank=True, verbose_name="البريد الإلكتروني")
    date = models.DateField(verbose_name="تاريخ الحجز")
    time = models.CharField(
        max_length=10, choices=TIME_CHOICES,
        verbose_name="وقت الحجز"
    )
    guests = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(30)],
        verbose_name="عدد الأشخاص"
    )
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES,
        default="pending", verbose_name="حالة الحجز"
    )
    notes = models.TextField(blank=True, verbose_name="ملاحظات خاصة")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "حجز | Reservation"
        verbose_name_plural = "الحجوزات | Reservations"
        ordering = ["-date", "-created_at"]

    def __str__(self):
        return f"{self.name} — {self.date} {self.time} ({self.guests} أشخاص)"
