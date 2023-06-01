var router = require('express').Router()
var {readCSVData,getCSVData} = require('../Controller/chartdata')

router.get("/data", getCSVData);

module.exports = router;