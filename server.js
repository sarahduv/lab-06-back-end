'use strict';

const express = require('express');

const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());

const PORT = process.env.PORT;

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

app.listen(PORT, () => {console.log(`app is up on PORT ${PORT}`)});
