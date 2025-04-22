const mongoose = require('mongoose')

const sprintSchema = mongoose.Schema({
    fechaInicio:{
        type: String,
        required: true
    },
    fechaCierre:{
        type: String,
        required: true
    },
    tareas:[{
        type: mongoose.Schema.Types.ObjectId, ref: "Task"}], default: []
})

const Sprint = mongoose.model('Sprint', sprintSchema)

module.exports = Sprint