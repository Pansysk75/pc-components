const express = require('express');
const ejs = require('ejs');
const app = express();
app.set('view engine', 'ejs');
const port = process.env.PORT || 8000;

// CORS middleware (similar to your provided script)
app.use((req, res, next) => {
  const allowedOrigins = ['http:127.0.0.1:81', 'http://localhost:8000', ' http://159.89.215.209:81'];               // not sure about that??
// const allowedOrigins = '*';
  const origin = req.headers.origin || '*';
  if (!process.env.DISABLE_XORIGIN || allowedOrigins.indexOf(origin) > -1) {
    console.log(origin);
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  }
  next();
});

// Routes setup
const appRoutes = require('./app');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Use the routes defined in app.js
app.use('/', appRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});