const express = require('express')
const bodyParser = require('body-parser');
const helmet = require('helmet')

const usersRouter = require('./routes/users-v1')
const usersModel = require('./model/users')

const loginRouter=require('./routes/auth-v1')
const loggerModel = require("./model/idp");


const checktoken=require('./checktoken')


const app = express()

app.use(bodyParser.json())

// Activation de Helmet
app.use(helmet({noSniff: true}))


app.use(checktoken)



// On injecte le model dans le router. Ceci permet de supprimer la dépendance
// directe entre le router et le modele
app.use('/v1/auth',loginRouter(loggerModel))
app.use('/v1/users', usersRouter(usersModel))


// For unit tests
exports.app = app