from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from django.contrib import admin

from main.views import *

urlpatterns = [
    # Admin
    url(r'^admin/', admin.site.urls),

    # Logout
    url(r'^logout/', logout_wrapper),

    # Index
    url(r'^$', index, name='index'),

    # About
    url(r'^about_us/', about_us, name='about_us'),
]

if settings.DEBUG:
    # static files (images, css, javascript, etc.)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
