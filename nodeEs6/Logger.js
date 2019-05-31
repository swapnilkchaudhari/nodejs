
function log(req, res, next){
    console.log()
    console.log("\n\nRequest","url: ", req.url, "body: ", req.body, "params: ", req.params)
    next()
}

exports.log = log