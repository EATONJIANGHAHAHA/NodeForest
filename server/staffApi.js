var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('./db/DBConfig');
var staffSQL = require('./db/staffsql');

var pool = mysql.createPool( dbConfig.mysql );

/**
 * Sending response as json format.
 * @param res
 * @param ret
 */
var jsonWrite = (res, ret) => {
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
 * login if the given username and password pair exist within the database,
 * if exists, returns the entire staff record.
 * @params needed in the request body:
 * 1. username
 * 2. password
 * @returns entire record of staff.
 */
router.post('/login', (req, res) => {
    var sql = staffSQL.checkStaff;
    var params = req.body;
    console.log(params);
    pool.query(sql, [params.username, params.password], (error, results, fields) => {
        if (error) throw error;
        if (results) {
            console.log(results[0]);
            req.session.staff = results[0];
            jsonWrite(res,results[0]);
        }
    })
});

/**
 * update staff's information
 * @params needed in the request body:
 * 1. password
 * 2. email
 * 3. address,
 * 4. phone,
 * 5. staffId
 * @returns boolean of process status.
 */
router.put('/update', (req, res) => {
    var sql = staffSQL.update;
    var params = req.body;
    console.log(params);
    pool.query(sql, [params.password, params.email, params.address, params.phone, params.id], (error, results, fields) => {
        if (error) throw error;
        if (results) {
            console.log(results);
            jsonWrite(res, results);
        }
    })
});

/**
 * get all staff record
 * @returns all the staff records
 */
router.post('/allStaff', (req, res) => {
    var sql = staffSQL.queryAll;
    var params = req.body;
    console.log(params);
    pool.query(sql, (error, results, fields) => {
        if (error) throw error;
        if (results) {
            console.log(results);
            jsonWrite(res, results);
        }
    })
});

/**
 * Get all the trees a staff is managed
 * @params needed in the request body:
 * 1. staffId
 * @returns array | list of trees.
 */
router.post('/trees', (req, res) => {
    var sql = staffSQL.getTrees;
    var params = req.body;
    console.log(params);
    pool.query(sql, [params.staffId], (error, results, fields) => {
        if (error) throw error;
        if (results) {
            for(let i = 0; i<results.length; i++){
                results[i].upload_date = getDate(results[i].upload_date);
                results[i].last_edit = getDate(results[i].last_edit);
            }
            console.log(results);
            jsonWrite(res, results);
        }
    })
});

/**
 * get all the tree application a staff is assigned and managed.
 * @params needed in the request body:
 * 1. staffId
 * @returns array | list of tree applications.
 */
router.get('/tree_apps', (req, res) => {
    var sql = staffSQL.getTreeApplications;
    var params = req.query||req.params;
    console.log(params);
    pool.query(sql, [params.staffId], (error, results, fields) => {
        if (error) throw error;
        if (results) {
            console.log(results);
            jsonWrite(res, results);
        }
    })
});

/**
 * get all the postcard application a staff is assigned and managed.
 * @params needed in the request body:
 * 1. staffId
 * @returns array | list of postcard applications.
 */
router.get('/postcard_apps', (req, res) => {
    var sql = staffSQL.getPostcardApplications;
    var params = req.query||req.params;
    console.log(params);
    pool.query(sql, [params.staffId], (error, results, fields) => {
        if (error) throw error;
        if (results) {
            console.log(results);
            jsonWrite(res, results);
        }
    })
});

/**
 * reset a staff's password.
 * @params needed in the request body:
 * 1. newPassword
 * 2. staffId
 * @returns boolean of process status.
 */
router.post('/new_password', (req, res) => {
    var sql = staffSQL.updatePassword;
    var params = req.body;
    console.log(params);
    pool.query(sql, [params.newPassword, params.staffId], (error, results, fields) => {
        if (error) throw error;
        if (results) {
            console.log(results);
            jsonWrite(res, results);
        }
    })
});

router.get('/hasTrees', (req, res) => {
    let sql = staffSQL.hasTrees;
    let params = req.query||req.params;
    console.log(params);
    pool.query(sql, [params.staffId], (error, results, fields) => {
        if (error) throw error;
        if (results) {
            console.log(results);
            jsonWrite(res, results);
        }
    })
});

router.get('/hasUnsolvedApps', (req, res) => {
    let sql = staffSQL.hasUnsolvedApplication;
    let params = req.query||req.params;
    console.log(params);
    pool.query(sql, [params.staffId], (error, results, fields) => {
        if (error) throw error;
        if (results) {
            console.log(results);
            jsonWrite(res, results);
        }
    })
});

/**
 * You first need to create a formatting function to pad numbers to two digits…
 **/
function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}

/**
 * …and then create the method to output the date string as desired.
 * Some people hate using prototypes this way, but if you are going
 * to apply this to more than one Date object, having it as a prototype
 * makes sense.
 **/
function getNow() {
    return getDate(new Date());
}

function getDate(d) {
    return d.getFullYear() +
        "-" + twoDigits(1 + d.getMonth()) +
        "-" + twoDigits(d.getDate()) +
        " " + twoDigits(d.getHours()) +
        ":" + twoDigits(d.getMinutes()) +
        ":" + twoDigits(d.getSeconds());
}
module.exports = router;