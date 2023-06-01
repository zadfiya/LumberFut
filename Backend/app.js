var express = require('express')
var app = express()
var cors = require('cors')
var {readCSVData} = require("./Src/Controller/chartdata")
app.use(cors)
const PORT = process.env.port || 3001
app.listen(PORT,()=>{
    console.log("Lumberfut Server is running on the port: "+PORT)
    readCSVData();
})