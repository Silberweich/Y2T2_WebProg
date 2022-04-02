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
   
////////////////////////////////////////////////////////////    CRUD OPERATION   ///////////////////////////////////////////////////////////////////////

/*----------------------------------USER CRUD----------------------------------*/
// get all 
app.get('/user', function (req, res) {
    con.query('SELECT * FROM user', function (error, results) {
    if (error) throw error;
        return res.send({ 
            error: false, 
            data: results, 
            message: 'User list returned successfully.' });
    });
});

// add single record
app.post('/user', function (req, res) {
    let user = req.body.data;
    console.log(user);
    if (!user) {
        return res.status(400).send({ 
            error: true, 
            message: 'Please provide user information.'
        });
    }
    con.query("INSERT INTO user SET ? ", user, function (error, results) {
    if (error) throw error;
        return res.send ({
            error: false, 
            data: results.affectedRows, 
            message: 'New user has been created successfully.'
        });
    });
});

//update
app.put('/user', function (req, res) {
    let userEmail = req.body.data[0].email;
    let user = req.body.data;
    if (!userEmail || user) {
        return res.status(400).send({ 
            error: user, 
            message: 'Please provide valid user information' 
        });
    }
    con.query("UPDATE user SET ? WHERE email = ?", [user[0], userEmail], function (error, results) {
    if (error) throw error;
        return res.send({
            error: false, 
            data: results.affectedRows, 
            message: 'User has been updated successfully.'
        })
    });
});

//delete
app.delete('/user', function (req, res) {
    let userEmail = req.body.data[0].email;
    if (!userEmail) {
        return res.status(400).send({ error: true, message: 'Please provide email' });
    }
    con.query('DELETE FROM user WHERE email = ?', [userEmail], function (error, results)
    {
    if (error) throw error;
        return res.send({ error: false, data: results.affectedRows, message: 'User has been deleted successfully.' });
    });
});
/*----------------------------------CUSTOMER CRUD----------------------------------*/

/*----------------------------------ADMIN CRUD----------------------------------*/
// get all 
app.get('/admin', function (req, res) {
    con.query('SELECT * FROM admin', function (error, results) {
    if (error) throw error;
        return res.send({ 
            error: false, 
            data: results, 
            message: 'Admin list returned successfully.' });
    });
});

// add single record
app.post('/admin', function (req, res) {
    let admin = req.body.data;
    console.log(admin);
    if (!admin) {
        return res.status(400).send({ 
            error: true, 
            message: 'Please provide admin information.'
        });
    }
    con.query("INSERT INTO admin SET ? ", admin, function (error, results) {
    if (error) throw error;
        return res.send ({
            error: false, 
            data: results.affectedRows, 
            message: 'New admin has been created successfully.'
        });
    });
});

//update
app.put('/admin', function (req, res) {
    let adminEmail = req.body.data[0].email;
    let admin = req.body.data;
    if (!adminEmail || !admin) {
        return res.status(400).send({ 
            error: user, 
            message: 'Please provide valid admin information' 
        });
    }
    con.query("UPDATE admin SET ? WHERE email = ?", [admin[0], adminEmail], function (error, results) {
    if (error) throw error;
        return res.send({
            error: false, 
            data: results.affectedRows, 
            message: 'admin has been updated successfully.'
        })
    });
});

//delete
app.delete('/admin', function (req, res) {
    let adminEmail = req.body.data[0].email;
    if (!adminEmail) {
        return res.status(400).send({ error: true, message: 'Please provide email' });
    }
    con.query('DELETE FROM admin WHERE email = ?', [adminEmail], function (error, results)
    {
    if (error) throw error;
        return res.send({ error: false, data: results.affectedRows, message: 'admin has been deleted successfully.' });
    });
});
/*----------------------------------ADMIN CRUD----------------------------------*/

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
/*--------------------------------------MOVIES CRUD-----------------------------------------*/

////////////////////////////////////////////////////////////    CRUD OPERATION   ///////////////////////////////////////////////////////////////////////

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
    if (movieName === "%%"){
        con.query('SELECT * FROM movie WHERE lower(movie_name) LIKE ?', movieName, function (error, results) {
            if (error) throw error;
            if (error) {
                return res.send({ error: true, message: "Something went wrong" });
            }
            else {
                return res.send({ error: false, data: results, message: "This movie exists" });
            }

        })
    }
    else
    con.query('SELECT * FROM movie WHERE lower(movie_name) LIKE ?', movieName, function (error, results) {
        if (error) throw error;
        // console.log(results);
        // not found and not input anything case
        //if (results.length == 0 || movieName === "%%") {
        //    return res.send({ error: true, message: "This movie doesn't exist" });
        //}
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