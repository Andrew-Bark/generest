"use strict";

const express =  require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

// const router = require('./router.js');

const app = express();


app.use(cors());


const proxyNewcastleUO = createProxyMiddleware({
    target: 'https://newcastle.urbanobservatory.ac.uk',
    changeOrigin: true,
    logger: console,
  });

app.use('/api/nuo', proxyNewcastleUO);


app.listen(3000, () => {
  console.log(`Server is running at http://localhost:3000`);
});

