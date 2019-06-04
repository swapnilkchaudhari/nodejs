const express = require("express")
const mongoose = require('mongoose')
const utils = require('../Utils')

const mongoRouter = express.Router()
mongoRouter.get("/", getData)

function getData(req, res) {
    console.log(utils)
    console.log('mongo test')
    mongoose.connect("mongodb://localhost/user")
        .then(() => {
            console.log("Connected to mongoDb user")
            utils.sendResponse(res, 200, false, 'Connected to mongoDb user')
        }).catch(err => {
            console.log("Error connecting mongoDb", err)
            utils.sendResponse(res, 200, false, 'Error connecting to mongoDb user')
        })
}

module.exports = mongoRouter