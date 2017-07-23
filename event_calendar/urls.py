from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from django.contrib import admin

from main import views
from main.views import RegisterPerson, RegisterOrganization, SelfProfileView, ProfileView

urlpatterns = [
    # Simple rendering
    url(r'^$', views.index, name='index'),
    url(r'^about_us/', views.about_us, name='about_us'),
    # something strange
    url(r'^register_person/', RegisterPerson.as_view(), name='RegisterPerson'),
    url(r'^register_organization/', RegisterOrganization.as_view(), name='RegisterOrganization'),
    url(r'^admin/', admin.site.urls),
    url(r'^register_event/', views.RegisterEvent.as_view(), name='RegisterEvent'),
    url(r'^register_project/', views.RegisterProject.as_view(), name='RegisterProject'),
    url(r'^register_event/$', views.RegisterEvent.as_view(), name='RegisterEvent'),
    url(r'^(?P<event_id>[0-9]+)/event_profile/$', views.event_profile, name='event_profile'),
    url(r'^(?P<project_id>[0-9]+)/project_profile/$', views.project_profile, name='project_profile'),
    url(r'^register_person/$', RegisterPerson.as_view(), name='RegisterPerson'),
    url(r'^profile/$', SelfProfileView.as_view(), name='SelfProfile'),
    url(r'^profile/(?P<id>[0-9]+)', ProfileView.as_view(), name='Profile')
]

if settings.DEBUG:
    # static files (images, css, javascript, etc.)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
