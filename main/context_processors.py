from django.core.validators import ValidationError

prefix = "/"


def menu_list(request):
    return {'menu_list': [
        # ['/new/bank/shop/', 'Магазин'],
        ['%s/' % prefix, 'Главная'],
        # ['%s/camp/' % prefix, 'Лагерь'],
        # ['%s/hackathon/' % prefix, 'Хакатон'],
        # ['%s/lectoriy/' % prefix, 'Лекторий'],
        # ['%s/coworking/' % prefix, 'Коворкинг'],
        ['%s/about_us/' % prefix, 'О нас']
    ]}


def validation_error_to_boolean(f, val):
    try:
        f(val)
        return False
    except ValidationError:
        return True
