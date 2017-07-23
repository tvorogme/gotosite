from django.contrib.auth.models import User
from django.db import models


class Region(models.Model):
    name = models.TextField()

    def __str__(self):
        return self.name


class Skill(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Person(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    
    first_name = models.CharField(max_length=40)
    middle_name = models.CharField(max_length=40, blank=True, null=True)
    last_name = models.CharField(max_length=40)

    image = models.ImageField(upload_to='person_images/', default=None, blank=True, null=True)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    parent_phone_number = models.CharField(max_length=20, blank=True, null=True)
    contacts = models.CharField(max_length=40, blank=True, null=True)
    region = models.ForeignKey(Region, on_delete=models.SET_NULL, null=True, blank=True)
    address = models.CharField(max_length=100, blank=True, null=True)
    birthday = models.DateField('birthday', blank=True, null=True)
    GENDER = (('M', 'Мужской'),
              ('F', 'Женский'),
              ('N', 'Не выбрано'))
    gender = models.CharField(choices=GENDER, default='N', max_length=2)
    education = models.TextField(blank=True, null=True)
    knowledge = models.TextField(blank=True, null=True)
    skills = models.ManyToManyField(Skill, blank = True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.first_name + ' ' + self.last_name

class Organization(models.Model):
    name = models.CharField(max_length=200)
    prescription = models.TextField(default='')
    full_description = models.TextField(default='')
    image = models.ImageField(default=None, blank=True, null=True)

    employees = models.ManyToManyField(Person, blank=True)
    creation_date = models.DateField(auto_now=False, auto_now_add=False)

    url = models.URLField(max_length=200, default=None, blank=True, null=True)
    email = models.EmailField(max_length=200, default=None, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Type(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Subject(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Project(models.Model):
    name = models.CharField(max_length=200)
    experts = models.ManyToManyField(Person, related_name='projects_expert', blank=True)
    participants = models.ManyToManyField(Person, related_name='projects_participant', blank=True)

    image = models.ImageField(default=None, blank=True)
    prescription = models.TextField(default='')
    full_description = models.TextField(default='')

    event = models.ForeignKey('Event', on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Event(models.Model):
    name = models.CharField(max_length=200)
    author = models.ForeignKey(Person, on_delete=models.SET_NULL, null=True, blank=True)
    organization = models.ForeignKey(Organization, on_delete=models.SET_NULL, null=True, blank=True)
    experts = models.ManyToManyField(Person, related_name='events_expert', blank=True)
    participants = models.ManyToManyField(Person, related_name='events_participant', blank=True)
    min_age = models.IntegerField(default=0)
    max_age = models.IntegerField(default=100)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    region = models.ForeignKey(Region, on_delete=models.SET_NULL, null=True, blank=True)
    address = models.CharField(max_length=200)
    date = models.DateField(null=True, blank=True)
    time = models.TimeField(null=True, blank=True)

    image = models.ImageField(default=None, blank=True, null=True)
    prescription = models.TextField(default='', blank=True)
    full_description = models.TextField(default='', blank=True)
    cost = models.IntegerField(default=0, blank=True, null=True)
    url = models.URLField(max_length=200, default=None, blank=True, null=True)
    type = models.ForeignKey(Type, on_delete=models.SET_NULL, null=True, blank=True)
    tags = models.ManyToManyField(Tag, blank=True)
    subject = models.ForeignKey(Subject, on_delete=models.SET_NULL, null=True, blank=True)
    verified = models.BooleanField(default=False, blank=True)

    def __str__(self):
        return self.name

    def __repr__(self):
        return '<Event {}>'.format(self.name)