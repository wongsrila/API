const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const routes = require('./routes/routes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3333;

// Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Middleware
app.use(express.static(path.join(__dirname, '/public')));

// Routes
app.use('/', routes);

app.listen(port, () =>
  console.log(`Listening on port http://localhost:${port}/`)
);
