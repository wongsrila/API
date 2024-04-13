const express = require('express');
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

// app.get('/events', (req, res) => {
//   res.setHeader('Content-Type', 'text/event-stream');
//   res.setHeader('Cache-Control', 'no-cache');
//   res.setHeader('Connection', 'keep-alive');

//   const sendEvent = setInterval(() => {
//     res.write(`data: ${new Date().toLocaleTimeString()}\n\n`);
//   }, 10000);

//   req.on('close', () => {
//     clearInterval(sendEvent);
//     res.end();
//   });
// });

app.listen(port, () =>
  console.log(`Listening on port http://localhost:${port}/`)
);
