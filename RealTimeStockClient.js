var username = "" //Your Intrinio App Username 
var password = "" //Your Intrinio App Password 
var intrinio = require("intrinio-client")(username, password)
 
intrinio
.ticker('AAPL')			//All endpoints follow this pattern 
.on('complete', function(data, response) {
    //data is the response from the Intrinio API 
    //response is the http response 
    if(response.statusCode==404){
        console.log("Not found")
    }else if(response.statusCode==200){
        console.log(data)
    }
});