const express = require('express')

const { getWeatherByCity } = require('../controllers/weather.controller');
const router = express.Router()


router.get("/",getWeatherByCity)


module.exports = router