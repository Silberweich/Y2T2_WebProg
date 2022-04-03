const http = require("http");
const fs = require("fs");
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');
const express = require('express');
const dotenv = require('dotenv');
let jwt = require("jsonwebtoken");
let cookieParser = require('cookie-parser')
let authorize = require("./auth.js");
const res = require("express/lib/response");
const { throws } = require("assert");
const app = express();

console.log(__dirname);
console.log(__filename);

dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/Assets", express.static(__dirname + '/Assets'));
app.use("/script", express.static(__dirname + '/script'));
app.use('/', require('./routes/crud'));

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_DATABASE,
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected DB");
});

app.get('/', function (req, res) {
    console.log("Accessing INDEX");
    res.sendFile(path.join(__dirname + '/html/index.html'));
});

app.get('/index', function (req, res) {
    console.log("Accessing INDEX");
    res.sendFile(path.join(__dirname + '/html/index.html'));
});

app.get('/about', function (req, res) {
    console.log("Accessing About page");
    res.sendFile(path.join(__dirname + '/html/about.html'));
});

app.get('/login', function (req, res) {
    console.log("Accessing Login page");
    res.sendFile(path.join(__dirname + '/html/login.html'));
});

app.get('/result', function (req, res) {
    console.log("Accessing Result page");
    res.sendFile(path.join(__dirname + '/html/result.html'));
});

app.get('/search', function (req, res) {
    console.log("Accessing Search page");
    res.sendFile(path.join(__dirname + '/html/search.html'));
});

app.get('/sudolog', function (req, res) {
    console.log("Accessing Admind Login page");
    res.sendFile(path.join(__dirname + '/html/sudolog.html'));
});

app.get('/user-secret', authorize, function (req, res) {
    res.send("User logged in");
})

app.get('/admin-secret', authorize, function (req, res) {
    res.send("Admin logged in");
})

app.post('/login', function (req, res) {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(400).send({ error: true, message: 'Please provide fill information' });
    }

    con.query('SELECT * FROM user WHERE email = ?', email, function (error, results) {
        if (error) throw error;
        let jwtToken;
        let info = results[0];
        if (info) {
            if (info['password'] === password) {
                let user = req.body;
                jwtToken = jwt.sign({
                    email: user.email,
                    password: user.password
                }, process.env.SECRET, {
                    expiresIn: "1h"
                });
                console.log("User Login Successful");
                // res.status(200).json({ token: jwtToken, message: user})
                return res.status(200).cookie("token", jwtToken, {httpOnly:true}).redirect('/user-secret');
            } else {
                console.log("Login failed Successfully")
                return res.send({ error: false, data: results, message: "Login failed Successfully, Email doesn't match with the password" });
            }
        } else {
            return res.send("This user doesn't exist");
        }
    })
})

app.post('/adminlogin', function (req, res) {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(400).send({ error: true, message: 'Please provide fill information' });
    }

    con.query('SELECT * FROM admin WHERE email = ?', email, function (error, results) {
        if (error) throw error;
        let jwtToken;
        let info = results[0];
        if (info) {
            if (info['password'] === password) {
                let user = req.body;
                jwtToken = jwt.sign({
                    email: user.email,
                    password: user.password
                }, process.env.SECRET, {
                    expiresIn: "1h"
                });
                return res.status(200).cookie("token", jwtToken, {httpOnly:true}).redirect('/admin-secret');
            } else {
                console.log("Login failed Successfully")
                return res.send({ error: false, data: results, message: "Login failed Successfully, Email doesn't match with the password" });
            }
        }
        return res.send({ error: false, data: results, message: "This user doesn't exist" });
    })
})

