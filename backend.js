const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.post('/',function(req,res){
  const city = req.body.cityName;
  const apiKey = process.env.API_KEY;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units=metric";
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on('data',function(data){
      const parsedData = JSON.parse(data);
      const temp = parsedData.main.temp;
      const desc = parsedData.weather[0].description;
      const img = parsedData.weather[0].icon;
      const imgUrl = "http://openweathermap.org/img/wn/"+img+"@2x.png";
      res.write("<h1>The temperature in "+city+" currently is " +temp+ " degree celcius and have " + desc +" .</h1>" );
      res.write("<img src = "+imgUrl+">");
      res.send();
    })

  })

})


app.get('/',function(req,res){
  // res.send("this page is working");
  res.sendFile(__dirname + "/index.html");
})

app.listen(3000,function(){
  console.log("Server running in 3000 channel");
})
