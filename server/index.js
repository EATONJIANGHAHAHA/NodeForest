const userApi = require('./userApi');
const treeApi = require('./treeApi')
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 后端api路由
app.use('/api/user', userApi);
app.use('/api/tree', treeApi);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');