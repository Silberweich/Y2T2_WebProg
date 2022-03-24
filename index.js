const http = require("http");
const fs = require("fs"); 
const path = require('path');
const express = require('express');
const app = express();

console.log(__dirname);
console.log(__filename);

app.use("/Assets", express.static(__dirname + '/Assets'));

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

app.use((req, res, next) => {
    console.log("404: Invalid accessed");
    res.status(404).send("NONO, GO BACK, BAD");
   })
   
console.log("Listening on the port 3030");
app.listen(3030); 