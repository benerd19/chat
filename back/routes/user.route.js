const Router = require('express')
const router = new Router()
const userController = require('../controllers/users.controllers')
const changeToken = require('../middleware/changeToken')
const checkUser = require('../middleware/checkUser')

// router.use(middleware.userMiddle)
router.use('/email', changeToken, checkUser)
router.use('/check/token', changeToken, checkUser)

router.get('', userController.getUsers)
router.get('/check/token', userController.checkUserByToken)
router.post('', userController.createUser)
router.get('/email', userController.getEmail)
router.post('/:email', userController.checkUser)

module.exports = router