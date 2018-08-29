var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var staffSQL = require('../db/staffsql');

var pool = mysql.createPool( dbConfig.mysql );

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
 * add staff member
 */
router.post('/add', (req, res) => {
    var sql = staffSQL.insert;
    var params = req.body;
    console.log(params);
    pool.query(sql, [params.name, params.password, params.email, params.address, params.phone], (error, results, fields) => {
        if (error) throw error;
        if (results) {
            console.log(results);
            jsonWrite(res, results);
        }
    })
});

router.post('/login', (req, res) => {
    var sql = staffSQL.checkStaff;
    var params = req.body;
    console.log(params);
    pool.query(sql, [params.name, params.password], (error, results, fields) => {
        if (error) throw error;
        if (results) {
            console.log(results);
            jsonWrite(res,results);
        }
    })
});

/**
 * update staff's information
 */
router.post('/update', (req, res) => {
    var sql = staffSQL.updateAccount;
    var params = req.body;
    console.log(params);
    pool.query(sql, [params.email, params.address, params.phone, params.staffId], (error, results, fields) => {
        if (error) throw error;
        if (results) {
            console.log(results);
            jsonWrite(res, result);
        }
    })
});

router.post('/allStaff', (req, res) => {
    var sql = staffSQL.queryAll;
    var params = req.body;
    console.log(params);
    pool.query(sql, (error, results, fields) => {
        if (error) throw error;
        if (results) {
            console.log(results);
            jsonWrite(res, result);
        }
    })
});

router.get('/trees', (req, res) => {
    var sql = staffSQL.getTrees;
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

router.get('/tree_app', (req, res) => {
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

router.get('/postcard_app', (req, res) => {
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