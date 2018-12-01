const express = require('express');
const morgan = require('morgan');
const path = require('path');
const axios = require('axios');
require('newrelic');
const bodyParser = require('body-parser');
const proxy = require('http-proxy-middleware');
const app = express();
const PORT = 8080;
const port = process.env.PORT || 1000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

const menuUrl = 'http://ec2-18-222-177-6.us-east-2.compute.amazonaws.com/';
const overviewUrl = 'http://13.52.10.32';
const reviewsUrl = 'http://13.52.98.80';
// const reservationUrl = ''

app.get('/api/:restaurantID/menu', proxy({ target: menuUrl, changeOrigin: true}));
app.get('/api/:restaurantID/overview', proxy({ target: overviewUrl, changeOrigin: true}));
// app.get('/api/:restaurantID/reservation', proxy({ target: reservationUrl, changeOrigin: true}));
// app.get('/api/:restaurantID/hour', proxy({ target: reservationUrl, changeOrigin: true}));
app.get('/api/:restaurantID/recommended-reviews', proxy({ target: reviewsUrl, changeOrigin: true}));


// app.post('/:id/:service', (req, res) => {
//   const id = req.params.id;
//   const service = req.params.service;
//     axios.post(`${routes[service]}/${id}/${service}`)
//     .then()
// })

app.listen(PORT, () => {
  console.log(`server running at: http://localhost:${PORT}`);
});
