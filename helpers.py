from wtforms.validators import Email, Length, NumberRange, Regexp
from lang.ru_RU import user_labels

validators_dictionary = {
        "email": {'validators' :[], "label": user_labels["email"]},
        "first_name": {'validators' :[], "label": user_labels["first_name"]},
        "last_name":{'validators' :[], "label": user_labels["last_name"]},
        "surname": {'validators' :[], "label": user_labels["surname"]},
        "city": {'validators' :[], "label": user_labels["city"]},
        "phone_number": {'validators' :[], "label": user_labels["phone_number"]},
        "education_name": {'validators' :[], "label": user_labels["education_name"]},
        "programming_languages": {'validators' :[], "label": user_labels["programming_languages"]},
        "about": {'validators' :[], "label": user_labels["about"]},
        "birthday": {'validators' :[], "label": user_labels["birthday"]},
        "health_issues": {'validators' :[], "label": user_labels["health_issues"]},
        "parent_phone_number": {'validators' :[], "label": user_labels["parent_phone_number"]},
        "graduation_year": {'validators' :[], "label": user_labels["graduation_year"]},
        "experience": {'validators' :[], "label": user_labels["experience"]},
        "education_years": {'validators' :[], "label": user_labels["education_years"]}
}

def get_need_fields_for_application(current_user):
    need_from_user = []

    for field_name in user_labels.keys():
        field_value = getattr(current_user, field_name)

        if field_value == None or len(field_value) <= 0:
            need_from_user.append(field_name)

    return need_from_user


def get_fields_validators(fields):
    global validators_dictionary

    validators = {field: validators_dictionary[field] for field in fields}

    return validators
