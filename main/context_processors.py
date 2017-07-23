def menu_list(request):
    return {'menu_list' : [['/', 'Главная'],
            ['/camp', 'Лагерь'],
            ['/hackathon', 'Хакатон'],
            ['/lectoriy','Лекторий'],
            ['/coworking','Коворкинг'],
            ['/about_us','О нас']]}