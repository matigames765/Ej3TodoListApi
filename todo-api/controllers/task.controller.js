const Task = require('../models/Task')

const getTaskById = async(req, res, next) => {
    try{
        const {taskId} = req.params

        const task = await Task.findById(taskId)
    
        if(!task){
            res.status(404).json({message: `La tarea con el id ${taskId} no fue encontrada`})
            return
        }

        res.task = task
        next()

    }catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = getTaskById