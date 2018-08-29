var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var staffSQL = require('../db/postcardsql');

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

/*
router.post('/new_postcard', )*/
