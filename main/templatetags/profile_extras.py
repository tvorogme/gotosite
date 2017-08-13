from django import template

from ..models import UNIVERSITY_ROLES

register = template.Library()


@register.filter
def get_whole_unoversity_role(short_name):
    for item in UNIVERSITY_ROLES:
        if item[0] == short_name:
            return item[1].lower()
    return ""
