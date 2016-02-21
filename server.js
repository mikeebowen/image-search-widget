'use strict';
require('dotenv').load();
var fs = require('fs');
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var time = new Date();
var clc = require('cli-color');
var path = require('path');
var bodyparser = require('body-parser');

app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) {
  res.sendFile('./index.html');
});

app.get('/env', function (req, res) {
  res.end(process.env.APP_ID);
});

app.listen(port, function () {
  console.log(clc.cyanBright('server started at: ' + time + ' on port: ' + port));
});
