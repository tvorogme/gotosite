"""event_calendar URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from django.contrib import admin
from main.views import RegisterPerson, RegisterOrganization, SelfProfileView, ProfileView
from main import views

urlpatterns = [
    url(r'^$', views.index, name = 'index'),
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