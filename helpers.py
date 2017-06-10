from wtforms.validators import Email, Length, NumberRange, Regexp
from lang.ru_RU import user_labels
from flask import make_response, request, current_app
from functools import update_wrapper
from datetime import timedelta

# Validations in registration page

validators_dictionary = {
    "email": {'validators': [Email()], "label": user_labels["email"]},
    "first_name": {'validators': [Length(1, 40)], "label": user_labels["first_name"]},
    "last_name": {'validators': [Length(1, 40)], "label": user_labels["last_name"]},
    "surname": {'validators': [Length(1, 40)], "label": user_labels["surname"]},
    "city": {'validators': [Length(1, 40)], "label": user_labels["city"]},
    "phone_number": {'validators': [Regexp("^\+{1}[7]{1}[0-9]{10}$")], "label": user_labels["phone_number"]},
    "education_name": {'validators': [Length(1, 40)], "label": user_labels["education_name"]},
    "programming_languages": {'validators': [Length(1, 255)], "label": user_labels["programming_languages"]},
    "birthday": {'validators': [Length(1, 255)], "label": user_labels["birthday"]},
    "health_issues": {'validators': [Length(1, 255)], "label": user_labels["health_issues"]},
    "parent_phone_number": {'validators': [Regexp("^\+{1}[7]{1}[0-9]{10}$")],
                            "label": user_labels["parent_phone_number"]},
    "experience": {'validators': [Length(1, 255)], "label": user_labels["experience"]},
    "education_years": {'validators': [NumberRange(1999, 2100)], "label": user_labels["education_years"]}
}


def get_need_fields_for_application(current_user):
    '''Get db fields for current user to update them'''
    need_from_user = []

    for field_name in user_labels.keys():
        field_value = getattr(current_user, field_name)

        if field_value == None or len(field_value) <= 0:
            need_from_user.append(field_name)

    return need_from_user


def get_fields_validators(fields):
    '''Get fields validations from validators_dictionary in needed format.'''
    global validators_dictionary

    validators = {field: validators_dictionary[field] for field in fields}

    return validators


def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    '''Need for debugging on localhost'''

    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None:
        headers = ', '.join(x.upper() for x in headers)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers

            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)

    return decorator
