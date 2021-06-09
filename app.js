const express = require('express');
const https = require('https');
const bodyParser = require('body-parser')

const app = express();

app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{

  res.sendFile(__dirname + '/index.html')

});

app.post('/',(req,res)=>{
  const query = req.body.city;
  const apiKey = 'ce6308b177d61e9bb3c46eab3e6833e9'
  const unit = 'imperial'
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit

  https.get(url,(response)=>{
    console.log(response.statusCode);

    response.on('data',(data)=>{

      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const weatherId = weatherData.weather[0].icon;
      const weatherIcon = '<img src="http://openweathermap.org/img/wn/'+weatherId+'@2x.png" alt="">'

      // console.log(weatherData);

      res.write('<h1> The temp in '+query+' is '+temp+' degrees</h1>');
      res.write('<p>Thank you.</p>')
      res.write(weatherIcon)
      res.send();
    });
  });
});

app.listen(3000,()=>{
  console.log('Server is running on port 3000');
});
