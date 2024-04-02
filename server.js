const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3333;

// Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Routes
app.use('/', (req, res) => {
  const url =
    'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.API}`,
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => resultHandle(json))
    .catch((err) => console.error('error:' + err));

  const resultHandle = (results) => {
    console.log(results);
    res.render('index', results);
  };
});

app.listen(port, () =>
  console.log(`Listening on port http://localhost:${port}/`)
);
