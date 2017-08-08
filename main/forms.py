from django import forms
from django.core.validators import EmailValidator, RegexValidator, MinLengthValidator, MaxLengthValidator
from django.forms import ModelForm

from .context_processors import validation_error_to_boolean
from .lang.ru_RU import forms_error_messages
from .models import User


class RegisterForm(ModelForm):
    first_name = forms.CharField(max_length=30, widget=forms.HiddenInput(),
                                 error_messages=forms_error_messages['first_name'])

    last_name = forms.CharField(max_length=30, widget=forms.HiddenInput(),
                                error_messages=forms_error_messages['last_name'])

    email = forms.EmailField(max_length=254, widget=forms.HiddenInput(), error_messages=forms_error_messages['email'])

    password = forms.CharField(max_length=254, widget=forms.HiddenInput(),
                               error_messages=forms_error_messages['password'])

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'password',)


validators_dictionary = {
    "first_name": {'validators': [MinLengthValidator(1), MaxLengthValidator(40)],
                   'messages': ["Минимальная длина имени - 1 символ", 'Максимальная длина имени - 40 символов']},
    "last_name": {'validators': [MinLengthValidator(1), MaxLengthValidator(40)],
                  'messages': ["Минимальная длина фамилии - 1 символ", 'Максимальная длина фамилии - 40 символов']},
    "middle_name": {'validators': [MinLengthValidator(1), MaxLengthValidator(40)],
                    'messages': ["Минимальная длина отчества - 1 символ", 'Максимальная длина отчества - 40 символов']},

    "city": {'validators': [MinLengthValidator(1), MaxLengthValidator(40)],
             'messages': ["Минимальная длина названия города - 1 символ",
                          'Максимальная длина названия города - 40 символов']},

    "birthday": {'validators': [], 'messages': []},
    "email": {'validators': [EmailValidator()], 'messages': ["Введите корректный email"]},

    "phone_number": {'validators': [RegexValidator("^\+{1}[7]{1}[0-9]{10}$")],
                     'messages': ["Введите номер телефона в корректном фомате (+79269990211"]},
    "parent_phone_number": {'validators': [RegexValidator("^\+{1}[7]{1}[0-9]{10}$")],
                            'messages': ["Введите номер телефона в корректном фомате (+79269990211"]},

    "skills": {'validators': [], 'messages': []}
}


def validate_user_field(field_name: str, field_value) -> list:
    '''Takes field name and value, return list with error messages '''

    if field_name not in validators_dictionary:
        raise NotImplementedError(field_name)

    # here we store all errors messages
    errors = []

    # specific skills case
    if isinstance(field_value, list):
        # just check all skills one by one
        for val in field_value:
            errors += validate_user_field(field_name, val)

        return errors

    # get validators for field
    field_validators = validators_dictionary[field_name]

    # zip messages and fields
    ziped_validators = zip(field_validators['validators'], field_validators['messages'])

    for validator, validator_message in ziped_validators:
        error = validation_error_to_boolean(validator, field_value) * validator_message

        if len(error) > 0:
            errors.append(error)

    return errors
