const http = require("http");
const fs = require("fs");
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');
const express = require('express');
const dotenv = require('dotenv');
const app = express();

console.log(__dirname);
console.log(__filename);

dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

app.post('/login', function (req, res) {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(400).send({ error: true, message: 'Please provide fill information' });
    }

    con.query('SELECT * FROM user WHERE email = ?', email, function (error, results) {
        if (error) throw error;
        let info = results[0];
        if (info) {
            if (info['password'] === password) {
                console.log(info)
                console.log("User Login Successful");
                return res.send({ error: false, data: results, message: "User Login Success" });
            } else {
                console.log("Login failed Successfully")
                return res.send({ error: false, data: results, message: "Login failed Successfully, Email doesn't match with the password" });
            }
        }
        return res.send({ error: false, data: results, message: "This user doesn't exist" });
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
        let info = results[0];
        if (info) {
            if (info['password'] === password) {
                console.log(info)
                console.log("Admin Login Successful");
                return res.send({ error: false, data: results, message: "Admin Login Success" });
            } else {
                console.log("Login failed Successfully")
                return res.send({ error: false, data: results, message: "Login failed Successfully, Email doesn't match with the password" });
            }
        }
        return res.send({ error: false, data: results, message: "This user doesn't exist" });
    })
})

app.use((req, res, next) => {
    console.log("404: Invalid accessed");
    res.status(404).send("NONO, GO BACK, BAD");
})

console.log("Listening on the port 3030");
app.listen(3030); 