var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var secret = require('../secret.json');

var googKey = secret["key1"];
var forecastKey = secret["key2"];
var nytKey = secret["key3"];

/* GET news headlines. */
router.get('/', function(req, res) {

  var url = "http://api.nytimes.com/svc/topstories/v1/home.json?api-key=" + nytKey;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      data = JSON.parse(body);
      res.send(data);
    }
  });

});

module.exports = router;
