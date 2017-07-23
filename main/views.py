from json import dumps

import django
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404
from django.shortcuts import get_object_or_404, redirect
from django.shortcuts import render
from django.views import View

from main.apps import SOCIALS
from .forms import RegisterEventForm, RegisterProjectForm
from .forms import RegisterPersonForm, RegisterOrganizationForm
from .models import Event, Project, Skill
from .models import Person


##########################
#
#
# Old authors funcs, don't know what they actually do
#
#
##########################

def profile(request):
    person_data_list = Person.objects.get(pk=1)
    context = {'person_data_list': person_data_list}
    return django.shortcuts.render(request, '/profile.html', context)


class RegisterPerson(View):
    def post(self, request):
        post = request.POST
        email = post.get('email', None)
        password = post.get('password', None)
        form = RegisterPersonForm(post)
        if email and password:
            user, created = User.objects.get_or_create(username=email,
                                                       email=email)
            if created:
                user.set_password(password)
                user.save()
                if form.is_valid():
                    person = form.save()
                    person.user = user
                    person.save()
                else:
                    print(form.errors)

            user = authenticate(username=email, password=password)
            login(request, user)
            return render(request, 'main/sucseed.html')
        else:
            return render(request, 'main/register_person.html', {'form': form})

    def get(self, request):
        return render(request, 'main/register_person.html', {'form': RegisterPersonForm})


class RegisterEvent(View):
    def post(self, request):
        post = request.POST
        e = RegisterEventForm(request.POST)
        e.save()
        return HttpResponseRedirect('where_ever_should_be_redirect_to')

    def get(self, request):
        return render(request, 'main/create_event.html', {'form': RegisterEventForm})


def get_needed_skills(request):
    skill_from_user = request.GET['skill']
    # needed_skills = Skill.objects.get(icontains=skill_from_user)
    # needed_skills = Skill.query.filter(Skill.name.contains(skill_from_user)).limit(10).all()
    needed_skills = Skill.objects.filter(name__contains=skill_from_user)[:10]
    return HttpResponse(dumps([skill.name for skill in needed_skills]))


class RegisterProject(View):
    def post(self, request):
        post = request.POST
        p = RegisterProjectForm(request.POST)
        p.save()
        return HttpResponseRedirect('where_ever_should_be_redirect_to')

    def get(self, request):
        return render(request, 'main/create_project.html', {'form': RegisterProjectForm})


def project_profile(request, project_id):
    project = get_object_or_404(Project, pk=project_id)
    return render(request, 'main/project_profile.html', {'project': project})


class CreateProject(View):
    def post(self, request):
        post = request.POST
        e = RegisterEventForm(request.POST)
        e.save()
        return HttpResponseRedirect('where_ever_should_be_redirect_to')

    def get(self, request):
        return render(request, 'main/create_event.html', {'form': RegisterEventForm})


def event_profile(request, event_id):
    event = get_object_or_404(Event, pk=event_id)
    return render(request, 'main/event_profile.html', {'event': event})


class RegisterOrganization(View):
    def post(self, request):
        post = request.POST
        form = RegisterOrganizationForm(post)
        if form.is_valid():
            org = form.save()
            org.save()
        else:
            print(form.errors)
            return render(request, 'main/register_organization.html', {'form': form})
        return render(request, 'main/sucseed.html')

    def get(self, request):
        return render(request, 'main/register_organization.html', {'form': RegisterOrganizationForm})


class SelfProfileView(View):
    def get(self, request):
        user = request.user
        if user.is_anonymous:
            return HttpResponseRedirect('/register_person')

        person = user.person
        projects_expert = person.projects_expert.all()
        projects_participant = person.projects_participant.all()
        person.projects_participant.all()
        is_profile = request.path != "profile"
        return render(request, 'main/profile.html', {'user': person, 'projects': projects_expert,
                                                     'is_profile': is_profile})


class ProfileView(View):
    def get(self, request, _id):
        user = request.user
        if _id == user.id:
            return redirect('/profile')

        person = Person.objects.filter(pk=_id)[0]
        projects_expert = person.projects_expert.all()
        projects_participant = person.projects_participant.all()
        person.projects_participant.all()
        print(request.path)
        is_profile = request.path == "/profile"
        return render(request, 'main/profile.html', {'user': person, 'projects': projects_expert,
                                                     'is_profile': is_profile})


class EditPerson(View):
    def post(self, request):
        post = request.POST
        first_name, second_name, middle_name = post['name'].split()
        email = post['email']
        phone = post['phone']
        parent_phone = post['parent_phone']
        region = post['region']
        birthday = post['birthday']

##########################
#
#
# Simple rendering pages
#
#
##########################

def index(request):
    '''Render index page with socials and user'''
    context = {"socials": SOCIALS, "user": request.user}
    return render(request, 'pages/index/index.html', context)


def about_us(request):
    '''Render about_us page with socials and user'''
    context = {"socials": SOCIALS, "user": request.user}
    return render(request, 'pages/about_us/about_us.html', context)
