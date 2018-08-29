var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var dbConfig = require('../db/DBConfig')
var treeAppSQL = require('../db/treeappsql')

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
 * Add new application for tree to the database.
 */
router.post('/add', function (req, res) {
    var sql = treeAppSQL.insert
    var params = req.body
    console.log(params)
    pool.query(sql, [params.apply_date, params.species, params.location, params.sayings, params.name, params.status, params.amount, params.user_id], function (error, results, fields) {
        if (error) throw error
        if (results) {
            console.log(results)
            jsonWrite(res, results)
        }
    })
})



router.route('/:treeAppId')
/**
 * Get information for a tree.
 * The link is like localhost:3000/api/tree/1.
 */
    .get(function (req, res) {
        var sql = treeAppSQL.getById
        console.log(req.params)
        pool.query(sql, [req.params.treeAppId], function (error, results, fields) {
            if (error) throw error
            if (results) {
                console.log(results)
                jsonWrite(res, results)
            }
        })
    })
    /**
     * Complete a tree application
     */
    .put(function (req, res) {
        var sql = treeAppSQL.update
        console.log(req.params)
        pool.query(sql, [req.body.status, req.body.staff_id, req.body.complete_date, req.params.treeAppId], function (error, results, fields) {
            if (error) throw error
            if (results) {
                console.log(results)
                jsonWrite(res, results)
            }
        })
    })

module.exports = router