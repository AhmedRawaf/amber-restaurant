from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("restaurant.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

admin.site.site_header = "عنبر | Amber Restaurant Admin"
admin.site.site_title = "Amber Admin"
admin.site.index_title = "Restaurant Management"
