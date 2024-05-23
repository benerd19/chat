const connection = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


class userController{
    async getUsers(req, res){
        const data = await connection.query('select * from users')
        res.json(data[0])
    }

    async getEmail(req, res){
        try{
            const email = jwt.verify(req.headers.authorization, process.env.secret_token)
            res.json({email:email})
        }
        catch(e){
            console.log(e)
            res.sendStatus(500)
        }
    }

    async createUser(req, res){
        try{
            const pass = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
            await connection.query(`insert into users (email, password, nickname) values('${req.body.email}', '${pass}', '${req.body.nickname}')`)
            const token = jwt.sign(req.body.email, process.env.secret_token)
            res.json({token: token, nickname: req.body.nickname})
        }
        catch(e){
            if (e.errno === 1062) res.sendStatus(400)
            else res.sendStatus(500)
        }
    }

    async checkUser(req, res){
        try{
            const data = await connection.query(`select * from users where email='${req.params.email}'`)
            if (data[0].length === 0) throw new Error('Not found') 
            if (!bcrypt.compareSync(req.body.password, data[0][0].password)) throw new Error('Not found')
            const token = jwt.sign(data[0][0].email, process.env.secret_token)
            res.json({token: token, nickname: data[0][0].nickname})
        }
        catch(e){
            if (e.message === 'Not found') res.sendStatus(403)
            else res.sendStatus(500)
        }
    }

    async checkUserByToken(req, res){
        try{
            const email = jwt.verify(req.headers.authorization, process.env.secret_token)
            const data = await connection.query(`select email, nickname from users where email='${email}'`)
            res.json({nickname: data[0][0].nickname})
        }
        catch(e){
            if (e instanceof jwt.JsonWebTokenError) res.sendStatus(403)
            else res.sendStatus(500)
        }
    }
}

module.exports = new userController