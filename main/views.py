from django.contrib.auth import logout, authenticate, login
from django.contrib.staticfiles.views import serve
from django.http import HttpResponse
from django.shortcuts import redirect
from django.shortcuts import render
from django.views import View
import json

from main.apps import SOCIALS
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
        user = request.user

        if _id == user.id:
            return redirect('/profile')

        is_profile = False if _id else True
        person = User.objects.filter(pk=user.id if is_profile else _id)[0]

        return render(request, 'pages/profile/profile.html', {'user': person,
                                                              'is_profile': is_profile})


def logout_wrapper(request):
    logout(request)
    return redirect("/")


def login_wrapper(request):
    user = authenticate(username=request.POST['username'], password=request.POST['password'])
    if user is not None:
        login(request, user)
        return HttpResponse(json.dumps("ok"), content_type="application/json")
    else:
        return HttpResponse('bad')


get_favicon = lambda r: serve(r, 'static/img/favicon.ico')
