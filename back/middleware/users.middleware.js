function changingToken(req, res, next){
    req.headers.authorization = req.headers.authorization.replace('Bearer ', '')
    next()
}

module.exports = {
    changingToken
}