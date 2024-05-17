const Router = require('express')
const router = new Router()
const chatControllers = require('../controllers/chat.controllers')

router.post('', chatControllers.getMessages)
router.get('', chatControllers.getAllMessages)


module.exports = router