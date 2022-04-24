# Y2T2 Project: Minor Cineplex [REACT BRANCH]
the web server should be working!!!  
#### http://202.183.167.111:4203/

#### IMPORTANT PHASE 2:
> ***External API*** is provided by **https://rapidapi.com/**, due to this, the API will collect money if user exceed **100 request/day**.     
> The external API service, shown on homepage(index.html) ran with script (./script/rec_api.js) will be turned off to avoid losing money.    
> If the work check required this API to be turned on, please see (./script/rec_api.js), a short instruction will be inside to show you how to activate the API.  
#### Testcase
> All testcase should be in (./routes/crud.js), the testcase is commented, please try it out as instructed in the CRUD file.  
> there are two type of GET: **Get all**, and **Get by primary key** (movie ID or Email)  

This is a web writing project for Year 2 Term 2 Web programming. Written by:
1. Ariya P. 
2. Phichayut N.
3. Kulawut M.
4. Perakorn N.
## Important Commands 
```
git remote add origin https://github.com/Silberweich/Y2T2_WebProg.git
git clone https://github.com/Silberweich/Y2T2_WebProg.git

!!!IMPORTANT!!!
git branch -M react
git push -u origin react
git pull origin react
```
## Font Family & Color theme
https://fonts.google.com/specimen/Quicksand    
<img src="https://imgur.com/4VkTE4p.png" width="350" height="135">  

## Work load:
### First Phase:
- [x] TEAM: Navigation Diagram
- [x] ENG: Homepage / Index.html
- [x] VIEW: About us page / about.html
- [x] PETE: Admin + Login
- [x] CHAN: Search + Result
### Second Phase:
- [x] Authentication Service 
- [x] CRUD(Search, Insert, Update, Delete) + Test cases
- [x] Authentication Service Interaction
- [x] Search Service Interaction
- [x] Public web service interaction (External API)
### Third Phase (React APP):
- [x] Home
- [x] Login + API
- [x] Admin Movie
    - [x] Display movies
    - [x] Search (No criteria + 3 criteria)
    - [x] Create
    - [x] Update
    - [x] Delete
    - [x] Dynamic page for each movie
- [x] Admin User
    - [x] Display users
    - [x] Search (No criteria + 3 criteria)
    - [x] Create
    - [ ] Update
    - [x] Delete
    - [x] Dynamic page for each user
- [x] Report

## How to run our React Project
### Required Modules on React App
    1. React Router Dom v6 (npm install react-router-dom@6)
    2. React Styled-Component (npm install --save styled-components)
    3. Axios (npm install axios)

### Required Modules on Web Service
    "body-parser": "^1.19.2",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "express": "^4.17.3",
    "jsonwebtoken": "^8.5.1",
    "mysql2": "^2.3.3",
    "node-fetch": "^3.2.3",
    "nodemon": "^2.0.15"

### Run the <b>React App</b> by using ```npm start```
### Start the <b>Web Service</b> with ```npm start```

## Modifying the domain that the React App is connected with
Go to .env file and replace the http://localhost:4203 with another domain

## Updated Web Service from Phase 2
1. ```index.js``` added '/searchMoviesReact' route (the same as ```'/searchMovies'```), but only data is returned
2. ```crud.js```
- Added GET methods: ```'/userSearchEmail', '/userSearchFname', '/userSearchLname'``` for criteria search
- Change `req.body.data[0].${varName}` to `req.body.data.${varName}` in PUT and DELETE methods, so that they can be use with the React APP easily