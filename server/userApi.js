var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('./db/DBConfig');
var userSQL = require('./db/usersql');

var pool = mysql.createPool(dbConfig.mysql);

/**
 * Sending response as json format.
 * @param res
 * @param ret
 */
var jsonWrite = function (res, ret) {
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
 * @params needed in the request body:
 * 1. username
 * 2. password
 * 3. email
 * 4. address
 * 5. phone
 * @returns: boolean of process status.
 */
router.use('/register', function (req, res) {
    var sql = userSQL.insert;
    var params = req.body;
    console.log(params);
    pool.query(sql, [params.username, params.password, params.email, params.address, params.phone], function (error, results, fields) {
        if (error) {
            throw error;
        }
        if (results) {
            console.log(results.insertId);
            jsonWrite(res, results.insertId);
        }
    })
});

/**
 * Check whether there is user in the database that has the user name and password.
 * @params needed in the request body:
 * 1. username
 * 2. password
 * @returns the entire record of this user
 */
router.post('/login', (req, res) => {
    var sql = userSQL.checkUser;
    var params = req.body;
    console.log(params);
    pool.query(sql, [params.username, params.password], function (error, results, fields) {
        if (error) throw error;
        if (results) {
            console.log(results[0]);
            req.session.user = results[0];
            //req.session.user = results[0];
            jsonWrite(res, req.session.user);
        }
    })
});

/**
 * Search for a user has the email.
 * @params needed in the request body:
 * 1. email
 * @returns user
 */
router.use('/searchByEmail', (req, res) => {
    var sql = userSQL.checkEmail;
    var params = req.query || req.params;
    console.log(params);
    pool.query(sql, [params.email], function (error, results, fields) {
        if (error) throw error;
        if (results) {
            console.log(results[0]);
            jsonWrite(res, results[0]);
        }
    })
});

/**
 * Search for a user has the username.tree
 * @params needed in the request body:
 * 1. username
 * @returns user
 */
router.get('/usernameExist', (req, res) => {
    let sql = userSQL.usernameExist;
    let params = req.query || req.params;
    console.log(params);
    pool.query(sql, [params.username], function (error, results, fields) {
        if (error) throw error;
        if (results) {
            console.log(results[0]);
            jsonWrite(res, results[0]);
        }
    })
});

/**
 * Search for a user by id.
 * @params needed in the request body:
 * 1. userId
 * @returns user
 */
router.get('/getById', (req, res) => {
    let sql = userSQL.getUserById;
    let params = req.query || req.params;
    console.log(params);
    pool.query(sql, [params.userId], function (error, results, fields) {
        if (error) throw error;
        if (results) {
            console.log(results[0]);
            jsonWrite(res, results[0]);
        }
    })
});

/**
 * Get all trees for a specific user.
 * @params needed in the request body:
 * 1. userId
 * @returns array | list of trees a user has.
 */
router.get('/getTrees', (req, res) => {
    var sql = userSQL.getTrees;
    var params = req.query || req.params;
    console.log(params);
    pool.query(sql, [params.userId], function (error, results, fields) {
        if (error) throw error;
        if (results) {
            console.log(results);
            jsonWrite(res, results);
        }
    })
});

/**
 * Update user account
 * @params needed in the request body:
 * 1. password
 * 2. email
 * 3. address
 * 4. phone
 * 5. id
 * @returns boolean of process status.
 */
router.post('/update', (req, res) => {
    let sql = userSQL.updateAccount;
    let params = req.body;
    console.log("Update user account: " + params);
    pool.query(sql, [params.password, params.email, params.address, params.phone, params.id], (error, results, fields) => {
        if (error) throw error;
        if (results) {
            console.log(results);
            jsonWrite(res, results);
        }
    })
});
module.exports = router;