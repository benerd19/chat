const Router = require('express')
const router = new Router()
const chatControllers = require('../controllers/chat.controllers')
const checkUser = require('../middleware/checkUser')
const changeToken = require('../middleware/changeToken')

router.use('/all', changeToken)
router.use('/all', checkUser)

router.post('', chatControllers.createMessage)
router.get('', chatControllers.getAllMessages)
router.get('/all', chatControllers.getAllMessagesWithEmail)


module.exports = router