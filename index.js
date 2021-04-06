const bodyParser = require("body-parser");
const express = require("express");
const request = require('request');

const app = express();
app.use(express.urlencoded({ extended: true }));

const port = 3000;

app.listen(port, function(){
    console.log("Server is running on port "+port);
})

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
  })

  
  app.post("/", function(req, res){
      var baseurl="https://apiv2.bitcoinaverage.com/convert/global";
      
      var crypto= req.body.crypto;
      var fiat= req.body.fiat;
      var amount= req.body.amount;

      var options = {
        url: baseurl, 
        headers: {
            'x-ba-key': 'Your-BitcoinAverage-API-Key'
        },
        method: "GET",
        qs: {
            from:crypto,
            to:fiat,
            amount: amount
        }
    };
      
    request(options, function (error, response, body) {
        var data= JSON.parse(body);
        var price= data.price;
        console.log(price);
        res.send('<h1>'+amount+crypto+'  is currently worth '+price+fiat+' </h1>');
  });
  })
