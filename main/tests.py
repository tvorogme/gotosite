from django.test import TestCase

from main.event_calendar.views import get_needed_skills
from .models import Skill


class NeededSkillsTest(TestCase):
    def get_needed_skill_test(self):
        response = self.client.GET("skill=A")
        self.asserIs(Skill.objects.filter(name__contains="A")[:10] == get_needed_skills(response))
