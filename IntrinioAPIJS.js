//run throgh terminal: node IntrinioAPIJS.js
var https = require("https");

var username = "0678c8e25152e0d0274b9d63c7b8eb23"; //enter own username
var password = "265f1d71952832034406481041f3e6c1"; //enter own password
var auth = "Basic " + new Buffer(username + ':' + password).toString('base64');

var request = https.request({
    method: "GET",
    host: "api.intrinio.com",
    path: "/companies?ticker=AAPL",
    headers: {
        "Authorization": auth
    }
}, function(response) {
    var json = "";
    response.on('data', function (chunk) {
        json += chunk;
    });
    response.on('end', function() {
        var company = JSON.parse(json);
        console.log(company);
    });
});

request.end();