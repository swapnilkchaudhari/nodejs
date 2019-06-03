const express = require('express')
const Joi = require('@hapi/joi')
const expressRouter = express.Router();

expressRouter.post('/', (req, res) => {
    console.log(req.body)
    // if (!req.body || req.body.index.length===0) {
    //     sendResponse(res, 400, "Invalid request")
    //     return
    // }
    const schema = Joi.object().keys({
        index: Joi.number().integer().min(0).max(50),
        name: Joi.string().min(3).required()
    })
    let result = Joi.validate(req.body, schema)
    console.log(result)
    if (result.error) {
        sendResponse(res, 400, "Invalid request")
        return
    }

    //const index = req.body.index
    console.log('index in request:', req.body.index)
    const reply = { msgTyp: 'S', message: 'Received index as ' + req.body.index }
    sendResponse(res, 200, reply)
})

// application.listen(3000, () => {
//     console.log("Server started at port 3000")
// })

function sendResponse(res, statusCode, body) {
    //res.removeHeader('X-Powered-By')
    res.statusCode = statusCode
    res.send(body)
}

module.exports = expressRouter