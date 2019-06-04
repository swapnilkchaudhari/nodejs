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

module.exports.sendResponse=sendResponse