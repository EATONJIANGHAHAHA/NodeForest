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
 * formatting function to pad numbers to two digits…
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
                results[0].upload_date = getDate(results[0].upload_date);
                results[0].last_edit = getDate(results[0].last_edit);
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
router.get('/getPhotos/:treeId', (req, res) => {
    var sql = treeSQL.getPhotos;
    var params = req.params;
    console.log(params);
    pool.query(sql, [params.treeId], function (error, results, fields) {
        if (error) throw error;
        if (results) {
            console.log(results);
            jsonWrite(res, results);
        }
    })
});

router.post('/user/update', (req, res) => {
   var sql = treeSQL.updateSandN;
   var param = req.body;
   console.log(param);
   pool.query(sql, [param.sayings, param.name, param.id], function(error, results, fields) {
       if (error) throw error;
       if (results) {
           console.log(results);
           var sql = treeSQL.updateLastEdit;
           pool.query(sql, [getNow(), param.id], function(error, results, fields) {
               if (error) throw error;
               if (results) {
                   console.log(results);
                   jsonWrite(res, results);
               }
           })
       }
   })
});

router.post('/staff/update', (req, res) => {
    var sql = treeSQL.updateHeiAndHeal;
    var param = req.body;
    console.log(param);
    pool.query(sql, [param.height, param.health, param.id], function(error, results, fields) {
        if (error) throw error;
        if (results) {
            console.log(results);
            var sql = treeSQL.updateLastEdit;
            pool.query(sql, [getNow(), param.id], function(error, results, fields) {
                if (error) throw error;
                if (results) {
                    console.log(results);
                    jsonWrite(res, results);
                }
            })
        }
    })
});

router.post('/uploadPhoto', upload.single('treeImage'), (req, res) => {
    var file = req.file;
    console.log(file);
    var sql = treeSQL.insertPhoto;
    var params = req.body;
    console.log(params);
    var now = getNow();
    pool.query(sql, [now, file.path, params.treeId], function (error, results, fields) {
        if (error) throw error;
        if (results) {
            console.log(results);
            if (results.insertId !== 0) {
                // jsonWrite(res, file.path);
                var sql = treeSQL.updateLastEdit;
                pool.query(sql, [now, params.treeId], function (intererror, interresults, interfields) {
                    if (intererror) throw intererror;
                    if (interresults) {
                        var sql = treeSQL.getById;
                        jsonWrite(res, now);
                    }
                })
            }
        }
    });

});
module.exports = router;