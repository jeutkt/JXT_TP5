const express = require('express')
const bodyParser = require('body-parser');

const usersRouter = require('./routes/users-v1')
const usersModel = require('./model/users')
const helmet=require('helmet')
const app = express()

app.use(bodyParser.json())
app.use(helmet.noSniff())
app.use(helmet.xssFilter())
// On injecte le model dans le router. Ceci permet de supprimer la dépendance
// directe entre le router et le modele
app.use('/v1/users', usersRouter(usersModel))


//for unit tests
exports.app=app
