const Router = require('express')
const router = new Router()
const tokenController = require('../controllers/tokens.controllers')
const middleware = require('../middleware/tokens.middleware')

router.post('/create', tokenController.getToken)

module.exports = router