app.get('/searchMovies', function (req, res) {
    // No input
    // console.log(req.query)
    let movieDisplay;
    if (Object.keys(req.query).length === 0) {
        con.query('SELECT * FROM movie', function (error, results) {
            return res.send({ error: false, data: results, message: "This movie exists, 1st con" });
        })
    } else {
        let movieName;
        if(!req.query.movieName || req.query.movieName === "All") {
            movieName = "%%%";
            movieDisplay = " ";
        } else {
            movieName = "%%" + (req.query.movieName).toLowerCase() + "%";
            movieDisplay = req.query.movieName;
        }
        /* --------- Criteria Search Variable --------- */
        let movieGenre = req.query.movieGenre;
        if(!movieGenre || movieGenre === "All") {
            movieGenre = "%%";
        } else {
            movieGenre = "%" + req.query.movieGenre + "%";
        }
        let movieReleasedYr = req.query.movieReleasedYr;
        if(!movieReleasedYr || movieReleasedYr === "All") movieReleasedYr = 2018;
        let movieSound = JSON.stringify(req.query.movieSound);
        if(!movieSound) {
            movieSound = `""JP", "EN", "KR", "TH""`
        }

        if (movieSound.includes(",")) movieSound = movieSound.substring(1,movieSound.length-1);
        console.log(movieName, movieGenre, movieReleasedYr, movieSound)

        con.query(`SELECT * FROM movie WHERE movie_name LIKE ?
        AND movie_genre LIKE ?
        AND YEAR(release_date) >= ?
        AND soundtrack IN (${movieSound})
        ORDER BY movie_name ASC`,
        [movieName, movieGenre, movieReleasedYr], function (error, results) {
            if (error) throw error;
            var output = "";
                output += `<!DOCTYPE html>

                <html lang="en">
                
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <!-- Control page view dimension and scaling -->
                    <meta name="author" content="[INSERT TEAM NAME]">
                
                    <!-- SET TITLE HERE -->
                    <title>Minor Cineplex - Result</title>
                
                    <!-- SYTLE AND CUSTOMIZATION -->
                    <link rel="shortcut icon" href="Assets/title_icon.png">
                
                    <!-- BOOTSTRAPS CONTENT -->
                    <link rel="stylesheet" href="Assets/CSS/head_feeties.css">
                    <link rel="stylesheet" href="Assets/CSS/main.css">
                    <link rel="stylesheet" href="Assets/CSS/result.css">
                
                    <!-- FONT MANAGEMENT -->
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap" rel="stylesheet">
                    <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>
                
                    <!-- LINK TO FONT AWESOME (FOR SOME ELEMENT LOGO) -->
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA==" crossorigin="anonymous" referrerpolicy="no-referrer">
                
                    <style>
                        body {
                            font-family: 'Quicksand', sans-serif;
                        }
                    </style>
                </head>
                
                <!-- Main body starts here -->
                <body>
                
                    <!-- TOP NAV TEMPLATE, USE ON ALL PAGE -->
                    <header>
                        <nav class="topnav slideUp">
                            <a class="logo img_highlight" href="index">
                                <img src="Assets/minor_logo.svg" style="overflow: hidden;">
                            </a>
                            <a href="index">Home</a>
                            <a class="active" href="search">Search</a>
                            <a href="about">About</a>
                            <a href="login">Login</a>
                        </nav>
                    </header>
                    <!-- TOP NAV TEMPLATE, USE ON ALL PAGE -->
                
                    <main>
                        <!-- SEARCH SUBMISSION IN RESULT!! -->
                        <div class="container">
                            <div class="search-container">
                            <form action="/searchMovies" method="GET">
                                <h1 class="introduck">Showing all results for <br> <i>'${movieDisplay}'</i> </h1>
                                <div class="search-field">
                                    <input id="search" type="text" placeholder="Enter a Movie Name" name="movieName">
                                    <button type="submit" style="background-color: black; border: none;"><i class="fas fa-search"></i></button>
                                </div>
                            </form>
                            <div></div>

                </body>    
                </html>`

                if (results.length != 0) {
                    output += `<div class="container"><div class="movielists">`;
                    for (var i = 0; i < results.length; i++) {
                        if (i == results.length - 1) {
                            output +=
                            `<article>
                                <div class="movies-box">
                                    <!-- Img -->
                                    <div class="movies-img">
                                        <div class="rating"><i class="fas fa-star"></i>4.9</div>
                                        <div class="fav"><i class="fas fa-heart"></i></div>
                                        <img src="${results[i].movie_image}">
                                    </div>
                                    <!-- Below Description -->
                                    <a href="#container-ranking">
                                        ${results[i].movie_name}
                                    </a>
                                </div>
                            </article></div></div></main>`
                        }
                        else {
                            output +=
                            `<article>
                                <div class="movies-box">
                                    <!-- Img -->
                                    <div class="movies-img">
                                        <div class="rating"><i class="fas fa-star"></i>${results[i].movie_starRate}</div>
                                        <div class="fav"><i class="fas fa-heart"></i></div>
                                        <img src="${results[i].movie_image}">
                                    </div>
                                    <!-- Below Description -->
                                    <a href="#container-ranking">
                                        ${results[i].movie_name}
                                    </a>
                                </div>
                            </article>`
                        }
                    }
                }
                else {  // Not found any movie (display error image)
                    output += `<div class="container">
                                    <img style="width: 25%;   display: block; margin-left: auto; margin-right: auto;" src="Assets/404 Error with a cute animal-pana.png">
                                </div></main>`
                }
            res.send(output)
            // return res.send({ error: false, data: results, message: "This movie exists" });
        });
    }
});

app.use((req, res, next) => {
    console.log("404: Invalid accessed");
    res.status(404).send("NONO, GO BACK, BAD");
})

console.log("Listening on the port 4203");
app.listen(4203); 
