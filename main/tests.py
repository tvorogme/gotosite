import datetime
from django.utils import timezone
from django.test import TestCase


from .models import Skill, Person, Organization, Event, Project, Tag, Subject, Type
from .views import get_needed_skills

class NeededSkillsTest(TestCase):
    def get_needed_skill_test(self):
        response = self.client.GET("skill=A")
        self.asserIs(Skill.objects.filter(name__contains="A")[:10]==get_needed_skills(response))
