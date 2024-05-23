const jwt = require('jsonwebtoken')

function checkUser(req, res, next){
    try{
        jwt.verify(req.headers.authorization, process.env.secret_token)
        next()
    }
    catch(e){
        res.sendStatus(403)
    }
}

module.exports = checkUser