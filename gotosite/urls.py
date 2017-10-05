from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.contrib import admin

from main.views import *

urlpatterns = [
    # url(r'^/', include([
    # Admin
    url(r'^admin/', admin.site.urls),

    # Index
    url(r'^$', index, name='index'),

    # About
    url(r'^about_us/$', about_us, name='about_us'),

    # Pages
    url(r'^co-working/$', coWorking, name='about_us'),
    url(r'^studio/$', studio, name='about_us'),
    url(r'^camp_autumn/$', camp_autumn, name='about_us'),

    # Profile
    url(r'^profile/$', profile_page, name='SelfProfile'),
    url(r'^profile/(?P<_id>[0-9]+)/$', profile_page, name='Profile'),
    url(r'^profile/edit/$', update_profile),
    url(r'^profile/remove_education/$', remove_education),
    url(r'^profile/add_achievement/$', add_achievement),
    url(r'^profile/add_project/$', add_project),
    url(r'^profile/remove_achievement/$', remove_achievement),
    url(r'^profile/remove_project/$', remove_project),

    # Login system
    url(r'^logout/$', logout_wrapper),
    url(r'^login/$', login_wrapper),
    url(r'^activate/', activation),

    # Signup render
    url(r'^signup/$', signup_page),

    # Social backend
    url(r'^accounts/', include('allauth.urls')),

    # API
    url(r'^api/get_needed_skills/', get_needed_skills),
    url(r'^api/get_needed_cities/', get_needed_cities),
    url(r'^api/get_needed_schools_names/', get_needed_schools_names),
    url(r'^api/update_avatar/', update_avatar),
    url(r'^api/get_user_info/', generate_csv),

    # Bank
    url(r'^bank/shop/', shop),
    url(r'^bank/buy/', buy_good)
    # ]))
]

if settings.DEBUG:
    from django.views.static import serve

    urlpatterns.append(url(r'^favicon.ico', lambda r: serve(r, 'favicon.ico')))

if settings.DEBUG:
    # static files (images, css, javascript, etc.)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
