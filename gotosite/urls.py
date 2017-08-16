from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.contrib import admin

from main.views import *

domain = 'http://localhost:8000/new/'

urlpatterns = [
    # Admin
    url(r'^%sadmin/' % domain, admin.site.urls),

    # Index
    url(r'^%s$' % domain, index, name='index'),

    # About
    # url(r'^about_us/$', about_us, name='about_us'),

    # Profile
    url(r'^%sprofile/$' % domain, profile_page, name='SelfProfile'),
    url(r'^%sprofile/(?P<_id>[0-9]+)/$' % domain, profile_page, name='Profile'),
    url(r'^%sprofile/edit/$' % domain, update_profile),
    url(r'^%sprofile/remove_education/$' % domain, remove_education),
    url(r'^%sprofile/add_achievement/$' % domain, add_achievement),
    url(r'^%sprofile/remove_achievement/$' % domain, remove_achievement),

    # Login system
    url(r'^%slogout/$' % domain, logout_wrapper),
    url(r'^%slogin/$' % domain, login_wrapper),
    url(r'^%sactivate/' % domain, activation),

    # Signup render
    url(r'^%ssignup/$' % domain, signup_page),

    # Social backend
    url(r'^%saccounts/' % domain, include('allauth.urls')),

    # API
    url(r'^%sapi/get_needed_skills/' % domain, get_needed_skills),
    url(r'^%sapi/get_needed_cities/' % domain, get_needed_cities),
    url(r'^%sapi/get_needed_schools_names/' % domain, get_needed_schools_names),
    url(r'^%sapi/update_avatar/' % domain, update_avatar)
]

if settings.DEBUG:
    from django.views.static import serve

    urlpatterns.append(url(r'^favicon.ico', lambda r: serve(r, 'favicon.ico')))

if settings.DEBUG:
    # static files (images, css, javascript, etc.)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
