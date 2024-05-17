const Router = require('express')
const router = new Router()
const chatControllers = require('../controllers/chat.controllers')

router.post('', chatControllers.createMessage)
router.get('', chatControllers.getAllMessages)


module.exports = router