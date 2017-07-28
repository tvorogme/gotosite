from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from django.contrib import admin

from main.views import *

urlpatterns = [
    # Admin
    url(r'^admin/', admin.site.urls),

    # Index
    url(r'^$', index, name='index'),

    # About
    url(r'^about_us/', about_us, name='about_us'),

    # Profile
    url(r'^profile/', ProfileView.as_view(), name='SelfProfile'),
    url(r'^profile/(?P<id>[0-9]+)', ProfileView.as_view(), name='Profile'),
    url(r'^logout/', logout_wrapper),
    url(r'^login/', login_wrapper),
    url(r'^favicon.ico', get_favicon)
]

if settings.DEBUG:
    # static files (images, css, javascript, etc.)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
