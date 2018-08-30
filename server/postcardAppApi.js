var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var postcardSQL = require('../db/postcardsql');

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

router.post('/new_postcard', (req, res) => {
    var sql = postcardSQL.insert;
    var params = req.body;
    console.log(params);
    pool.query(sql, [params.address, params.post_code, params.status, params.apply_date, params.recieve_date], (error, results, fields) => {
        if (error) throw error;
        if (results) {
            console.log(results);
            jsonWrite(res, results);
        }
    })
});

router.put('/status', (req, res) => {
    var sql = postcardSQL.updateStatus;
    var params = req.body;
    console.log(params);
    pool.query(sql, [params.status, params.postcardId], (error, results, fields) => {
        if (error) throw error;
        if (results) {
            console.log(results);
            jsonWrite(res, results);
        }
    })
});

router.put('/receive_date', (req, res) => {
    var sql = postcardSQL.updateReceiveDate;
    var params = req.body;
    console.log(params);
    pool.query(sql, [params.recieveDate, params.postcardId], (error, results, fields) => {
        if (error) throw error;
        if (results) {
            console.log(results);
            jsonWrite(res, results);
        }
    })
});
