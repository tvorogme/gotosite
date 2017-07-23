from django.contrib import admin
from .models import Region, Person, Organization, Type, Tag, Subject, Project, Event, Skill

admin.site.register(Region)
admin.site.register(Person)
admin.site.register(Organization)
admin.site.register(Type)
admin.site.register(Tag)
admin.site.register(Subject)
admin.site.register(Project)
admin.site.register(Event)
admin.site.register(Skill)