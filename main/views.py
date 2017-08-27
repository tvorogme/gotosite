import base64
import json
import os

import pandas as pd
from allauth.socialaccount.models import SocialAccount
from django.contrib.auth import logout, authenticate, login
from django.core.files.base import ContentFile
from django.core.mail import send_mail
from django.http import HttpResponse
from django.shortcuts import redirect
from django.shortcuts import render
from django.utils import timezone

from main.apps import SOCIALS
from .forms import validate_user_field
from .models import *

domain = '/new'


###########
#
# SIMPLE PAGES
#
###########

def index(request):
    '''Render index page with socials and user'''

    context = {
        "socials": SOCIALS,
        "user": request.user
    }

    # return render(request, 'pages/index/index.html', context)
    return redirect('%s/signup' % domain)


def about_us(request):
    '''Render about_us page with socials and user'''

    context = {
        "socials": SOCIALS,
        "user": request.user
    }

    return render(request, 'pages/about_us/about_us.html', context)


def shop(request):
    context = {
        "goods": Good.objects.all(),
    }
    return render(request, 'pages/bank/shop.html', context)


#############
#
# PROFILE PAGES
#
#############

def profile_page(request, _id=None):
    # get current user
    user = request.user

    if user.is_anonymous():
        return redirect('%s/login' % domain)

    # if he trying get his profile
    if _id == user.id:
        # go home
        return redirect('%s/profile' % domain)

    # if not user.email_verified:
    #     return HttpResponse("Ссылка была выслана на %s" % user.email)

    # true if we watching not own profile
    is_profile = False if _id else True

    # get profile information
    person = User.objects.filter(pk=user.id if is_profile else _id)[0]

    projects = Project.objects.filter(users=request.user).all()

    # Here we take all users for team <option> in profile
    users = []
    for profile in User.objects.all().values('id', 'first_name', 'middle_name', 'last_name'):
        print(profile['id'], user.id, type(profile['id']), type(user.id), profile['id'] != user.id)

        # Add all users except our one
        if profile['id'] != user.id:
            # One of all fields must be not None
            if profile['first_name'] is not None or profile['middle_name'] is not None or \
                            profile['last_name'] is not None:
                # Generate one string
                full_name = "{} {} {}".format(profile['first_name'], profile['middle_name'], profile['last_name'])

                # Replace Nones and whitespaces
                full_name = full_name.replace('None', '').replace('  ', ' ')

                # Save user
                users.append({'id': profile['id'], 'full_name': full_name})

    # render template with new information =)
    return render(request, 'pages/profile/profile.html', {'user': person,
                                                          'projects': projects,
                                                          'users': users,
                                                          'is_profile': is_profile})


def signup_page(request):
    if request.user.is_anonymous():
        return render(request, 'pages/profile/signup.html')
    else:
        return redirect('%s/profile' % domain)


def logout_wrapper(request):
    # just logout
    # no comments
    logout(request)
    return redirect("%s/" % domain)


def login_wrapper(request):
    if 'email' in request.POST and 'password' in request.POST:
        email = request.POST['email']
        password = request.POST['password']

        # try catch user with password and email
        user = authenticate(username=email, password=password)

        # if we found him
        if user is not None:
            # match request with user
            login(request, user)

            # explain that's all good
            return HttpResponse(json.dumps("ok"), content_type="application/json")
        else:
            tmp_user = User.objects.filter(email=email)

            if len(tmp_user) == 0:
                user = User(email=email)
                user.set_password(password)
                user.save()

                tmp_user = TempUser(user=user)
                activation_key = tmp_user.gen_activation_key(email)
                tmp_user.save()

                send_mail(
                    'Регистрация в бета тесте new.goto.msk.ru',
                    '<a href="https://goto.msk.ru/new/activate/?key=%s">подтвердить почту</a>' % activation_key,
                    'school@goto.msk.ru',
                    [email],
                    fail_silently=False,
                )

                login(request, tmp_user)

                return HttpResponse(json.dumps("email"), content_type="application/json")

        # explain that's all bad
        return HttpResponse(json.dumps("bad"), content_type="application/json")
    return redirect('%s/' % domain)


def activation(request):
    profile = TempUser.objects.filter(activation_key=request.GET['key'])

    if len(profile) > 0:
        profile = profile[0]
        if not profile.user.email_verified:
            if timezone.now() > profile.key_expires:
                return HttpResponse('Key expires')
            else:  # Activation successful
                profile.user.email_verified = True
                profile.user.save()

                profile.user.backend = 'django.contrib.auth.backends.ModelBackend'
                login(request, profile.user)
    return redirect('%s/profile' % domain)


