const express = require('express')

const controllers = require('./controllers/controllers.js');

const router = express.Router()

router.get('/profile', controllers.Profile.listar)
router.post('/profile/login', controllers.Profile.login)

router.get('/ongs', controllers.Ongs.listar)
router.post('/ongs', controllers.Ongs.criar)

router.get('/campanhas', controllers.Campanhas.listar)
router.post('/campanhas', controllers.Campanhas.criar)
router.delete('/campanhas/:id', controllers.Campanhas.deletar)

module.exports = router;