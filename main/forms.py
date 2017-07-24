from django import forms

from .models import User


class RegisterPersonForm(forms.ModelForm):
    password = forms.CharField()

    class Meta():
        model = User
        exclude = ['id']