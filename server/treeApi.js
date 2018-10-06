var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('./db/DBConfig');
var treeSQL = require('./db/treesql');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './server/uploads/')
    },
    filename:function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

var upload = multer({
    storage: storage
});

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

var pool = mysql.createPool(dbConfig.mysql);

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
};

/**
 * Add user to the database.
 * @params needed in the request body:
 * 1. username
 * 2. password
 * 3. email
 * 4. address
 * 5. phone.
 * @returns boolean of the process status.
 */
router.post('/add', function (req, res) {
    var sql = treeSQL.insert;
    var params = req.body;
    console.log(params);
    pool.query(sql, [params.height, params.location, params.locationImg, params.species, params.sayings, params.name,
        params.ownerId, params.staffId, params.health, params.last_edit], function (error, results, fields) {
        if (error) throw error;
        if (results) {
            console.log(results);
            jsonWrite(res, results)
        }
    })
});

router.route('/:treeId')
/**
 * Get information for a tree.
 * The link is like localhost:3000/api/tree/1.
 * @params needed in the request body:
 * 1. treeId
 * @returns boolean of process status
 */
    .get(function (req, res) {
        var sql = treeSQL.getById;
        console.log(req.params);
        pool.query(sql, [req.params.treeId], function (error, results, fields) {
            if (error) throw error;
            if (results) {
                console.log(results);
                jsonWrite(res, results)
            }
        })
    })
    /**
     * Update a information of a tree.
     */
    .put(function (req, res) {
        var sql = treeSQL.update;
        console.log(req.params);
        pool.query(sql, [req.body.height, req.body.health, req.body.last_edit, req.params.treeId], function (error, results, fields) {
            if (error) throw error;
            if (results) {
                console.log(results);
                jsonWrite(res, results);
            }
        })
    });


/**
 * Get historical photos of a tree.
 * @params needed in the request body:
 * 1. treeId
 * @returns boolean of process status
 */
router.get('/getPhotos', (req, res) => {
    var sql = treeSQL.getPhotos;
    var params = req.query || req.params;
    console.log(params);
    pool.query(sql, [params.treeId], function (error, results, fields) {
        if (error) throw error;
        if (results) {
            console.log(results);
            jsonWrite(res, results);
        }
    })
});

router.post('/uploadPhoto', upload.single('treeImage'), (req, res) => {

    console.log(getDate());
    var file = req.file;
    var sql = treeSQL.insertPhoto;
    var params = req.body;
    pool.query(sql, [getDate(), file.path, params.treeId], function (error, results, fields) {
        if (error) throw error;
        if (results) {
            console.log(results);
            if (results.insertId !== 0) {
                jsonWrite(res, file.path);
            }
        }
    });
});
module.exports = router;