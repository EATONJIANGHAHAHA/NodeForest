var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('./db/DBConfig')
var treeAppSQL = require('./db/treeappsql')
let staffSQL = require('./db/staffsql')
let treeSQL = require('./db/treesql');
let userSQL = require('./db/usersql')
var pool = mysql.createPool(dbConfig.mysql)

var nodemailer = require('nodemailer');

var mailTransport = nodemailer.createTransport({
    host : 'smtp.gmail.com',
    port: 587,
    auth : {
        user : 'nodeforest2018',
        pass : 'nodeforest123'
    },
});




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

    let sql = staffSQL.getWorkloadOrder; //Get the staff that has the least workload.
    pool.query(sql, function (error, results, fields) {
        if (error) throw error
        if (results) {
            let staffId = results[0].id;
            console.log("Assigned to staff: " + results[0].id);

            sql = treeAppSQL.insert;//Add a new application to the database.
            let params = req.body;
            console.log(params);
            pool.query(sql, [getNow(), params.species, params.location_id, params.sayings, params.name, params.status, params.amount, params.userId, results[0].id], function (error, results, fields) {
                if (error) throw error
                if (results) {
                    let appId = results.insertId;
                    console.log("New application created: " +  appId);


                    pool.query(staffSQL.getStaffById, [staffId], function (error, results, fields) {
                        if (error) throw error;
                        if (results){
                            //Send an email to notify staff.
                            sendEmail(results[0].email, ' application No.' + appId + ' is assigned to you.')
                        }
                    })

                    pool.query(userSQL.getUserById, [params.userId], function (error, results, fields) {
                        if (error) throw error;
                        if (results){
                            //Send an email to notify User.
                            sendEmail(results[0].email, ' application No.' + appId + ' is successfully submitted.')
                        }
                    })

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
            for(let i = 0; i<results.length; i++){
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
            pool.query(sql, [15, params.locationId, params.species, params.sayings, params.name,
                params.ownerId, params.staffId, 'GOOD', getNow()], function (error, results, fields) {
                if (error) throw error;
                if (results) {
                    console.log("Created: new tree " + results.insertId);
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
            sql = treeAppSQL.update;
            pool.query(sql, [params.status, getNow(), params.reason, null, params.id], function (error, results, fields) {
                if (error) throw error
                if (results) {
                    console.log(results);
                    jsonWrite(res, results);
                }
            })
        }

        //Notify the user.
        pool.query(userSQL.getUserById, [params.ownerId], function (error, results, fields) {
            if (error) throw error
            if (results) {
                sendEmail(results[0].email, ' application No.' + params.id + ' is ' + params.status + '.');
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

function sendEmail(recipient, content) {
    var options = {
        from 		: '"Node Forest" <nodeforest2018@gmail.com>',
        to 			: recipient,
        subject 	: 'Tree Application Notification',
        text 		: 'An email from node forest system.',
        html		: '<p>Hi</p><br/><p>We are here to inform you that '+ content + '</p><br/><p>For more information, please check details within your account.</p><br/><p>Best Regards,</p><br/><p>Node Forest System</p>',
    };

    mailTransport.sendMail(options, function(err, msg){
        if(err){
            console.log(err);
        }
        else {
            console.log(msg);
        }
    });
}
module.exports = router;