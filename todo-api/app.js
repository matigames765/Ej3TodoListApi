const express = require('express')

const mongoose = require('mongoose')

const bodyParser = require('body-parser')

const backlogRoutes = require('./routes/backlog')
const sprintsRoutes = require('./routes/sprints')
const tasksRoutes = require('./routes/tasks')

const app = express()

app.use(bodyParser.json())

require('dotenv').config()

mongoose.connect(process.env.DB_URL, {dbName: process.env.DB_NAME})
.then(() => {
    console.log("Se pudo conectar a la base de datos")
})
.catch(() => {
    console.log("No se pudo conectar a la base de datos")
})

app.use('/task', tasksRoutes)
app.use('/', backlogRoutes)
app.use('/sprint', sprintsRoutes)

app.listen(process.env.PORT, () => {
    console.log("Escuchando el puerto: " + process.env.PORT)
})
