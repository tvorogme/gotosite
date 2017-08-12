from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils.translation import ugettext_lazy as _


class Skill(models.Model):
    name = models.CharField(max_length=200)

    class Meta:
        verbose_name = "навык"
        verbose_name_plural = "навыки"

    def __str__(self):
        return self.name


class Education(models.Model):
    city = models.CharField(max_length=50)
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
    role = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.name

    def get_fields_names(self):
        return [item.name for item in self._meta.get_fields()]


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

        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    '''Create own user with email only'''

    #
    # ФИО
    #

    first_name = models.CharField(max_length=40)
    middle_name = models.CharField(max_length=40, blank=True, null=True)
    last_name = models.CharField(max_length=40)

    #
    # Base information
    #

    email = models.EmailField(unique=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    birthday = models.DateField('birthday', blank=True, null=True)

    #
    # Contacts
    #

    phone_number = models.CharField(max_length=20, blank=True, null=True)
    parent_phone_number = models.CharField(max_length=20, blank=True, null=True)

    skills = models.ManyToManyField(Skill, blank=True)
    educations = models.ManyToManyField(Education, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    # Avatar
    image = models.ImageField(upload_to='person_images/', default=None, blank=True, null=True)

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
        return "{} {} {}".format(self.last_name, self.first_name, self.middle_name)

    def get_short_name(self):
        return "{} {}".format(self.first_name, self.last_name)

    def get_not_blanked_fields_names(self):
        fields = []

        for field in self._meta.get_fields():
            if not isinstance(field, models.ManyToOneRel) and not field.blank:
                fields.append(field)

        return [field.name for field in fields]

    def get_all_fields_names(self):
        return [field.name for field in self._meta.get_fields()]
