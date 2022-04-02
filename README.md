# Django React Auth
Github Link : https://github.com/smtsarial/software_dash
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



## Software Engineering

## 1. Abstract

Campus Driver is a system that allows students to commute quickly between
university and their homes. The goal of this project is to eliminate some
transportation issues between campuses while also providing passenger
convenience. Passengers can use this app to select one of the available
vehicles and complete their ride. This program addresses the problems that
students face when using public transit and allows them to get to their
destination faster. The key functionalities of this system include a reservation
system, carpooling, and HES code. Pricing and selecting a car type are two
further features. Pricing is displayed on the system, and car types can be
chosen.

## 2. Introduction

### 2.1. Definition of the problem your software aims to solve

The problem that this system attempted to answer is to eliminate some transit
issues between campuses and to give passengers with convenience in this
regard. Passengers can use this app to select one of the available vehicles and
complete their ride. This program addresses the problems that students face
when using public transit and allows them to get to their destination faster.

### 2.2. Goal of software

The goal of this project is to build a web application that allows users to quickly
travel between campuses and their residences. Students can access vehicle
information (departure time of cars, destination of vehicles, etc.) within the
campus by utilizing the web portal. Passenger transportation between
campuses is made easier with this application. The search results given to the
user will be based on this information. Passengers can use this app to select
one of the available vehicles and complete their ride. This program enables
students to get to their destination faster by addressing the challenges they
have when using public transit. As a result, arriving on time at campus will be
possible, and fuel consumption and parking issues will be reduced.


## 2.3. Main functionality of your software

In this project, the reservation system, HES code integration and carpooling
are the main functionalities. In this project, passengers will be able to reach
the vehicle they want by making a reservation through the system. In
addition, since the HES code will be checked, a safer and healthier
transportation environment will be provided during the pandemic period.
People who are in contact will be prevented from making reservations in the
system and a healthy environment will be tried to be provided.
As other functionalities, pricing and vehicle type will be able to be selected.
Thanks to pricing, passengers will be able to see the transportation cost and
will be able to travel in the vehicles they have chosen thanks to the chance to
choose.

### 2.4. Users of software

This system has been developed as a system that can be used by all kinds of
users. It is estimated that the system will mostly be used by students. It is
designed as a useful and functional system. There are two types of users who
have the potential to interact with this system, which is designed to facilitate
the transportation of students between campuses: users that used the system
as drivers and users that used the system as travellers.

The drivers use the system to make the travellers find them. This means that
the drivers login as a driver and set a time for the transportation. The
travellers use the system to find a transportation to get them where they want
to arrive.

### 2.5. Domain of your software

The domain of this project is to identify a problem on campus and to produce
a suitable solution for this problem. A web application was created to solve
the problem we identified on the campus. Its domain is passenger
transportation between campuses and the students using the application can
reach their homes.


## 3. Figures UML diagrams
![alt text](https://github.com/smtsarial/software_dash/blob/main/images/image-001.png)
![alt text](https://github.com/smtsarial/software_dash/blob/main/images/image-002.png)
![alt text](https://github.com/smtsarial/software_dash/blob/main/images/image-003.jpg)
![alt text](https://github.com/smtsarial/software_dash/blob/main/images/image-004.jpg)
![alt text](https://github.com/smtsarial/software_dash/blob/main/images/image-005.png)
![alt text](https://github.com/smtsarial/software_dash/blob/main/images/image-006.png)
![alt text](https://github.com/smtsarial/software_dash/blob/main/images/image-007.png)
![alt text](https://github.com/smtsarial/software_dash/blob/main/images/image-008.png)
![alt text](https://github.com/smtsarial/software_dash/blob/main/images/image-009.jpg)
![alt text](https://github.com/smtsarial/software_dash/blob/main/images/image-010.jpg)
![alt text](https://github.com/smtsarial/software_dash/blob/main/images/image-011.jpg)
![alt text](https://github.com/smtsarial/software_dash/blob/main/images/image-012.jpg)
![alt text](https://github.com/smtsarial/software_dash/blob/main/images/image-013.jpg)
![alt text](https://github.com/smtsarial/software_dash/blob/main/images/image-014.jpg)
![alt text](https://github.com/smtsarial/software_dash/blob/main/images/image-015.jpg)
![alt text](https://github.com/smtsarial/software_dash/blob/main/images/image-016.jpg)
![alt text](https://github.com/smtsarial/software_dash/blob/main/images/image-017.jpg)
![alt text](https://github.com/smtsarial/software_dash/blob/main/images/image-018.jpg)
![alt text](https://github.com/smtsarial/software_dash/blob/main/images/image-019.jpg)
![alt text](https://github.com/smtsarial/software_dash/blob/main/images/image-020.jpg)
![alt text](https://github.com/smtsarial/software_dash/blob/main/images/image-021.jpg)
![alt text](https://github.com/smtsarial/software_dash/blob/main/images/image-022.jpg)
![alt text](https://github.com/smtsarial/software_dash/blob/main/images/image-023.jpg)



## 5. Glossary of terms

```
Accept Consent to receive or undertake (something^
offered).
Car Four-wheeled motor vehicle.^
Carpooling It^ is^ the^ sharing^ of^ car^ journeys^ so^ that^ more
than one person travels in the car and
satisfies the need for others to go
somewhere.
Check Control.^
Dashboard A dashboard is a type of graphical user
interface that often provides at-a-glance
views of key performance indicators related
to a particular goal or business process.
Driver A driver is a person who drives and manages
motor vehicles used on land.
Login Logging into a system with a username and^
password pair.
Log out Log off.
Reject Turn back.^
Request Demand.^
Traveller Wandering.^
Verify To assert that something is true or to affirm^
by stating that it is true.
Pricing It^ is the^ process^ whereby a business sets
the price at which it will sell its products and
services.
Pending Unconcluded, not yet resolved/concluded.^
```
```
Complete To fill, to finish.
```
```
Shuttle Vehicle to and from the same line.^
```
```
HES Code Within the scope of Controlled Social Life, it
is a code that allows you to securely share
whether you carry any risk in terms of
Covid-19 disease with institutions and
individuals in your transactions such as
transportation or visits.
Reservation Booking.^
```
```
Transportation Carrying trade.^
```


