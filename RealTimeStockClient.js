var username = "0678c8e25152e0d0274b9d63c7b8eb23" //Your Intrinio App Username 
var password = "265f1d71952832034406481041f3e6c1" //Your Intrinio App Password 
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