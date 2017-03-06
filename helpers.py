from wtforms.validators import Email, Length, NumberRange, Optional
from ru_RU import user_labels

def get_need_fields_for_application(current_user):
    need_from_user = []


    for field_name in ["first_name", "last_name", "email", "surname", "about", "city", "birthday",
              "phone_number", "parent_phone_number", "health_issues", "programming_languages",
              "experience", "education_name", "education_years", "graduation_year"]:
        if eval("current_user.{0} == None or len(current_user.{0}) <= 0".format(field_name)):
            need_from_user.append(field_name)

    return need_from_user


def get_fields_validators(fields):
    validators = {}
    for field in fields:
        if field in ["email", "first_name", "last_name", "surname", "city", "phone_number", "parent_phone_number",
                     "education_name"]:
            validators[field] = {"validators": [Length(min=3, max=50)], "label": user_labels[field]}

        if field in ["health_issues", "programming_languages", "about"]:
            validators[field] = {"validators": [Length(min=3, max=255)], "label": user_labels[field]}

        if field in ["graduation_year", "education_years"]:
            validators[field] = {"validators": [NumberRange(min=0, max=2100)], "label": user_labels[field]}

        if field == "birthday":
            validators[field] = {"validators": [Optional()], "label": user_labels[field]}

        if field == "email":
            validators[field] = {"validators": [Email()], "label": user_labels[field]}

    return validators
