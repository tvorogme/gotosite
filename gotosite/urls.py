from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.contrib import admin

from main.views import *

urlpatterns = [
    # Admin
    url(r'^admin/', admin.site.urls),

    # Index
    url(r'^$', index, name='index'),

    # About
    url(r'^about_us/$', about_us, name='about_us'),

    # Profile
    url(r'^profile/$', profile_page, name='SelfProfile'),
    url(r'^profile/(?P<_id>[0-9]+)/$', profile_page, name='Profile'),
    url(r'^profile/edit/$', update_profile),

    # Login system
    url(r'^logout/$', logout_wrapper),
    url(r'^login/$', login_wrapper),
    url(r'^register/$', register),

    # Social backend
    url(r'^accounts/', include('allauth.urls'))
]

if settings.DEBUG:
    from django.views.static import serve

    urlpatterns.append(url(r'^favicon.ico', lambda r: serve(r, 'favicon.ico')))

if settings.DEBUG:
    # static files (images, css, javascript, etc.)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
