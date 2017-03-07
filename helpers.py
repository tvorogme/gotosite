from wtforms.validators import Email, Length, NumberRange, Optional
from lang.ru_RU import user_labels

def get_need_fields_for_application(current_user):
    need_from_user = []

    for field_name in user_labels.keys():
        field_value = getattr(current_user, field_name)

        if field_value == None or len(field_value) <= 0:
            need_from_user.append(field_name)

    return need_from_user


def get_fields_validators(fields):
    validators = {}
    for field in fields:
        if field in ["email", "first_name", "last_name", "surname", "city", "phone_number",
                     "education_name"]:
            validators[field] = {"validators": [Length(min=3, max=50)], "label": user_labels[field]}

        if field in ["programming_languages", "about"]:
            validators[field] = {"validators": [Length(min=3, max=255)], "label": user_labels[field]}

        if field in ["graduation_year"]:
            validators[field] = {"validators": [NumberRange(min=12, max=40)], "label": user_labels[field]}

        if field in ["education_years"]:
            validators[field] = {"validators": [NumberRange(min=1999, max=2100)], "label": user_labels[field]}

        if field == "birthday":
            validators[field] = {"validators": [Optional()], "label": user_labels[field]}

        if field == "email":
            validators[field] = {"validators": [Email()], "label": user_labels[field]}

        if field in ["health_issues", "parent_phone_number"]:
            validators[field] = {"validators": [Length(min=0, max=255)], "label": user_labels[field]}

    return validators
