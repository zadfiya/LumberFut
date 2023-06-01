var router = require('express')();
var chartDataRouter = require('./chartdata');

router.use("/api/chart",chartDataRouter);
router.get("/",(req,res)=>{
   return res.status(200).json({message:"Made by N A R E N", success:true})});

module.exports = router;