def remove_social(request):
    '''Remove social account of user'''

    if 'provider' in request.POST:
        # Get provider string
        provider = request.POST['provider']

        # if provider is valid
        if provider in ['vk', 'facebook', 'gitlab', 'github']:
            # remove account
            account = SocialAccount.objects.filter(user_id=request.user.id, provider=provider)

            if account:
                account.delete()
                # fixme: add output status code
                return HttpResponse("ok")
    return HttpResponse("bad")


def update_skills(request, person):
    if 'skills' in request.POST:
        # here we store Skill objects
        answer = []

        # get all skills
        skills = list(filter(lambda x: len(x) > 0, request.POST['skills'].split(",")[1::2]))

        if len(skills) < 30:
            # get errors
            skills_errors = validate_user_field('skills', skills)

            for skill, skill_error in zip(skills, skills_errors):
                if len(skill_error) == 0:
                    db_skill = Skill.objects.filter(name=skill)
                    if len(db_skill) > 0:
                        answer.append(db_skill[0])

                    else:
                        tmp_skill = Skill(name=skill)
                        tmp_skill.save()

                        answer.append(tmp_skill)

            person.skills = answer

            return skills_errors

    return []


def add_education(request, person):
    # fixme: add errors check
    if 'education' in request.POST:
        parsed_values = json.loads(request.POST['education'])

        tmp_city = City.objects.filter(name=parsed_values['city'])

        if len(tmp_city) > 0:
            city = tmp_city[0]
        else:
            city = City(name=parsed_values['city'])
            city.save()

        parsed_values['city'] = city

        tmp_education = Education(**parsed_values)
        tmp_education.save()

        person.educations.add(tmp_education)
    return []


def remove_education(request):
    # fixme: add output status code
    if 'education_id' in request.POST:
        educations = request.user.educations
        toremove_id = int(request.POST['education_id'])

        for education in educations.all():
            if education.id == toremove_id:
                educations.remove(education)
                return HttpResponse("ok")
    return HttpResponse("bad")


def update_profile(request):
    '''Edit profile information'''

    # Get person
    person = User.objects.filter(pk=request.user.id)[0]

    # remove socials if needed
    remove_social(request)

    # here we will store errors
    errors = {}

    # update skills if needed
    skills_errors = update_skills(request, person)

    if len(skills_errors) > 0:
        errors['skills'] = update_skills(request, person)

    # add education if needed
    education_errors = add_education(request, person)

    if len(education_errors) > 0:
        errors['education'] = education_errors

    for val_name in [
        'first_name', 'last_name', 'middle_name',  # full name fields
        'email', 'city', 'birthday', 'phone_number', 'parent_phone_number'  # base information fields
    ]:

        if val_name in request.POST:
            val = request.POST[val_name]

            if val_name == 'city':
                tmp_city = City.objects.filter(name=val)

                if len(tmp_city) > 0:
                    val = tmp_city[0]
                else:
                    val = City(name=val)
                    val.save()

            # if we changed value
            if len(val) > 0 and val != getattr(person, val_name):
                # get errors
                field_errors = validate_user_field(val_name, val)

                if sum(map(len, field_errors)) > 0:
                    errors[val_name] = field_errors
                    continue

                # update person
                setattr(person, val_name, val)

            # If value can be blanked
            elif len(val) == 0 and val not in User().get_not_blanked_fields_names():
                val = None

                # Blank it!
                setattr(person, val_name, val)

    # save updates
    person.save()
    return HttpResponse(json.dumps(errors), content_type="application/json")


#
# API
#

def get_needed_skills(request):
    if 'skill' in request.GET:
        # Get skill from user
        skill_from_user = request.GET['skill']

        # Search similar in db
        needed_skills = Skill.objects.filter(
            name__icontains=skill_from_user).only('name')[:10]

        # Dump to json
        return HttpResponse(json.dumps([skill.name for skill in needed_skills]), content_type="application/json")
    return HttpResponse()


def get_needed_cities(request):
    if 'city' in request.GET:
        city_from_user = request.GET['city']

        # Search similar in db
        needed_cities = City.objects.filter(
            name__icontains=city_from_user).only('name')[:10]

        # Dump to json
        return HttpResponse(json.dumps([city.name for city in needed_cities]), content_type="application/json")
    return HttpResponse()


