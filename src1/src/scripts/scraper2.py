from bs4 import BeautifulSoup
import requests
import re
from collections import deque
import urllib.request
import shutil


page = 'https://www.justwatch.com/us'
page2='https://en.wikipedia.org/wiki/Cat'
r = requests.get(page)
# page = BeautifulSoup(r.text, 'html.parser')
# image = page.find('img', src=re.compile("^https://images.justwatch.com/poster").string
# print(image)
# gets title
	#mainBody = page.find(id="bodyContent") # gets the body 

	# for link in mainBody.find_all('a', href=internal_not_special):
	# 	#print(link.get('href'))
	# 	url = "https://en.wikipedia.org" + link.get('href')
	# 	#print(url)
	# 	links.append(url)

	# linkString = links
	# return linkString
# r = requests.get(page)
# page = BeautifulSoup(r.text, 'html.parser')
# pageTitle = page.find('div', {"class":"noprint"}).string #gets title
# mainBody = page.find(id="bodyContent") # gets the body 

# print(pageTitle)

links = []
titles = []
linkString = ""
r = requests.get(page)
page = BeautifulSoup(r.text, 'html.parser')
div = page.find("picture", {"class": "picture-comp title-poster__image"}) #gets title

# unformURL= (div.find('img').attrs['src'])
# formURL = unformURL.replace(".{format}", '')
# print(formURL)
# title = (div.find('img').attrs['alt'])
# print(title)



mainBody = page.find("body") # gets the body 

for link in mainBody.find_all("picture", {"class": "picture-comp title-poster__image"}):
    # title = (link.find('img').attrs['alt'])
    # print(title + " ")
    unformURL= (link.find('img').attrs['src'])
    formURL = unformURL.replace(".{format}", '')
    print(unformURL + "\n")
    links.append(formURL)
    # titles.append(title)

# print(titles)
# print(links)
# linkString = links