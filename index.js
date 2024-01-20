// before rum
//npm install express

// to run 
// npm start

'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const OS = require('os');
const ENV = process.env.APP_ENVIRONMENT || 'undefined';



// App
const app = express();
app.get('/', (req, res) => {
  res.statusCode = 200;
  // const msg = 'Hello, Hippo Nim ^oo^!';
  const msg = `Hello from ${ENV} environment`;

  res.send(msg);
});

app.get('/test', (req, res) => {
  res.statusCode = 200;
  const msg = 'Hello from /test Node!';
  res.send(msg);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);