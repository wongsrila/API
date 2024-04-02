const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3333;

// Routes
app.use('/', (req, res) => {
  const url =
    'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
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

  const resultHandle = (result) => {
    res.send(result);
  };
  // res.send('Hello world!');
});

app.listen(port, () =>
  console.log(`Listening on port http://localhost:${port}/`)
);
