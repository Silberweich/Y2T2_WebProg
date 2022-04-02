////////////////////////////////////////////////////////////    CRUD OPERATION   ///////////////////////////////////////////////////////////////////////
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const dotenv = require('dotenv');
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
/*----------------------------------USER CRUD----------------------------------*/
// get all 
router.get('/user', function (req, res) {
    con.query('SELECT * FROM user', function (error, results) {
    if (error) throw error;
        return res.send({ 
            error: false, 
            data: results, 
            message: 'User list returned successfully.' });
    });
});

// add single record
router.post('/user', function (req, res) {
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
router.put('/user', function (req, res) {
    let userEmail = req.body.data[0].email;
    let user = req.body.data;
    if (!userEmail || !user) {
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
router.delete('/user', function (req, res) {
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
/*----------------------------------USER CRUD----------------------------------*/

/*----------------------------------ADMIN CRUD----------------------------------*/
// get all 
router.get('/admin', function (req, res) {
    con.query('SELECT * FROM admin', function (error, results) {
    if (error) throw error;
        return res.send({ 
            error: false, 
            data: results, 
            message: 'Admin list returned successfully.' });
    });
});

// add single record
router.post('/admin', function (req, res) {
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
router.put('/admin', function (req, res) {
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
router.delete('/admin', function (req, res) {
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
router.get('/movie', function (req, res) {
    con.query('SELECT * FROM movie', function (error, results) {
    if (error) throw error;
        return res.send({ 
            error: false, 
            data: results, 
            message: 'Movie list returned successfully.' });
    });
});

// add single record
router.post('/movie', function (req, res) {
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
router.put('/movie', function (req, res) {
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
router.delete('/movie', function (req, res) {
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

module.exports = router;

////////////////////////////////////////////////////////////    CRUD OPERATION   ///////////////////////////////////////////////////////////////////////




/******************************************TEST CASES********************************************* */

//================================User test cases=========================================
//  Testing search (GET)
//  URL     = http://localhost:3030/user
//  method  = GET 
//  body    = none


// Testing insert (POST)
//  URL     = http://localhost:3030/user
//  method  = POST 
//  body    = raw JSON
// {
//     "error": false,
//        "data": [
//            {
//                "email": "test@gmail.com",
//                "password": "1234",
//                "first_name": "User",
//                "last_name": "Test",
//                "age": 999
//            }
//        ]    
// }


// Testing update (PUT)
//  URL     = http://localhost:3030/user
//  method  = PUT 
//  body    = raw JSON
// {
//     "error": false,
//        "data": [
//            {
//                "email": "test@gmail.com",
//                "password": "4321",
//                "first_name": "UserEdited",
//                "last_name": "TestEdited",
//                "age": 111
//            }
//        ]    
// }        


// Testing delete (DELETE)
//  URL     = http://localhost:3030/user
//  method  = DELETE 
//  body    = raw JSON
// {
//     "error": false,
//        "data": [
//            {
//                "email": "test@gmail.com"
//            }
//        ]    
// }  
//================================User test cases=========================================


//================================Admin test cases=========================================
//  Testing search (GET)
//  URL     = http://localhost:3030/admin
//  method  = GET 
//  body    = none


// Testing insert (POST)
//  URL     = http://localhost:3030/admin
//  method  = POST 
//  body    = raw JSON
// {
//     "error": false,
//        "data": [
//            {
//                "email": "testadmin@gmail.com",
//                "password": "Admin1234",
//                "first_name": "Admin",
//                "last_name": "Test",
//                "age": 999
//            }
//        ]    
// }


// Testing update (PUT)
//  URL     = http://localhost:3030/admin
//  method  = PUT 
//  body    = raw JSON
// {
//     "error": false,
//        "data": [
//            {
//                "email": "testadmin@gmail.com",
//                "password": "4321nimdA",
//                "first_name": "AdminEdited",
//                "last_name": "TestEdited",
//                "age": 111
//            }
//        ]    
// }        


// Testing delete (DELETE)
//  URL     = http://localhost:3030/admin
//  method  = DELETE 
//  body    = raw JSON
// {
//     "error": false,
//        "data": [
//            {
//                "email": "testadmin@gmail.com"
//            }
//        ]    
// }  
//================================Admin test cases=========================================


//================================Movies test cases=========================================
//  Testing search (GET)
//  URL     = http://localhost:3030/movie
//  method  = GET 
//  body    = none


// Testing insert (POST)
//  URL     = http://localhost:3030/user
//  method  = POST 
//  body    = raw JSON
// {
//     "error": false,
//        "data": [
//            {
//              "movie_ID": 999,
//              "movie_name": "TestMovie",
//              "movie_genre": "Horror",
//              "movie_rate": 18,
//              "release_date": "2021-10-27",
//              "movie_length": 999,
//              "soundtrack": "TH",
//              "subtitle": null,
//              "synopsis": "THIS IS A SYNOPSIS"
//            }
//        ]    
// }  


// Testing update (PUT)
//  URL     = http://localhost:3030/user
//  method  = PUT 
//  body    = raw JSON
// {
//     "error": false,
//        "data": [
//            {
//              "movie_ID": 999,
//              "movie_name": "TestMovieEDITED",
//              "movie_genre": "Action",
//              "movie_rate": 20,
//              "release_date": "2022-10-27",
//              "movie_length": 111,
//              "soundtrack": "TH",
//              "subtitle": null,
//              "synopsis": "THIS IS A SYNOPSIS BUT IT IS EDITED"
//            }
//        ]    
// }  
    


// Testing delete (DELETE)
//  URL     = http://localhost:3030/user
//  method  = DELETE 
//  body    = raw JSON
// {
//     "error": false,
//        "data": [
//            {
//                "movie_ID": 999
//            }
//        ]    
// }  
//================================Movies test cases=========================================