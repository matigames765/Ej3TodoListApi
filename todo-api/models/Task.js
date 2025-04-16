const mongoose = require ('mongoose')

const taskSchema = new mongoose.Schema({
    titulo:{
        type:String,
        required:true
    },
    descripcion:{
        type:String
    },
    estado:{
        type:String,
        enum:['pendiente', 'en_progreso', 'completada'],
        required: true
    },
    fechaLimite:{
        type: String,
        required: true
    }
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task