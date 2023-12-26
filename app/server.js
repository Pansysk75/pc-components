const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// CORS middleware (similar to your provided script)
app.use((req, res, next) => {
  const allowedOrigins = ['https:127.0.0.1:81', 'http://localhost:3000'];               // not sure about that??
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

// Use the routes defined in app.js
app.use('/', appRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});