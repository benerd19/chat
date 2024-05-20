const Router = require('express')
const router = new Router()
const chatControllers = require('../controllers/chat.controllers')

router.post('', chatControllers.createMessage)
router.get('', chatControllers.getAllMessages)
router.get('/all', chatControllers.getAllMessagesWithEmail)


module.exports = router