const express = require("express")
const mongoose = require('mongoose')
const utils = require('../Utils')

const mongoRouter = express.Router()

mongoose.connect("mongodb://localhost/Swapnil")
    .then(() => {
        console.log("Connected to mongoDb user")
    }).catch(err => {
        console.log("Error connecting mongoDb", err)
        //utils.sendResponse(res, 200, false, 'Error connecting to mongoDb user')
    })

let coursesSchema = new mongoose.Schema({
    name: String,
    author: String,
    timeStamp: { type: Date, default: Date.now() },
    isPublished: Boolean,
    subscriberCount: Number
})
let Course = mongoose.model('Courses', coursesSchema)

mongoRouter.get("/", getCourses)
mongoRouter.get("/create", createRow)

async function createRow(req, res) {
    let result = await Course.create({
        name: "MongoDb",
        author: "Mosh",
        timeStamp: Date.now(),
        isPublished: true,
        subscriberCount: 100
    })
    console.log(result)
    utils.sendResponse(res, 200, false, 'Connected to mongoDb user')
}

async function getCourses(req, res) {
    let courses = await Course.find({subscriberCount:{$gte:10,$lte:100}}).select({ name: 1, price: 1, subscriberCount: 1 })
    //Course.find({ name: req.query.name })
    utils.sendResponse(res, 200, false, "Found couses", courses)
    console.log("Found couses", courses)
}

module.exports = mongoRouter