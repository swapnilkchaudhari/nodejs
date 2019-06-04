const express = require('express')
const router = express.Router()
router.get("/", sendEmail2Customer)

async function sendEmail2Customer(req, res) {

    let customer = await getCustomer(1)
    if (customer.isGold) {
        let movies = await getTopMovies()
        let message = await sendEmail(customer.email, movies)
        sendResponse(res, 200, false, message)
    } else {
        sendResponse(res, 400, true, "Regular customer")
    }
    //             email = customer.email
    // let email
    // getCustomer(1)
    //     .then((customer) => {
    //         console.log("Customer", customer)
    //         if (customer.isGold) {
    //             email = customer.email
    //             return getTopMovies()
    //         } else {
    //             throw new Error("Regular customer")
    //         }
    //     }).then((movies) => {
    //         console.log('Top movies: ', movies);
    //         return sendEmail(email, movies)
    //     }).then((message) => sendResponse(res, 200, false, message))
    //     .catch((error) => sendResponse(res, 400, true, error.message))
}

function sendResponse(res, statusCode, isError, message, body) {
    let response
    if (isError) {
        response = { msgTyp: "E", message: message }
    } else if (body) {
        response = { msgTyp: "S", message: message, data: body }
    } else {
        response = { msgTyp: "S", message: message }
    }
    //res.removeHeader('X-Powered-By')
    res.statusCode = statusCode
    res.send(response)
    console.log("Response", response)
}

const result = {
    id: 1,
    name: 'Mosh Hamedani',
    isGold: false,
    email: 'a@a.com'
}

function getCustomer(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(result)
        }, 4000)
    })
}

function getTopMovies() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['movie1', 'movie2']);
        }, 4000);
    })
}

function sendEmail(email, movies) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Email of ${movies} sent to ${email}.`)
        }, 4000);
    })
}

module.exports = router