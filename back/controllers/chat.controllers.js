const db = require('../db')

class Chat{
    async getMessages(req, res){
        const data = await db.query(`select * from messages where users_email='${req.body.email}'`)
        res.json(data[0])
    }
    async getAllMessages(req, res){
        const data = await db.query(`select * from messages`)
        res.json(data[0])
    }
}

module.exports = new Chat