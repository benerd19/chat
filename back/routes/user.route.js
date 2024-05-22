const Router = require('express')
const router = new Router()
const userController = require('../controllers/users.controllers')
const middleware = require('../middleware/users.middleware')

// router.use(middleware.userMiddle)
router.use('/check/token', middleware.changingToken)

router.get('', userController.getUsers)
router.post('/:email', userController.checkUser)
router.get('/check/token', userController.checkUserByToken)
router.post('', userController.createUser)

module.exports = router