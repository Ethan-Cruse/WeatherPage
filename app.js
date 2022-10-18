const express = require('express');
const app = express();
const https = require('node:https');
const bodyParser = require('body-parser');

app.listen(3000, function () {
    console.log('listening on port 3000')
});

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post('/', function (req, res) {
    const apikey ="870cc68f1353998bc7d124e2c3c54317";
    const query= req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units=metric&appid=" + apikey;
    https.get(url, function (response) {
        response.on("data", function (data) {
            const weatherData= JSON.parse(data);
            const temp = weatherData.main.temp;
            const tempDis = weatherData.weather[0].description;
            const iconId = weatherData.weather[0].icon;
             const icon = "openweathermap.org/img/wn/" + iconId + "@2x.png";
            console.log(tempDis);
            console.log(temp);
            res.type("html")
            res.write('<h1>The temperature in ' + query + ' is ' + temp + "celsius with " + tempDis + "</h1>");
            res.write('<img src=' + icon + '>'); 
            res.send();
        })
    })
})

