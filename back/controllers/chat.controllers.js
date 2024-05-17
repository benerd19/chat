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
    async createMessage(req, res){
        const data = await db.query(`insert into messages (text, users_email) values ('${req.body.text}', '${req.body.email}')`)
        console.log(data)
        res.json({id: data[0].insertId, text: req.body.text, users_email:req.body.email})
    }
}

module.exports = new Chat