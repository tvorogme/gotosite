from django.contrib.auth import logout
from django.shortcuts import render
from django.shortcuts import redirect

from main.apps import SOCIALS


##########################
#
#
# Simple rendering pages
#
#
##########################

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


def logout_wrapper(request):
    logout(request)
    return redirect("/")
