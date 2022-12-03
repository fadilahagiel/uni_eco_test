const Controller = require('../controllers/controller')

const router = require('express').Router()


router.get(`/`, Controller.showAllUsers)
router.get(`/:_id`, Controller.showOneUser)
router.put(`/:_id`, Controller.updateUser)


module.exports = router