from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.contrib.auth import login

from .models import User


class MySocialAccountAdapter(DefaultSocialAccountAdapter):
    def pre_social_login(self, request, sociallogin):
        user = sociallogin.user
        if user.id:
            return

        # get profile information
        person = User.objects.filter(email=user.email)

        if len(person) > 0:
            sociallogin.state['process'] = 'connect'
            login(request, person, 'none')