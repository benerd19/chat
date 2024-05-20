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
        //const nickname = await db.query(`select nickname from users where email=test@test.com`)
        res.json({id: data[0].insertId, text: req.body.text, users_email:req.body.email})
    }
    async getAllMessagesWithEmail(req, res){
        const data = await db.query(`select messages.id, messages.text, messages.users_email, users.nickname
                                     from messages
                                     join users on messages.users_email = users.email
                                     order by messages.id;`)
        res.json(data[0])                             
    }
}

module.exports = new Chat