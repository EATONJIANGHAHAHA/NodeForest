var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('./db/DBConfig');
var postcardSQL = require('./db/postcardsql');

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
 * Insert new postcard application
 * @params needed in the request body:
 * 1. address
 * 2. postCode
 * 3. status
 * 4. applyDate
 * 5. receiveDate
 * @returns boolean of process status.
 */
router.post('/new', (req, res) => {
    var sql = postcardSQL.insert;
    var params = req.body;
    console.log(params);
    pool.query(sql, [params.address, params.postCode, params.status, params.applyDate, params.recieveDate], (error, results, fields) => {
        if (error) throw error;
        if (results) {
            console.log(results);
            jsonWrite(res, results);
        }
    })
});

/**
 * update the application status.
 * @params needed in the request body:
 * 1. status
 * 2. postcardId
 * @returns boolean of process status.
 */
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

/**
 * Update receive date for the postcard application
 * because when the application is created, the postcard needs to to be received.
 * @params needed in the request body:
 * 1. receiveDate
 * 2. postcardId
 * @returns boolean of operation status.
 */
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
module.exports = router;
