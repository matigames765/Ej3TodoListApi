const Backlog = require('../models/Backlog')

const getAllBacklogs =  async(req, res) => {
    try{
        const backlog = await Backlog.find().populate('tareas')

        res.status(200).json(backlog)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const getBacklog =  async(req, res) => {
    try{
        const backlog = res.backlog
        res.status(200).json(backlog)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const createBacklog =  async(req, res) => {
    const {tareas} = req.body

    const backlog = new Backlog({
        tareas
    })
    try{

        const newBacklog = await backlog.save()

        res.status(200).json(newBacklog)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const createTaskInBacklog = async(req, res) => {
    try{
        const task = res.task

        const backlog = await Backlog.find().populate('tareas')

        backlog.tareas.push(task)

        res.status(200).json(backlog)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const editBacklog = async(req, res ) => {
    try{
        tasks = req.body

        await Backlog.deleteMany({})

        await Backlog.insertMany(tasks)

        res.status(200).json(tasks)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    getAllBacklogs,
    getBacklog,
    createBacklog,
    createTaskInBacklog,
    editBacklog
}
