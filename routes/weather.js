var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var secret = require('../secret.json');

var googKey = secret["key1"];
var forecastKey = secret["key2"];
var nytKey = secret["key3"];

router.get("/:lat/:long", function(req, res){
  var lat = req.params.lat;
  var long = req.params.long;
  var url = "https://api.forecast.io/forecast/" + forecastKey + "/" + lat + "," + long;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      data = JSON.parse(body);
      res.send(data);
    }
  })
});

//route to get specific city's weather data
router.get("/:city", function(req, res){
  var city = req.params.city;
  var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "&key=" + googKey;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      data = JSON.parse(body);
      var lat = data.results[0].geometry.location.lat;
      var long = data.results[0].geometry.location.lng;
    }
    //weather call
    var url2 = "https://api.forecast.io/forecast/" + forecastKey + "/" + lat + "," + long;
    request(url2, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        data = JSON.parse(body);
        res.send(data);
      }
    })
  })
});

module.exports = router;
