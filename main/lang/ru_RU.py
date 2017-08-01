from django.utils.translation import ugettext_lazy

forms_translate = {
    "RegisterForm": {
        'first_name': 'Имя',
        'last_name': 'Фамлия',
        'email': 'Email',
        'password': 'Пароль'
    }
}

forms_error_messages = {
    'password':
        {'required': 'обязателен к заполнению',
         'invalid': 'проверьте правильность ввода',
         'max_length': ugettext_lazy('может содержать максимум %(limit_value)d символов'),
         'min_length': ugettext_lazy('должен иметь как минимум %(limit_value)d символов')
         },

    'email': {
        'required': 'обязателен к заполнению',
        'duplicate_username': 'my custom error message',
        'invalid': 'проверьте правильность ввода',
        'max_length': ugettext_lazy('может содержать максимум %(limit_value)d символов'),
        'min_length': ugettext_lazy('должен иметь как минимум %(limit_value)d символов')
    },

    'first_name': {
        'required': 'обязательно к заполнению',
        'invalid': 'проверьте правильность ввода',
        'max_length': ugettext_lazy('может содержать максимум %(limit_value)d символов'),
        'min_length': ugettext_lazy('должно иметь как минимум %(limit_value)d символов')
    },

    'last_name': {
        'required': 'обязательна к заполнению',
        'invalid': 'проверьте правильность ввода',
        'max_length': ugettext_lazy('может содержать максимум %(limit_value)d символов'),
        'min_length': ugettext_lazy('должна иметь как минимум %(limit_value)d символов')
    }
}
