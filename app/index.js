const express = require('express')
const app = express();

app.get('/', (req, res) => {
  res.send('yo wassup')
});

app.listen(8000, () => {
  console.log('Server is on port 8000')
});