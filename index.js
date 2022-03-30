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
const app = express();

console.log(__dirname);
console.log(__filename);

dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/Assets", express.static(__dirname + '/Assets'));
app.use("/script", express.static(__dirname + '/script'));


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


app.get('/searchMovies', function(req, res) {
    let movieName = "%"+(req.query.movieName).toLowerCase()+"%";
    console.log("User searching (LOWER): " +movieName);
    con.query('SELECT * FROM movie WHERE lower(movie_name) LIKE ?', movieName, function (error, results) {
        if (error) throw error;
        // console.log(results);
        // not found and not input anything case
        if (results.length == 0 || movieName === "%%") {
            return res.send({ error: true, message: "This movie doesn't exist" });
        }
        else {
            return res.send({ error: false, data: results, message: "This movie exists" });
        }
    })
})

app.use((req, res, next) => {
    console.log("404: Invalid accessed");
    res.status(404).send("NONO, GO BACK, BAD");
})

console.log("Listening on the port 3030");
app.listen(3030); 