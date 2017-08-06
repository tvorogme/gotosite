from django.core.validators import ValidationError


def menu_list(request):
    return {'menu_list': [['/', 'Главная'],
                          ['/camp', 'Лагерь'],
                          ['/hackathon', 'Хакатон'],
                          ['/lectoriy', 'Лекторий'],
                          ['/coworking', 'Коворкинг'],
                          ['/about_us', 'О нас']]}


def validation_error_to_boolean(f, val):
    try:
        f(val)
        return True
    except ValidationError:
        return False