def get_needed_schools_names(request):
    if 'education_name' in request.GET and 'education_type' in request.GET:
        education_name_from_user = request.GET['education_name']
        education_type_from_user = bool(request.GET['education_type'])

        # Search similar in db
        needed_cities = Education.objects.filter(
            name__icontains=education_name_from_user, education_type=education_type_from_user).only('name')[:10]

        # Dump to json
        return HttpResponse(json.dumps([city.name for city in needed_cities]), content_type="application/json")
    return HttpResponse()


def add_achievement(request):
    values = {}

    for val in ['title', 'year', 'link', 'description']:
        if val in request.POST and len(request.POST[val]) > 0:
            values[val] = request.POST[val]
        else:
            return HttpResponse()

    tmp_achievement = Achievement(**values)
    tmp_achievement.save()

    request.user.achievements.add(tmp_achievement)
    request.user.save()
    return HttpResponse()


def add_project(request):
    print(request.post)
    values = {}
    for val in ['title', 'git_link', 'description']:
        if val in request.POST and len(request.POST[val]) > 0:
            values[val] = request.POST[val]
        else:
            return redirect('/new/profile/?message=Use all fields')

    if 'pdf' in request.FILES:
        file = request.FILES['pdf']

        fileName, fileExtension = os.path.splitext(file.name)

        if fileExtension == '.pdf':
            values['pdf'] = file
            tmp_project = Project(**values)
            tmp_project.save()

            tmp_project.users = [request.user]
            tmp_project.save()
        else:
            return redirect('/new/profile/?message=Use pdf please')
    else:
        return redirect('/new/profile/?message=Add presentation please')
    return redirect('/new/profile/')


def update_avatar(request):
    if request.method == 'POST' and not request.user.is_anonymous():
        data = request.POST['avatar']
        format, imgstr = data.split(';base64,')
        ext = format.split('/')[-1]

        data = ContentFile(base64.b64decode(imgstr), name='temp.' + ext)
        request.user.image = data
        request.user.save()

    return HttpResponse()


def remove_achievement(request):
    # fixme: add output status code

    if 'achievement_id' in request.POST:
        achievements = request.user.achievements
        toremove_id = int(request.POST['achievement_id'])

        for achievement in achievements.all():
            if achievement.id == toremove_id:
                achievements.remove(achievement)
                return HttpResponse("ok")
    return HttpResponse("bad")


def remove_project(request):
    # fixme: add output status code

    if 'project_id' in request.POST:
        projects = Project.objects.filter(pk=request.POST['project_id']).all()

        if request.user in projects[0].users.all():
            if len(projects) > 0:
                if len(projects[0].users.all()) == 1:
                    projects[0].delete()
                else:
                    projects[0].users.remove(request.user)
                return HttpResponse("ok")

    return HttpResponse("bad")


def buy_good(request):
    if not request.user.is_anonymous() and 'good_id' in request.GET:
        good = Good.objects.filter(id=int(request.GET['good_id'])).all()

        if len(good) > 0:
            good = good[0]
            if request.user.gotocoins >= good.price:
                tmp_transaction = Transaction(user=request.user, good=good)
                tmp_transaction.save()

                request.user.gotocoins -= good.price
                request.user.save()

                return render(request, 'pages/bank/check.html', {
                    'good': good,
                    'transaction_id': Transaction.objects.count(),
                    'to_complite': 4 - len(str(good.price)),
                    'date': datetime.now()
                })
    return HttpResponse("Вы не можете купить этот товар")


def generate_csv(request):
    data = []
    for user in User.objects.all():
        tmp = [user.get_full_name()]

        for val_name in ['email', 'city', 'phone_number', 'parent_phone_number']:
            tmp.append(not bool(getattr(user, val_name) is None))

        tmp.append(user.birthday)
        tmp.append(bool(len(user.skills.all()) > 0))
        tmp.append(bool(len(user.educations.all()) > 0))
        tmp.append(bool(len(user.achievements.all()) > 0))

        data.append(tmp)

    data = pd.DataFrame(data,
                        columns=['name', 'email', 'city', 'phone_number', 'parent_phone_number', 'birthday', 'skills',
                                 'educations', 'achievements'])

    # fixme absolute path
    data.to_csv('/root/gotosite/main/static/out.csv')
    return redirect('/static/out.csv')
