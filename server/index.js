const userApi = require('./userApi');
const treeApi = require('./treeApi');
const staffApi = require('./staffApi');
const postcardAppApi = require('./postcardAppApi');
const treeAppApi = require('./treeAppApi');
const adminApi = require('./adminApi');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');

app.use(session({
    //the name of the session id cookie to set in the response
    name: 'secret-session-cookie-id',
    //used to sign the session id cookie, can be a string, or an array of multiple secrete
    secret: 'my express secret',
    //session usable time limit
    cookie: {maxAge: 80000},
    //force a session that is uninitialized to be saved to teh store.
    saveUninitialized: true,
    //forces the session to be saved back to the session store, even if the session was never modified during the request.
    resave: true
}));
//enable cross origin resource sharing.
app.use(cors());
//we want json object to be used.
app.use(bodyParser.json());
//using simple algorithm to parsing when dealing with nested objects.
app.use(bodyParser.urlencoded({ extended: false }));
//API routing
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