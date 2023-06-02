var router = require('express').Router()
var {getCSVData,truncatTable} = require('../Controller/chartdata')

router.get("/data", getCSVData);
router.post("/truncate", truncatTable)

module.exports = router;