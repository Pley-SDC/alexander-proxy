const express = require('express');
const morgan = require('morgan');
const path = require('path');
const axios = require('axios');
// require('newrelic');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const port = process.env.PORT || 1000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// app.get('/:id', (req, res) => {
//   res.sendFile(path.join(__dirname, '/public/index.html'));
// })

const routes = {
  overview: 3001,
  reservation: 3002,
  reviews: 3003,
  menu: 'http://ec2-18-222-177-6.us-east-2.compute.amazonaws.com/',
};

app.get('/:restaurantName/:restaurantID/:service', (req, res) => {
  const { restaurantName, restaurantID, service } = req.params;
  // console.log(`http://127.0.0.1:${routes[service]}/${restaurantName}/${restaurantID}/${service}`);
  axios.get(`${routes[service]}/${restaurantName}/${restaurantID}/${service}`)
    .then((response) => {
      res.send(response.data);
    })
    .catch(error => console.log(error))
})

// app.post('/:id/:service', (req, res) => {
//   const id = req.params.id;
//   const service = req.params.service;
//     axios.post(`${routes[service]}/${id}/${service}`)
//     .then()
// })

app.listen(PORT, () => {
  console.log(`server running at: http://localhost:${PORT}`);
});
