const express = require('express');

const app = express();
const port = process.env.PORT || 3333;

// Routes
app.use('/', (req, res) => {
  res.send('Hello world');
});

app.listen(port, () =>
  console.log(`Listening on port http://localhost:${port}/`)
);
