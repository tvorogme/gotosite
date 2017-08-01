from django import forms
from django.forms import ModelForm

from .lang.ru_RU import forms_error_messages
from .models import User


class RegisterForm(ModelForm):
    first_name = forms.CharField(max_length=30, widget=forms.HiddenInput(),
                                 error_messages=forms_error_messages['first_name'])

    last_name = forms.CharField(max_length=30, widget=forms.HiddenInput(),
                                error_messages=forms_error_messages['last_name'])

    email = forms.EmailField(max_length=254, widget=forms.HiddenInput(), error_messages=forms_error_messages['email'])

    password = forms.CharField(max_length=254, widget=forms.HiddenInput(),
                               error_messages=forms_error_messages['password'])

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'password',)
