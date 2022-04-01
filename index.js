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

app.get('/',function(req,res){
    console.log("Accessing INDEX");
    res.sendFile(path.join(__dirname+'/html/index.html'));
});

app.get('/index',function(req,res){
    console.log("Accessing INDEX");
    res.sendFile(path.join(__dirname+'/html/index.html'));
});

app.get('/about',function(req,res){
    console.log("Accessing About page");
    res.sendFile(path.join(__dirname+'/html/about.html'));
});

app.get('/login',function(req,res){
    console.log("Accessing Login page");
    res.sendFile(path.join(__dirname+'/html/login.html'));
});

app.get('/result',function(req,res){
    console.log("Accessing Result page");
    res.sendFile(path.join(__dirname+'/html/result.html'));
});

app.get('/search',function(req,res){
    console.log("Accessing Search page");
    res.sendFile(path.join(__dirname+'/html/search.html'));
});

app.get('/sudolog',function(req,res){
    console.log("Accessing Admind Login page");
    res.sendFile(path.join(__dirname+'/html/sudolog.html'));
});
   
////////////////////////////////////////////////////////////    CRUD OPERATION   ///////////////////////////////////////////////////////////////////////

/*----------------------------------CUSTOMER CRUD----------------------------------*/
// get all 
app.get('/customer', function (req, res) {
    con.query('SELECT * FROM customer', function (error, results) {
    if (error) throw error;
        return res.send({ 
            error: false, 
            data: results, 
            message: 'Customer list returned successfully.' });
    });
});

// add single record
app.post('/customer', function (req, res) {
    let customer = req.body.data;
    console.log(customer);
    if (!customer) {
        return res.status(400).send({ 
            error: true, 
            message: 'Please provide customer information.'
        });
    }
    con.query("INSERT INTO customer SET ? ", customer, function (error, results) {
    if (error) throw error;
        return res.send ({
            error: false, 
            data: results.affectedRows, 
            message: 'New customer has been created successfully.'
        });
    });
});

//update
app.put('/customer', function (req, res) {
    let custEmail = req.body.data[0].email;
    let customer = req.body.data;
    if (!custEmail || !customer) {
        return res.status(400).send({ 
            error: customer, 
            message: 'Please provide valid customer information' 
        });
    }
    con.query("UPDATE customer SET ? WHERE email = ?", [customer[0], custEmail], function (error, results) {
    if (error) throw error;
        return res.send({
            error: false, 
            data: results.affectedRows, 
            message: 'customer has been updated successfully.'
        })
    });
});

//delete
app.delete('/customer', function (req, res) {
    let custEmail = req.body.data[0].email;
    if (!custEmail) {
        return res.status(400).send({ error: true, message: 'Please provide email' });
    }
    con.query('DELETE FROM customer WHERE email = ?', [custEmail], function (error, results)
    {
    if (error) throw error;
        return res.send({ error: false, data: results.affectedRows, message: 'Customer has been deleted successfully.' });
    });
});
/*----------------------------------CUSTOMER CRUD----------------------------------*/

/*--------------------------------------MOVIES CRUD-----------------------------------------*/
// get all 
app.get('/movie', function (req, res) {
    con.query('SELECT * FROM movie', function (error, results) {
    if (error) throw error;
        return res.send({ 
            error: false, 
            data: results, 
            message: 'Movie list returned successfully.' });
    });
});

// add single record
app.post('/movie', function (req, res) {
    let movie = req.body.data;
    console.log(movie);
    if (!movie) {
        return res.status(400).send({ 
            error: true, 
            message: 'Please provide valid movie information.'
        });
    }
    con.query("INSERT INTO movie SET ? ", movie, function (error, results) {
    if (error) throw error;
        return res.send ({
            error: false, 
            data: results.affectedRows, 
            message: 'New movie has been created successfully.'
        });
    });
});

//update
app.put('/movie', function (req, res) {
    let movie_ID = req.body.data[0].movie_ID;
    let movie = req.body.data;
    if (!movie_ID || !movie) {
        return res.status(400).send({ 
            error: movie, 
            message: 'Please provide valid movie information' 
        });
    }
    con.query("UPDATE movie SET ? WHERE movie_ID = ?", [movie[0], movie_ID], function (error, results) {
    if (error) throw error;
        return res.send({
            error: false, 
            data: results.affectedRows, 
            message: 'movie has been updated successfully.'
        })
    });
});

//delete
app.delete('/movie', function (req, res) {
    let movie_ID = req.body.data[0].movie_ID;
    if (!movie_ID) {
        return res.status(400).send({ error: true, message: 'Please provide movie_ID' });
    }
    con.query('DELETE FROM movie WHERE movie_ID = ?', [movie_ID], function (error, results)
    {
    if (error) throw error;
        return res.send({ error: false, data: results.affectedRows, message: 'Movie has been deleted successfully.' });
    });
});
////////////////////////////////////////////////////////////    CRUD OPERATION   ///////////////////////////////////////////////////////////////////////

app.use((req, res, next) => {
    console.log("404: Invalid accessed");
    res.status(404).send("NONO, GO BACK, BAD");
   })

console.log("Listening on the port 3030");
app.listen(3030); 