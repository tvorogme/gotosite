import json

from django.contrib.auth import logout, authenticate, login
from django.http import HttpResponse
from django.shortcuts import redirect
from django.shortcuts import render
from django.views import View

from main.apps import SOCIALS
from .forms import RegisterForm
from .lang.ru_RU import forms_translate
from .models import User


###########
#
# SIMPLE PAGES
#
###########

def index(request):
    '''Render index page with socials and user'''

    context = {
        "socials": SOCIALS,
        "user": request.user
    }

    return render(request, 'pages/index/index.html', context)


def about_us(request):
    '''Render about_us page with socials and user'''

    context = {
        "socials": SOCIALS,
        "user": request.user
    }

    return render(request, 'pages/about_us/about_us.html', context)


#############
#
# PROFILE PAGES
#
#############

class ProfileView(View):
    def get(self, request, _id=None):
        # get current user
        user = request.user

        # if he trying get his profile
        if _id == user.id:
            # go home
            return redirect('/profile')

        # true if we watching not ower profile
        is_profile = False if _id else True

        # get profile information
        person = User.objects.filter(pk=user.id if is_profile else _id)[0]

        # render template with new information =)
        return render(request, 'pages/profile/profile.html', {'user': person,
                                                              'is_profile': is_profile})


def logout_wrapper(request):
    # just logout
    # no comments
    logout(request)
    return redirect("/")


def login_wrapper(request):
    # try catch user with password and email
    user = authenticate(username=request.POST['username'], password=request.POST['password'])

    # if we found him
    if user is not None:
        # match request with user
        login(request, user)

        # explain that's all good
        return HttpResponse(json.dumps("ok"), content_type="application/json")
    else:
        # explain that's all bad
        return HttpResponse(json.dumps("bad"), content_type="application/json")


def register(request):
    answers = {}

    # Set all values to form
    for val_name in ['first_name', 'last_name', 'email', 'password']:
        answers[val_name] = request.POST[val_name]

    # Create form
    form = RegisterForm(data=answers)

    # here we will store all errors
    all_errors = []

    for field in form.fields:
        if len(form[field].errors) > 0:
            # translate field name
            clear_form_name = forms_translate['RegisterForm'][field]

            # get plane text
            error_text = form[field].errors.as_text()

            # add error to array
            all_errors.append("{}:{}".format(clear_form_name, error_text))

        # debug
        print(all_errors, form.is_valid())

        if form.is_valid():
            # create user
            form.save()

            # get password and username
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password')

            # login user
            user = authenticate(username=username, password=raw_password)
            login(request, user)

            # explain that all is good
            return HttpResponse(json.dumps("ok"), content_type="application/json")

        else:
            return HttpResponse(json.dumps(all_errors), content_type="application/json")
