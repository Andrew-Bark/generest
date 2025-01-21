"use strict";

const express =  require('express');
const apiController = require('./controllers/apiController');


const router = express.Router();
router.get("/data", apiController.getData);
module.exports = router;