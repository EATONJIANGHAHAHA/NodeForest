var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('./db/DBConfig');
var userSQL = require('./db/usersql');

var pool = mysql.createPool( dbConfig.mysql );

/**
 * Sending response as json format.
 * @param res
 * @param ret
 */
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

router.use('/', function(req, res){
    if (typeof req.session.user !== 'undefined') {
        jsonWrite(res, req.session.user);
    }
    if (typeof req.session.admin !== 'undefined') {
        jsonWrite(res, req.session.admin);
    }
    if (typeof req.session.staff !== 'undefined') {
        jsonWrite(res, req.session.staff);
    }
    else jsonWrite(res, "empty session");
});

module.exports = router;