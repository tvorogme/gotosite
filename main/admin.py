from django.contrib import admin
from .models import *

admin.site.register(User)
admin.site.register(Skill)
admin.site.register(Good)
admin.site.register(TempUser)