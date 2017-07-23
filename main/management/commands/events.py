from django.core.management.base import BaseCommand, CommandError
from main.models import Event, Region
import json


class Command(BaseCommand):
    help = 'Creates models for DB'

    def handle(self, *args, **options):
        events = open('main/scripts/events.json', 'r')
        events_str = events.read()
        decoded_events_arr = json.loads(events_str)

        for i in range(len(decoded_events_arr)):
            default = decoded_events_arr[i]

            try: min_age = int(default['Классы'].split("-")[0]) + 5  # Start grade + min 1st grade age
            except: min_age = 0

            try: max_age = int(default['Классы'].split("-")[1]) + 7  # Finishing grade + max 1st grade age
            except: max_age = 100

            try: reg_name = default['Место проведения']
            except: reg_name = ''
            region, created = Region.objects.get_or_create(name=reg_name)

            try: note = default['примечание']
            except: note = ''

            try: link = default['Ссылка']
            except: link = ''

            date_invalid = default['дата']
            date_valid = str(date_invalid[6:]) + '-' + str(date_invalid[3:5]) + '-' + str(date_invalid[0:2])
            event = Event(name=default['событие'], date=date_valid,
                          min_age=min_age, max_age=max_age, region=region, address='', time='10:00',
                          full_description=note, cost=0, url=link)
            event.save()
