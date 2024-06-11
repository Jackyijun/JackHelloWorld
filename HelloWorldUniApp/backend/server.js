// backend API that return Hello World and my name
const express = require('express');
const app = express();
const port = 3000;

app.get('/api/hello', (req, res) => {
  res.send('Hello World');
});

app.get('/api/myname', (req, res) => {
  res.send('I am Jack');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
