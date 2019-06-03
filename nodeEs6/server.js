const express = require('express')
const Logger = require('./Logger')
const courses = require('./models/Courses')
const expressDmo = require('./models/expressDemo')

const server = express()
server.disable('x-powered-by')
//application.use(bodyParser);
server.use(express.json())
server.use(Logger.log)
server.use("/courses", courses)
server.use("/express/demo",expressDmo)

server.listen(3001, () => {
    console.log("Server started on port 3001.")
})