var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('./db/DBConfig');
var adminSQL = require('./db/adminsql');

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
 * if exists, returns the entire admin record.
 * @params needed in the request body:
 * 1. name
 * 2. password
 * @returns entire record of admin.email
 */
router.post('/login', (req, res) => {
    var sql = adminSQL.checkAdmin;
    var params = req.body;
    console.log(params);
    pool.query(sql, [params.username, params.password], (error, results, fields) => {
        if (error) throw error;
        if (results) {
            console.log(results[0]);
            req.session.admin = results[0];
            jsonWrite(res,results[0]);
        }
    })
});

router.get('/get_all_staffs', (req, res) => {
    var sql = adminSQL.getAllStaffs;
    var params = req.body;
    console.log(params);
    pool.query(sql, (error, results, fields) => {
        if (error) throw error;
        if (results) {
            console.log(results);
            jsonWrite(res,results);
        }
    })
});
module.exports = router;