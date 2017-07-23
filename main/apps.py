from django.apps import AppConfig
from django.shortcuts import render



class MainConfig(AppConfig):
    name = 'main'

SOCIALS = {
    'vk': 'https://vk.com/goto_msk',
    'instagram': 'https://www.instagram.com/goto_goto_goto/',
    'facebook': 'https://www.facebook.com/GoToCampPage/',
    'telegram': 'https://t.me/goto_channel'
}
