const Router = require('express')
const router = new Router()
const userController = require('../controllers/users.controllers')
const middleware = require('../middleware/users.middleware')

router.use(middleware.userMiddle)

router.get('', userController.getUsers)
router.post('/:email', userController.checkUser)
router.post('', userController.createUser)

module.exports = router