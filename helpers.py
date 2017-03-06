from wtforms.validators import Email, Length, NumberRange, Optional


def get_need_fields_for_application(current_user):
    need_from_user = []

    if len(current_user.first_name) <= 0:
        need_from_user.append("first_name")

    if len(current_user.last_name) <= 0:
        need_from_user.append("last_name")

    if len(current_user.email) <= 0:
        need_from_user.append("email")

    if len(current_user.surname) <= 0:
        need_from_user.append("surname")

    if len(current_user.about) <= 0:
        need_from_user.append("about")

    if len(current_user.city) <= 0:
        need_from_user.append("city")

    if current_user.birthday == None:
        need_from_user.append("birthday")

    if len(current_user.phone_number) <= 0:
        need_from_user.append("phone_number")

    if len(current_user.parent_phone_number) <= 0:
        need_from_user.append("parent_phone_number")

    if len(current_user.health_issues) <= 0:
        need_from_user.append("health_issues")

    if len(current_user.programming_languages) <= 0:
        need_from_user.append("programming_languages")

    if len(current_user.experience) <= 0:
        need_from_user.append("experience")

    if len(current_user.education_name) <= 0:
        need_from_user.append("education_name")

    if current_user.education_years == None:
        need_from_user.append("education_years")

    if current_user.graduation_year == None:
        need_from_user.append("graduation_year")


def get_fields_validators(fields):
    validators = {}
    for field in fields:
        if field in ["email", "first_name", "last_name", "surname", "city", "phone_number", "parent_phone_number",
                     "education_name"]:
            validators[field] = Length(min=3, max=50)

        if field in ["health_issues", "programming_languages", "about"]:
            validators[field] = Length(min=3, max=255)

        if field in ["graduation_year", "education_years"]:
            validators[field] = NumberRange(min=0, max=2100)

        if field == "birthday":
            validators[field] = (Optional())

        if field == "email":
            validators.append(Email())
