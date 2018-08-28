var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var treeSQL = require('../db/treesql');

var pool = mysql.createPool( dbConfig.mysql );

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

/**
 * Add user to the database.
 * Order of params are: username, password, email, address, phone.
 */
router.use('/add', function(req, res){
    var sql = treeSQL.insert;
    var params = req.body;
    console.log(params);
    pool.query(sql, [params.height, params.location, params.locationImg, params.species, params.sayings, params.name,
        params.ownerId, params.staffId, params.health, params.last_edit], function(error, results, fields) {
        if (error) throw error;
        if (results) {
            console.log(results);
            jsonWrite(res, results);
        }
    })
});




/**
 * Search for a tree by id.
 */
router.get('/getById', (req, res) => {
    var sql = treeSQL.getById;
    var params = req.query||req.params;
    console.log(params);
    pool.query(sql, [params.treeId], function(error, results, fields) {
        if (error) throw error;
        if (results) {
            console.log(results)
            jsonWrite(res, results);
        }
    })
});

router.get('/getPhotos', (req, res) => {
    var sql = treeSQL.getPhotos;
    var params = req.query||req.params;
    console.log(params);
    pool.query(sql, [params.treeId], function(error, results, fields) {
        if (error) throw error;
        if (results) {
            console.log(results)
            jsonWrite(res, results);
        }
    })
});
module.exports = router;