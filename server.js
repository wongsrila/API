const express = require('express');
const path = require('path');
const routes = require('./routes/routes');
require('dotenv').config();
const { fixtureStream } = require('./controllers/fixtureController');

const app = express();
const port = process.env.PORT || 3333;

// Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Middleware
app.use(express.static(path.join(__dirname, '/public')));

// Routes
app.use('/', routes);
app.get('/fixtures/:id/events', fixtureStream);

app.get('/manifest.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.sendFile(path.join(__dirname, 'manifest.json'));
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}/`);
  });
}

module.exports = app;
