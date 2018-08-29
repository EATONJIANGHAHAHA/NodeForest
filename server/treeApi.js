var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var dbConfig = require('../db/DBConfig')
var treeSQL = require('../db/treesql')

var pool = mysql.createPool(dbConfig.mysql)

var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: 'Operation failed'
        })
    } else {
        res.json(ret)
    }
}

/**
 * Add user to the database.
 * Order of params are: username, password, email, address, phone.
 */
router.post('/add', function (req, res) {
    var sql = treeSQL.insert
    var params = req.body
    console.log(params)
    pool.query(sql, [params.height, params.location, params.locationImg, params.species, params.sayings, params.name,
        params.ownerId, params.staffId, params.health, params.last_edit], function (error, results, fields) {
        if (error) throw error
        if (results) {
            console.log(results)
            jsonWrite(res, results)
        }
    })
})



router.route('/:treeId')
/**
 * Get information for a tree.
 * The link is like localhost:3000/api/tree/1.
 */
    .get(function (req, res) {
        var sql = treeSQL.getById
        console.log(req.params)
        pool.query(sql, [req.params.treeId], function (error, results, fields) {
            if (error) throw error
            if (results) {
                console.log(results)
                jsonWrite(res, results)
            }
        })
    })
    /**
     * Update a information of a tree.
     */
    .put(function (req, res) {
        var sql = treeSQL.update
        console.log(req.params)
        pool.query(sql, [req.body.height, req.body.health, req.body.last_edit, req.params.treeId], function (error, results, fields) {
            if (error) throw error
            if (results) {
                console.log(results)
                jsonWrite(res, results)
            }
        })
    })


/**
 * Get historical photos of a tree.
 */
router.get('/getPhotos', (req, res) => {
    var sql = treeSQL.getPhotos
    var params = req.query || req.params
    console.log(params)
    pool.query(sql, [params.treeId], function (error, results, fields) {
        if (error) throw error
        if (results) {
            console.log(results)
            jsonWrite(res, results)
        }
    })
})
module.exports = router