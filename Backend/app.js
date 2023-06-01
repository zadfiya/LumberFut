var express = require('express')
var app = express()
var cors = require('cors')

app.use(cors)

var router = require("./Src/Route/index");
app.use(router);

const PORT = process.env.port || 3001;
app.listen(PORT,()=>{
    console.log("Lumberfut Server is running on the port: "+PORT)
})