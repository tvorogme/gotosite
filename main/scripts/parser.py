#-*-coding: UTF-8-*-

# Note: this program copies all content from olimpiada.ru/events/count/500 (entirely all events)
# and saves them into a newly created file events.json
# The program may take up to a few minutes to be finished. 

import lxml.html
import requests
import json

result = []
tmpDict = {}

# If the site is not avalible, try this:

# with open("page.html") as file:
#     text = file.read()

events_amount = 500  # Number of events will be parsed. 500 is recomended (they are less in fact)
text = requests.get("http://olimpiada.ru/events/count/{0}".format(events_amount)) 
page = lxml.html.fromstring(text.text)
page.make_links_absolute('http://olimpiada.ru/')
news_list = page.find_class('news_list')[0] 
uls = news_list.getchildren() 

for ul in uls[:-4]:

    lis = ul.getchildren()

    for li in lis[1:]:
        a_href = li.find('table').find('tr').findall('td')[1].find('a')
        link = a_href.get('href')

        # Now follow links on the page

        followedText = requests.get(link)
        followedPage = lxml.html.fromstring(followedText.text)
        eventInfoPage = followedPage.find_class('main')[0]

        fonts = eventInfoPage.findall('font')  # Array: all tags inside <div class="main"> 
        tmpDict["дата"] = str(fonts[0].text_content())
        tmpDict["событие"] = str(fonts[1].text_content())

        trs = eventInfoPage.find('table').findall('tr')
        for j in range(len(trs)):
            tds = trs[j].findall('td')
            for i in range(0, len(tds), 2):
                key = str(tds[i].text_content())
                value = str(tds[i+1].text_content())
                if value.find(u'\xa0') is not None:
                    value = value.replace(u'\xa0',' ')
                tmpDict[key] = value

        para = eventInfoPage.find('p')
        if para is not None:
            para_content = str(para.text_content())
            if para_content.find(u'\xa0') is not None:
                    para_content = para_content.replace(u'\xa0',' ')
            tmpDict["примечание"] = para_content

        result.append(tmpDict)
        tmpDict = {}

# Final stage: coping all captured info in a file

with open("events.json", "w") as file:
    file.write(json.dumps(result, ensure_ascii=False))
    # You really should keep 'ensure_ascii=False' flag
    # In other case it will convert the text into ACSII encoding
