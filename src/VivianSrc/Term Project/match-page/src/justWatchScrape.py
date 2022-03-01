from bs4 import BeautifulSoup
import requests
import re
from collections import deque
import urllib.request
import shutil


page = 'https://www.justwatch.com/us'
page2='https://en.wikipedia.org/wiki/Cat'
r = requests.get(page)


links = []
titles = []
linkString = ""
r = requests.get(page)
page = BeautifulSoup(r.text, 'html.parser')
div = page.find("picture", {"class": "picture-comp title-poster__image"}) #gets title



mainBody = page.find("body") # gets the body 
for link in mainBody.find_all("picture", {"class": "picture-comp title-poster__image"}):
    title = (link.find('img').attrs['alt'])
    print(title + " ")
    unformURL= (link.find('img').attrs['src'])
    formURL = unformURL.replace(".{format}", '')
    print(unformURL + "\n")
    links.append(formURL)
    titles.append(title)
print(titles)
print(links)
linkString = links