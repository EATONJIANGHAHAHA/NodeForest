var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var dbConfig = require('./db/DBConfig')
var treeAppSQL = require('./db/treeappsql')

var pool = mysql.createPool(dbConfig.mysql)

/**
 * Sending response as json format.
 * @param res
 * @param ret
 */
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
 * @params needed in the request body:
 * 1. applyDate
 * 2. species
 * 3. location
 * 4. sayings
 * 5. name
 * 6. status
 * 7. amount
 * 8. userId
 * @returns boolean of process status
 */
router.post('/add', function (req, res) {
    var sql = treeAppSQL.insert
    var params = req.body
    console.log(params)
    pool.query(sql, [params.applyDate, params.species, params.location, params.sayings, params.name, params.status, params.amount, params.userId], function (error, results, fields) {
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
 * @params needed in the request body:
 * 1. treeAppId
 * @returns array | list of tree applications
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
     * @params needed in the request body:
     * 1. status
     * 2. staffId
     * 3. completeDate
     * 4. treeAppId
     * @returns boolean of process status.
     */
    .put(function (req, res) {
        var sql = treeAppSQL.update
        console.log(req.params)
        pool.query(sql, [req.body.status, req.body.staffId, req.body.completeDate, req.params.treeAppId], function (error, results, fields) {
            if (error) throw error
            if (results) {
                console.log(results)
                jsonWrite(res, results)
            }
        })
    })

module.exports = router