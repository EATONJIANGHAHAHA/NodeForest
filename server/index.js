const userApi = require('./userApi');
const treeApi = require('./treeApi');
const staffApi = require('./staffApi');
const postcardAppApi = require('./postcardAppApi');
const treeAppApi = require('./treeAppApi');
const adminApi = require('./adminApi');
const rootApi = require('./rootApi');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');

app.use(session({
    //used to sign the session id cookie, can be a string, or an array of multiple secrete
    secret: 'my express secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: false
    }
}));

app.use('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});
//enable cross origin resource sharing.
/*app.use(cors());*/
//we want json object to be used.
app.use(bodyParser.json());
//using simple algorithm to parsing when dealing with nested objects.
app.use(bodyParser.urlencoded({ extended: false }));
//make the uploads folder globally available,ignoring /server/uploads
app.use('/server/uploads',express.static('server/uploads'));
//API routing
app.use('/api', rootApi);
app.use('/api/user', userApi);
app.use('/api/tree', treeApi);
app.use('/api/staff', staffApi);
app.use('/api/postcard_app', postcardAppApi);
app.use('/api/tree_app', treeAppApi);
app.use('/api/admin', adminApi);
//enable pre-flight
app.options('*', cors());

// listens on port 3000
app.listen(3000);
console.log('success listen at port:3000......');