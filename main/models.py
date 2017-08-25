import random
from datetime import datetime
from datetime import timedelta
from hashlib import sha1

from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils.translation import ugettext_lazy as _

UNIVERSITY_ROLES = (
    ('0', 'Абитуриент'),

    ('1', 'Студент (специалитет)'),
    ('2', 'Студент (бакалавр)'),
    ('3', 'Студент (магистр)'),

    ('4', 'Выпускник (специалитет)'),
    ('5', 'Выпускник (бакалавр)'),
    ('6', 'Выпускник (магистр)'),

    ('7', 'Аспирант'),
    ('8', 'Кандидат наук'),
    ('9', 'Доктор наук'),
    ('10', 'Интерн'),
    ('11', 'Асистент-стажёр'),
    ('12', 'Докторант'),
    ('13', 'Адъютант'),
)


class City(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.name

    def __len__(self):
        return len(self.name)

    class Meta:
        verbose_name = "город"
        verbose_name_plural = "города"


class Skill(models.Model):
    name = models.CharField(max_length=200)

    class Meta:
        verbose_name = "навык"
        verbose_name_plural = "навыки"

    def __str__(self):
        return self.name


class Education(models.Model):
    city = models.ForeignKey(City)
    education_type = models.BooleanField(default=True)  # School?

    name = models.CharField(max_length=50)
    out_year = models.IntegerField()

    #
    #  School specific
    #

    specialization = models.CharField(max_length=50, blank=True, null=True)

    #
    # University specific
    #

    faculty = models.CharField(max_length=50, blank=True, null=True)

    role = models.CharField(max_length=50, blank=True, null=True, choices=UNIVERSITY_ROLES)

    def __str__(self):
        return self.name

    def get_fields_names(self):
        return [item.name for item in self._meta.get_fields()]

    class Meta:
        verbose_name = "образование"
        verbose_name_plural = "образование"


class Achievement(models.Model):
    title = models.CharField(max_length=50)
    link = models.CharField(max_length=50)
    year = models.IntegerField()
    description = models.TextField()

    class Meta:
        verbose_name = "достижение"
        verbose_name_plural = "достижения"


class UserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The Email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)

        return self.create_user(email, password, email_verified=True, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    '''Create own user with email only'''

    #
    # ФИО
    #

    first_name = models.CharField(max_length=40, blank=True, null=True)
    middle_name = models.CharField(max_length=40, blank=True, null=True)
    last_name = models.CharField(max_length=40, blank=True, null=True)

    #
    # Base information
    #

    email = models.EmailField(unique=True)
    city = models.ForeignKey(City, null=True, blank=True)
    birthday = models.DateField('birthday', blank=True, null=True)

    #
    # Contacts
    #

    phone_number = models.CharField(max_length=20, blank=True, null=True)
    parent_phone_number = models.CharField(max_length=20, blank=True, null=True)

    skills = models.ManyToManyField(Skill, blank=True)
    educations = models.ManyToManyField(Education, blank=True)
    achievements = models.ManyToManyField(Achievement, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    # Avatar
    image = models.ImageField(upload_to='person_images/', default=None, blank=True, null=True)

    # GoTo Coins
    gotocoins = models.IntegerField(default=0)

    email_verified = models.BooleanField(default=False)

    #
    # Some django specific fields
    #
    USERNAME_FIELD = 'email'
    objects = UserManager()

    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_('Designates whether the user can log into this site.'),
    )

    class Meta:
        db_table = 'users'

        verbose_name = "пользователь"
        verbose_name_plural = "пользователи"

        managed = True

    def __str__(self):
        return "{} {} {}".format(self.last_name, self.first_name, self.middle_name)

    def get_full_name(self):
        if len(self.first_name) > 0 or len(self.last_name) > 0 or len(self.middle_name) > 0:
            return "{} {} {}".format(self.last_name, self.first_name, self.middle_name)
        else:
            return "{}".format(self.email)

    def get_short_name(self):
        if len(self.first_name) > 0 or len(self.last_name) > 0:
            return "{} {}".format(self.first_name, self.last_name)
        else:
            return "{}".format(self.email)

    def get_not_blanked_fields_names(self):
        fields = []

        for field in self._meta.get_fields():
            if not isinstance(field, models.ManyToOneRel) and not isinstance(field, models.ManyToManyField) and not field.blank:
                fields.append(field)

        return [field.name for field in fields]

    def get_all_fields_names(self):
        return [field.name for field in self._meta.get_fields()]


class TempUser(models.Model):
    user = models.OneToOneField(User, related_name='profile')
    activation_key = models.CharField(max_length=128)
    key_expires = models.DateTimeField()

    def gen_activation_key(self, username):
        salt = sha1(str(random.random()).encode('utf-8')).hexdigest()[:5]
        activation_key = sha1(str(salt + username).encode('utf-8')).hexdigest()
        self.activation_key = activation_key
        self.key_expires = datetime.now() + timedelta(days=1)
        return activation_key


class Good(models.Model):
    title = models.CharField(max_length=128, unique=True)
    description = models.TextField()
    price = models.IntegerField()
    image = models.ImageField(upload_to='good_images/')

    def __str__(self):
        return "{}".format(self.title)

    class Meta:
        db_table = 'goods'

        verbose_name = "товар"
        verbose_name_plural = "товары"

        managed = True


class Transaction(models.Model):
    user = models.ForeignKey(User, unique=False, blank=True, null=True)
    good = models.ForeignKey(Good, unique=False, blank=True, null=True)

    def __str__(self):
        return "{} купил {}".format(self.user, self.good)

    class Meta:
        db_table = 'transactions'

        verbose_name = "покупка"
        verbose_name_plural = "покупки"

        managed = True


class Project(models.Model):
    users = models.ManyToManyField(User, blank=True)
    title = models.CharField(max_length=120)
    description = models.TextField()
    git_link = models.CharField(max_length=200)
    pdf = models.FileField(upload_to='presentations/')

    def __str__(self):
        return "{}".format(self.title)
    class Meta:
        verbose_name = "проект"
        verbose_name_plural = "проекты"
        db_table = "user_projects"
