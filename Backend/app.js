var express = require('express')
var app = express()
var cors = require('cors')
var {readCSVData, getCSVData} = require("./Src/Controller/chartdata")
var morgan = require('morgan');

app.use(morgan("dev"))
var router = require("./Src/Route/index");
app.use(router);
app.use(cors)

const PORT = process.env.port || 3001;
app.listen(PORT, ()=>{
    console.log("Lumberfut Server is running on the port: "+PORT)
     readCSVData();
    //getCSVData()
})

