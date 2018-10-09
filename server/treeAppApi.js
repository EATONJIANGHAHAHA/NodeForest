var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('./db/DBConfig')
var treeAppSQL = require('./db/treeappsql')
let staffSQL = require('./db/staffsql')
let treeSQL = require('./db/treesql');
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
    let sql = staffSQL.getWorkloadOrder;
    pool.query(sql, function (error, results, fields) {
        if (error) throw error
        if (results) {
            console.log("Staff id: " + results[0].id);
            sql = treeAppSQL.insert;
            let params = req.body;
            console.log(params);
            pool.query(sql, [getNow(), params.species, params.location, params.sayings, params.name, params.status, params.amount, params.userId, results[0].id], function (error, results, fields) {
                if (error) throw error
                if (results) {
                    console.log(results)
                    jsonWrite(res, results)
                }
            })
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

/**
 * Get incomplete applications.
 */
router.get('/incomplete', function (req, res) {
    let sql = treeAppSQL.getIncompleteByUserId;
    let params = req.query||req.params;
    console.log(params);
    pool.query(sql,[params.userId],  (error, results, fields) => {
        if (error) throw error;
        if (results) {
            for(var i = 0; i<results.length; i++){
                results[i].apply_date = getDate(results[i].apply_date);
            }
            console.log(results);
            jsonWrite(res,results);
        }
    })
})

/**
 * Get complete applications.
 */
router.get('/complete', function (req, res) {
    let sql = treeAppSQL.getCompleteByUserId;
    let params = req.query||req.params;
    console.log(params);
    pool.query(sql,[params.userId],  (error, results, fields) => {
        if (error) throw error;
        if (results) {
            for(var i = 0; i<results.length; i++){
                results[i].apply_date = getDate(results[i].apply_date);
                results[i].complete_date = getDate(results[i].complete_date);
            }
            console.log(results);
            jsonWrite(res,results);
        }
    })
})

/**
 * Get incomplete applications by staff id.
 */
router.get('/staff/incomplete', function (req, res) {
    let sql = treeAppSQL.getIncompleteByStaffId;
    let params = req.query||req.params;
    console.log(params);
    pool.query(sql,[params.staffId],  (error, results, fields) => {
        if (error) throw error;
        if (results) {
            for(let i = 0; i<results.length; i++){
                results[i].apply_date = getDate(results[i].apply_date);
            }
            console.log(results);
            jsonWrite(res,results);
        }
    })
})

/**
 * Get complete applications by staff id.
 */
router.get('/staff/complete', function (req, res) {
    let sql = treeAppSQL.getCompleteByStaffId;
    let params = req.query||req.params;
    console.log(params);
    pool.query(sql,[params.staffId],  (error, results, fields) => {
        if (error) throw error;
        if (results) {
            for(var i = 0; i<results.length; i++){
                results[i].apply_date = getDate(results[i].apply_date);
                results[i].complete_date = getDate(results[i].complete_date);

            }
            console.log(results);
            jsonWrite(res,results);
        }
    })
})



router.route('/')
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
        pool.query(sql, [req.params.treeAppId], (error, results, fields) => {
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
     * 2. comment
     * 3. id
     * @returns boolean of process status.
     */
    .put(function (req, res) {
        let sql;
        let params = req.body;
        if(params.status === 'APPROVED'){
            sql = treeSQL.insert;
            params = req.body;
            console.log(params);
            pool.query(sql, [0.5, params.location, null, params.species, params.sayings, params.name,
                params.ownerId, params.staffId, 'GOOD', getNow()], function (error, results, fields) {
                if (error) throw error;
                if (results) {

                    console.log(results);
                    var treeId = results.insertId;
                    sql = treeAppSQL.update;
                    pool.query(sql, [params.status, getNow(), params.reason, treeId, params.id], function (error, results, fields) {
                        if (error) throw error
                        if (results) {
                            console.log(results);
                            jsonWrite(res, results);
                        }
                    })
                }
            })
        }
        else {
            pool.query(sql, [params.status, getNow(), params.reason, null, params.id], function (error, results, fields) {
                if (error) throw error
                if (results) {
                    console.log(results);
                    jsonWrite(res, results);
                }
            })
        }


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
function getNow() {
    return getDate(new Date());
}

function getDate(d) {
    return d.getFullYear() +
        "-" + twoDigits(1 + d.getMonth()) +
        "-" + twoDigits(d.getDate()) +
        " " + twoDigits(d.getHours()) +
        ":" + twoDigits(d.getMinutes()) +
        ":" + twoDigits(d.getSeconds());
}

module.exports = router;