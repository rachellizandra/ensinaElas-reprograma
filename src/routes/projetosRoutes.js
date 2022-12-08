const controller = require('../controllers/projetosController')
const express = require('express')

const router = express.Router()

const { checkAuth } = require('../middlewares/auth')


router.get('/all', controller.buscarProjeto)
router.post('/create', checkAuth, controller.criarProjeto)
router.patch('/update/:id', checkAuth, controller.atualizarProjeto)
router.delete('/delete/:id', checkAuth, controller.deletarProjeto)
router.get('/:id', checkAuth, controller.buscarProjetoPorId)

module.exports = router