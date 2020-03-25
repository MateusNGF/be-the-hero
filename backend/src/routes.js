const express = require('express')

const controllers = require('./controllers/controllers.js');

const router = express.Router()

router.get('/profile', controllers.Profile.listar)
router.post('/profile/login', controllers.Profile.login)

router.get('/ongs', controllers.Ongs.listar)
router.post('/ongs', controllers.Ongs.criar)

router.get('/incidents', controllers.Incidents.listar)
router.post('/incidents', controllers.Incidents.criar)
router.delete('/incidents/:id', controllers.Incidents.deletar)

module.exports = router;