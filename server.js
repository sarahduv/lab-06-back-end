'use strict';

const express = require('express');

const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());

const PORT = process.env.PORT;

let weatherDailyArr = [];

function Daily(time, summary) {
  this.time = time,
  this.summary = summary

// weatherArray.push(this);
}

app.get('/location', (request, response) =>  {
  try {
    const geoData = require('./data/geo.json');
    // the search query comes from the front end
    const searchQuery = request.query.data;

    // the below come from geo data

    const formattedQuery = geoData.results[0].formatted_address;
    const lat = geoData.results[0].geometry.location.lat;
    const long = geoData.results[0].geometry.location.lng;
    console.log(lat, long);
    const formattedData = {
    // search query comes from the front end
      search_query: searchQuery,
      formatted_query: formattedQuery,
      latitude: lat,
      longitude: long
    }

    response.send(formattedData);

  } catch(error) {
    console.error(error);
    response.send(error.message);
  }
})

// weather information
app.get('/weather', (request, response) =>  {
  try {

    const weatherData = require('./data/darksky.json');
  
    // the search query comes from the front end
    // const searchQuery = request.query.data;

    // the below come from darksky json
    
    for (let i=0; i<weatherData.daily.data.length; i++){
      let forecast = weatherData.daily.data[i].summary;
      let time = weatherData.daily.data[i].time;
      let weatherDaily = new Daily(forecast, time);
      weatherDailyArr.push(weatherDaily);      
    }

    response.send([weatherDailyArr]);

    // console.log(weatherData);
    

  } catch(error) {
    console.error(error);
    response.send(error.message);
  }
})

app.listen(PORT, () => {console.log(`app is up on PORT ${PORT}`)});
