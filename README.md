# Django React Auth

## Overview

Django React Auth is a simple user authentication demonstration that uses
Django, and the Django Rest Framework on the backend, and React on the frontend.

## Dependencies

1. Python 3.5 or greater
2. Django 3.1
3. React 17.0
4. react-dotenv
5. redux


## Installation

The project is setup using pipenv, and create-react-app. Follow these steps after
cloning the repository to get it up and running.

1. Run the following commands in the same directory as `manage.py`:  
   `pipenv install` and `pipenv install --dev`

2. Now run the django migrations. In the same directory as `manage.py` run:  
   `python manage.py migrate`
  
3. After that go to the client side cd client -> npm install -> npm run start
4. NOTE !! npx kill-port 3000 port kullanımdaysa öldürecektir 
5. NOTE !! Client side 3000 Backend kısmı 8000'de çalışmak zorundadır !!!
6. django admin panel için createsuperuser kullanılabilir!!
7. source https://react-bootstrap.github.io/getting-started/introduction/