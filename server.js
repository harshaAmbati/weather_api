const express = require("express");
const https = require("https");
const app = express();

app.get('/',function(req,res){
  const url = "https://api.openweathermap.org/data/2.5/weather?q=Vijayawada&appid=acc68d20e8c38bfd0c7e0cf7a1372d1c&units=metric";
    https.get(url,function(response){
        console.log(response.statusCode); //200 means Working

        response.on('data',function(data){
        const parsedData = JSON.parse(data)
        // console.log(parsedData);
        // console.log(parsedData.main.temp);
        // console.log(parsedData.weather[0].description);
        const temp = parsedData.main.temp;
        const desc = parsedData.weather[0].description;
        const icon = parsedData.weather[0].icon;
        const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
        res.write("<h1> The temperature in Vijayawada is "+ temp +" degree celcius right now </h1>");
        res.write("<h2> description is " + desc + " currently </h2>");
        res.write("<img src="+imageUrl+">");
        res.send();
        });

    });


});


app.listen(5000,function(){
  console.log("server running on 5000 port successfully");
});
