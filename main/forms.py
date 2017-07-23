from django import forms

from .models import Person, Organization
from .models import Project


class RegisterPersonForm(forms.ModelForm):
    password = forms.CharField()

    class Meta():
        model = Person
        exclude = ['id', 'user']


class RegisterEventForm(forms.ModelForm):
    class Meta():
        model = Person
        exclude = ['id']


class RegisterOrganizationForm(forms.ModelForm):
    class Meta():
        model = Organization
        exclude = ['id']


class RegisterProjectForm(forms.ModelForm):
    class Meta():
        model = Project
        exclude = ['id']
