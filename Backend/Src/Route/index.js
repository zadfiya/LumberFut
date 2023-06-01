var router = require('express').Router()
var chartDataRouter = require('./chartdata');

router.get("/api/chart",chartDataRouter);
router.get("/",(req,res)=>{console.log("called")
    res.status(200).json({message:"Made by N A R E N", success:true})});

module.exports = router;