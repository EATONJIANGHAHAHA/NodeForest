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
    let sql = treeAppSQL.insert;
    let params = req.body
    console.log(params)
    pool.query(sql, [getDate(), params.species, params.location, params.sayings, params.name, params.status, params.amount, params.userId], function (error, results, fields) {
        if (error) throw error
        if (results) {
            console.log(results)
            jsonWrite(res, results)
        }
    })
})

/**
 * Get tree species from the database.
 */
router.get('/species', function (req, res) {
    let sql = treeAppSQL.getSpecies;
    pool.query(sql,  (error, results, fields) => {
        if (error) throw error;
        if (results) {
            console.log(results);
            jsonWrite(res,results);
        }
    })
})

/**
 * Get capable locations from the database.
 */
router.get('/locations', function (req, res) {
    let sql = treeAppSQL.getLocations;
    pool.query(sql,  (error, results, fields) => {
        if (error) throw error;
        if (results) {
            console.log(results);
            jsonWrite(res,results);
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
        let sql = treeAppSQL.getById
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
        let sql = treeAppSQL.update
        console.log(req.params)
        pool.query(sql, [req.body.status, req.body.staffId, req.body.completeDate, req.params.treeAppId], function (error, results, fields) {
            if (error) throw error
            if (results) {
                console.log(results)
                jsonWrite(res, results)
            }
        })
    })

/**
 * You first need to create a formatting function to pad numbers to two digits…
 **/
function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}

/**
 * …and then create the method to output the date string as desired.
 * Some people hate using prototypes this way, but if you are going
 * to apply this to more than one Date object, having it as a prototype
 * makes sense.
 **/
function getDate() {
    var date = new Date();
    return date.getFullYear() +
        "-" + twoDigits(1 + date.getMonth()) +
        "-" + twoDigits(date.getDate()) +
        " " + twoDigits(date.getHours()) +
        ":" + twoDigits(date.getMinutes()) +
        ":" + twoDigits(date.getSeconds());
}

module.exports = router