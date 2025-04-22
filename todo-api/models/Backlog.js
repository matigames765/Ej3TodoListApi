const mongoose = require('mongoose')

const backlogSchema = mongoose.Schema({
    tareas:[{
        type: mongoose.Schema.Types.ObjectId, ref: "Task"}], default: []
})


const Backlog = mongoose.model('Backlog', backlogSchema)

module.exports = Backlog