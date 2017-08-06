import json

from allauth.socialaccount.models import SocialAccount
from django.contrib.auth import get_user_model
from django.contrib.auth import logout, authenticate, login
from django.http import HttpResponse
from django.shortcuts import redirect
from django.shortcuts import render

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

def profile_page(request, _id=None):
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
    user = authenticate(username=request.POST['email'], password=request.POST['password'])

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

            # Don't know why, but django prepend ' *' to error message
            error_text = error_text[2:]

            # add error to array
            all_errors.append("{} {}".format(clear_form_name, error_text))

    if form.is_valid():

        # Get all values
        username = form.cleaned_data.get('email')
        raw_password = form.cleaned_data.get('password')
        first_name = form.cleaned_data.get('first_name')
        last_name = form.cleaned_data.get('last_name')

        # Create user
        user = get_user_model().objects.create_user(username, raw_password, first_name=first_name, last_name=last_name)

        login(request, user)

        # explain that all is good
        return HttpResponse(json.dumps("ok"), content_type="application/json")

    else:
        return HttpResponse(json.dumps(all_errors), content_type="application/json")


def remove_social(request):
    '''Remove social account of user'''

    # Get provider string
    provider = request.POST['provider']

    # if provider is valid
    if provider in ['vk', 'facebook', 'gitlab', 'github']:
        # remove account
        account = SocialAccount.objects.filter(user_id=request.user.id, provider=provider)
        account.delete()


def update_profile(request):
    '''Edit profile information'''

    if 'provider' in request.POST:
        remove_social(request)

    for val_name in [
        'first_name', 'last_name', 'surname',  # full name fields
        'email', 'city', 'birthday',  # base information fields
        'skills',  # skills fields
    ]:
        if val_name in request.POST:
            print(request.POST[val_name])

    return HttpResponse(json.dumps("ok"), content_type="application/json")
