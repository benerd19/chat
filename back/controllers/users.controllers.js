const connection = require('../db')
const bcrypt = require('bcrypt')


class userController{
    async getUsers(req, res){
        const data = await connection.query('select * from users')
        res.json(data[0])
    }

    async createUser(req, res){
        const pass = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
        const data = await connection.query(`insert into users (email, password, nickname) values('${req.body.email}', '${pass}', '${req.body.nickname}')`)
        res.json(data)
    }

    async checkUser(req, res){
        try{
        const data = await connection.query(`select * from users where email='${req.params.email}'`)
        if (data[0].length === 0) throw new Error('Not found') 
        if (!bcrypt.compareSync(req.body.password, data[0][0].password)) throw new Error('Not found')
        delete data[0][0].password
        res.json(data[0][0])
        }
        catch(e)
        {
            res.status(404)
            res.json(e.message)
        }
    }
}

module.exports = new userController