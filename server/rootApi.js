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

router.get('/', function(req, res){
    console.log("root api called");
    console.log(req.session);
    if (typeof req.session.user !== 'undefined') {
        let user = req.session.user;
        user.type = "user";
        console.log(user);
        jsonWrite(res, user);
    }
    else if (typeof req.session.admin !== 'undefined') {
        let admin = req.session.admin;
        admin.type = "admin";
        console.log(admin);
        jsonWrite(res, admin);
    }
    else if (typeof req.session.staff !== 'undefined') {
        let staff = req.session.staff;
        staff.type = "staff";
        console.log(staff);
        jsonWrite(res, staff);
    }
    else if (typeof req.session.staff === 'undefined' && typeof req.session.user === 'undefined' && typeof req.session.admin === 'undefined'){
        jsonWrite(res, "empty session");
    }
});

module.exports = router;