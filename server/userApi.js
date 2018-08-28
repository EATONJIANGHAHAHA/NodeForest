var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/usersql');

var pool = mysql.createPool( dbConfig.mysql );

var jsonWrite = function(res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: 'Operation failed'
        });
    } else {
        res.json(ret);
    }
};

/**
 * Add user to the database.
 * Order of params are: username, password, email, address, phone.
 */
router.use('/add', function(req, res){
    var sql = userSQL.insert;
    var params = req.body;
    console.log(params);
    pool.query(sql, [params.username, params.password, params.email, params.address, params.phone], function(error, results, fields) {
        if (error) throw error;
        if (results) {
            console.log(results);
            jsonWrite(res, results);
        }
    })
});

/**
 * Check whether there is user in the database that has the user name and password.
 */
router.post('/login', (req, res) => {
    var sql = userSQL.checkUser;
    var params = req.body;
    console.log(params);
    pool.query(sql, [params.username, params.password], function(error, results, fields) {
        if (error) throw error;
        if (results) {
            console.log(results);
            jsonWrite(res, results);
        }
    })
});

/**
 * Search for a user has the email.
 */
router.use('/searchByEmail', (req, res) => {
    var sql = userSQL.checkEmail;
    var params = req.query||req.params;
    console.log(params);
    pool.query(sql, [params.email], function(error, results, fields) {
        if (error) throw error;
        if (results) {
            console.log(results)
            jsonWrite(res, results);
        }
    })
});

/**
 * Search for a user has the username.
 */
router.get('/searchByUsername', (req, res) => {
    var sql = userSQL.checkUsername;
    var params = req.query||req.params;
    console.log(params);
    pool.query(sql, [params.username], function(error, results, fields) {
        if (error) throw error;
        if (results) {
            console.log(results);
            jsonWrite(res, results);
        }
    })
});

/**
 * Get all trees for a specific user.
 */
router.get('/getTrees', (req, res) => {
    var sql = userSQL.getTrees;
    var params = req.query||req.params;
    console.log(params);
    pool.query(sql, [params.userId], function(error, results, fields) {
        if (error) throw error;
        if (results) {
            console.log(results)
            jsonWrite(res, results);
        }
    })
});
module.exports = router;