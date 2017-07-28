from django import forms
from django.forms import ModelForm

from .models import User


class RegisterForm(ModelForm):
    first_name = forms.CharField(max_length=30, widget=forms.HiddenInput())
    last_name = forms.CharField(max_length=30, widget=forms.HiddenInput())
    email = forms.EmailField(max_length=254, widget=forms.HiddenInput())
    password = forms.CharField(max_length=254, widget=forms.HiddenInput())

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'password',)
