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
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

router.use('/', function(req, res){
    var sql = userSQL.queryAll;
    var params = req.body;
    console.log(params);
    pool.query(sql, null, function(error, results, fields) {
        if (error) throw error;
        if (results) {
            console.log(results)
            jsonWrite(res, results);
        }
    })
});

module.exports = router;