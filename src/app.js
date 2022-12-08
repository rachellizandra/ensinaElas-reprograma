require('dotenv').config()
const express = require('express')
const cors = require('cors')
const instituicoesRoutes = require('./routes/instituicoesRoutes')
const projetosRoutes = require('./routes/projetosRoutes')
const userRoutes = require('./routes/usersRoutes')
const indexRouter = require('./routes/indexRoutes')
const db = require('../src/config/mongoConnect')

const app = express()

db.connect()

app.use(express.json())
app.use(cors())

app.use('/instituicoes', instituicoesRoutes)
app.use('/projetos', projetosRoutes)
app.use('/users', userRoutes)
app.use(indexRouter)


module.exports = app