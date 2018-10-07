var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('./db/DBConfig');
var adminSQL = require('./db/adminsql');
let staffSQL = require('./db/staffsql')

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

router.get('/staffs', (req, res) => {
    var sql = staffSQL.getAllStaffs;
    var params = req.body;
    console.log(params);
    pool.query(sql,  (error, results, fields) => {
        if (error) throw error;
        if (results) {
            console.log(results);
            jsonWrite(res,results);
        }
    })
});

router.get('/staffs/getById', (req, res) => {
    let sql = staffSQL.getStaffById;
    let params = req.query;
    console.log(params);
    pool.query(sql, [params.staffId],  (error, results, fields) => {
        if (error) throw error;
        if (results) {
            console.log(results);
            jsonWrite(res,results);
        }
    })
});

/**
 * Update admin account by new email.
 */
router.post('/update', (req, res) =>{
    var sql = adminSQL.updatePassword;
    var params = req.body;
    console.log(params);
    pool.query(sql, [params.password, params.id], (error, results, fields) => {
        if(error) throw  error;
        if(results){
            console.log(results);
            jsonWrite(res, results);
        }
    })
})

/**
 * Add new staff
 */
router.post('/staffs/add', (req, res) =>{
    var sql = staffSQL.addStaff;
    var params = req.body;
    console.log(params);
    pool.query(sql, [params.username, params.password, params.email, params.phone, params.address], (error, results, fields) => {
        if(error) throw  error;
        if(results){
            console.log(results);
            jsonWrite(res, results);
        }
    })
})

/**
 * Update staff.
 */
router.post('/staffs/update', (req, res) =>{
    var sql = staffSQL.updateAccount;
    var params = req.body;
    console.log(params);
    pool.query(sql, [params.password, params.email, params.address, params.phone, params.staffId], (error, results, fields) => {
        if(error) throw  error;
        if(results){
            console.log(results);
            jsonWrite(res, results);
        }
    })
})
module.exports = router;