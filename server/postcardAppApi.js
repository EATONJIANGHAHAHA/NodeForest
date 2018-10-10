var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('./db/DBConfig');
var postcardSQL = require('./db/postcardsql');
var treeSQL = require('./db/treesql');
var fs = require('fs');
let PDFDocument = require('pdfkit');
var pool = mysql.createPool(dbConfig.mysql);

/**
 * Sending response as json format.
 * @param res
 * @param ret
 */
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

/**
 * Insert new postcard application
 * @params needed in the request body:
 * 1. address
 * 2. postCode
 * 3. status
 * 4. applyDate
 * 5. receiveDate
 * @returns boolean of process status.
 */
router.post('/add', (req, res) => {
    var sql = postcardSQL.insert;
    var params = req.body;
    console.log(params);
    pool.query(sql, [params.address, params.postCode, params.recipient, 'SUBMITTED', getNow(), params.treeId, params.message], (error, results, fields) => {
        if (error) throw error;
        if (results) {
            console.log(results);
            jsonWrite(res, results);
        }
    })
});

/**
 * Download a postcard for the application
 */
router.get('/download/:treeId', (req, res) => {
    pool.query(treeSQL.getById, req.params.treeId, (error, results, fields) => {
        if (error) throw error;
        if (results) {
            let path = results[0].photo_src;
            console.log(results);
            let doc = new PDFDocument;

            res.setHeader('Content-disposition', 'inline; filename="test"');
            res.setHeader('Content-type', 'application/pdf');
            doc.fontSize(15)
                .text('Node Forest, a project that protects our planet.', 50, 50);

            doc.image(path, 50, 100, {
                // fit: [300, 400],
                width: 400,
                    align: 'center',
                    valign: 'center'
            });
            doc.rect(100, 500, 350, 350)
                .dash(5, {space: 10})
        .stroke();


            doc.pipe(res);
            doc.end();
        }
    });

});

/**
 * Get unreceived postcards
 */
router.get('/user/unreceived', function (req, res) {
    let sql = postcardSQL.unreceivedByUserId;
    let params = req.query || req.params;
    console.log(params);
    pool.query(sql, [params.userId], (error, results, fields) => {
        if (error) throw error;
        if (results) {
            for (let i = 0; i < results.length; i++) {
                results[i].apply_date = getDate(results[i].apply_date);
            }
            console.log(results);
            jsonWrite(res, results);
        }
    })
})

/**
 * Get received postcards
 */
router.get('/user/received', function (req, res) {
    let sql = postcardSQL.receivedByUserId;
    let params = req.query || req.params;
    console.log(params);
    pool.query(sql, [params.userId], (error, results, fields) => {
        if (error) throw error;
        if (results) {
            for (let i = 0; i < results.length; i++) {
                results[i].apply_date = getDate(results[i].apply_date);
                results[i].receive_date = getDate(results[i].receive_date);
            }
            console.log(results);
            jsonWrite(res, results);
        }
    })
})

/**
 * Get unsent postcards
 */
router.get('/staff/unsent', function (req, res) {
    let sql = postcardSQL.unsentByStaffId;
    let params = req.query || req.params;
    console.log(params);
    pool.query(sql, [params.staffId, 'SUBMITTED'], (error, results, fields) => {
        if (error) throw error;
        if (results) {
            for (let i = 0; i < results.length; i++) {
                results[i].apply_date = getDate(results[i].apply_date);
            }
            console.log(results);
            jsonWrite(res, results);
        }
    })
})

/**
 * Get sent postcards
 */
router.get('/staff/sent', function (req, res) {
    let sql = postcardSQL.sentByStaffId;
    let params = req.query || req.params;
    console.log(params);
    pool.query(sql, [params.staffId, 'SUBMITTED'], (error, results, fields) => {
        if (error) throw error;
        if (results) {
            for (let i = 0; i < results.length; i++) {
                results[i].apply_date = getDate(results[i].apply_date);
                if (results[i].receive_date) results[i].receive_date = getDate(results[i].receive_date);
            }
            console.log(results);
            jsonWrite(res, results);
        }
    })
})


/**up
 * update the application status.
 * @params needed in the request body:
 * 1. status
 * 2. postcardId
 * @returns boolean of process status.
 */
router.put('/send', (req, res) => {
    var sql = postcardSQL.updateStatus;
    var params = req.body;
    console.log(params);
    pool.query(sql, ['SENT', params.id], (error, results, fields) => {
        if (error) throw error;
        if (results) {
            console.log(results);
            jsonWrite(res, results);
        }
    })
});

/**
 * Update receive date for the postcard application
 * because when the application is created, the postcard needs to to be received.
 * @params needed in the request body:
 * 1. receiveDate
 * 2. postcardId
 * @returns boolean of operation status.
 */
router.put('/receive', (req, res) => {
    var sql = postcardSQL.updateReceive;
    var params = req.body;
    console.log(params);
    pool.query(sql, [getNow(), 'RECEIVED', params.id], (error, results, fields) => {
        if (error) throw error;
        if (results) {
            console.log(results);
            jsonWrite(res, results);
        }
    })
});

/**
 * You first need to create a formatting function to pad numbers to two digits…
 **/
function twoDigits(d) {
    if (0 <= d && d < 10) return "0" + d.toString();
    if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
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
