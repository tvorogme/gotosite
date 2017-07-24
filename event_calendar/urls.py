from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from django.contrib import admin

from main.event_calendar import views as event_calendar_views
from main.gotosite import views as gotosite_views

urlpatterns = [
    # Admin view
    url(r'^admin/', admin.site.urls)
]

# GoTo Site Views
urlpatterns += [
    url(r'^$', gotosite_views.index, name='index'),
    url(r'^about_us/', gotosite_views.about_us, name='about_us'),
]

# Event calendar views
urlpatterns += [
    url(r'^register_person/', event_calendar_views.RegisterPerson.as_view(), name='RegisterPerson'),
    url(r'^register_organization/', event_calendar_views.RegisterOrganization.as_view(), name='RegisterOrganization'),
    url(r'^register_event/', event_calendar_views.RegisterEvent.as_view(), name='RegisterEvent'),
    url(r'^register_project/', event_calendar_views.RegisterProject.as_view(), name='RegisterProject'),
    url(r'^register_event/$', event_calendar_views.RegisterEvent.as_view(), name='RegisterEvent'),
    url(r'^(?P<event_id>[0-9]+)/event_profile/$', event_calendar_views.event_profile, name='event_profile'),
    url(r'^(?P<project_id>[0-9]+)/project_profile/$', event_calendar_views.project_profile, name='project_profile'),
    url(r'^register_person/$', event_calendar_views.RegisterPerson.as_view(), name='RegisterPerson'),
    url(r'^profile/$', event_calendar_views.SelfProfileView.as_view(), name='SelfProfile'),
    url(r'^profile/(?P<id>[0-9]+)', event_calendar_views.ProfileView.as_view(), name='Profile'),
]

if settings.DEBUG:
    # static files (images, css, javascript, etc.)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
