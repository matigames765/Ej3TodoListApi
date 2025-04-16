const express = require('express')

const router = express.Router()

const Backlog = require('../models/Backlog')

const Task = require('../models/Task')

router.get('/backlog', async(req, res) => {
    try{
        const backlog = await Backlog.find().populate('tareas')

        res.status(200).json(backlog)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post(('/backlog'), async(req, res) => {
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
})

router.put('/backlog/add-task/:taskId', async(req, res) => {
    try{
        const {taskId} = req.params

        const tareaReferida = await Task.findById(taskId)

        if(!tareaReferida){
            res.status(404).json({message: "No existe la tarea referida"})
            return
        }

        const backlog = await Backlog.find().populate('tareas')

        backlog.tareas.push(taskId)

        res.status(200).json(backlog)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

module.exports = router