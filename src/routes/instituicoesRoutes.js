const controller = require('../controllers/instituicoesController')
const express = require('express')

const router = express.Router()

const { checkAuth } = require('../middlewares/auth')


router.get('/all', controller.buscarInstituicao)
router.post('/create', checkAuth, controller.criarInstituicao)
router.patch('/update/:id', checkAuth, controller.atualizarInstituicao)
router.delete('/delete/:id', checkAuth, controller.deletarInstituicao)
router.get('/:id', checkAuth, controller.buscarInstituicaoPorId)

module.exports = router