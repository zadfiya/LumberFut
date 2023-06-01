var router = require('express').Router()
var {readCSVData} = require('../Controller/chartdata')

router.get("/data", readCSVData);

module.exports = router;