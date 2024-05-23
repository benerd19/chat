function changingToken(req, res, next){
    try{
        if (!req.headers.authorization) throw new Error()
        req.headers.authorization = req.headers.authorization.replace('Bearer ', '')
        next()
    }
    catch(e)
    {
        res.sendStatus(404)
    }
}

module.exports = changingToken
