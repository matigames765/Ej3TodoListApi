const express = require('express')

const router = express.Router()

const Backlog = require('../models/Backlog')

const Task = require('../models/Task')

const getTaskById = require('../controllers/task.controller')

const {getBacklogById, existBacklog} = require('../controllers/backlog.controller')

router.get('/backlog', async(req, res) => {
    try{
        const backlog = await Backlog.find().populate('tareas')

        res.status(200).json(backlog)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

router.get('/backlog/:id', getBacklogById, async(req, res) => {
    try{
        const backlog = res.backlog
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

router.put('/backlog/add-task/:taskId', getTaskById, async(req, res) => {
    try{
        const task = res.task

        const backlog = await Backlog.find().populate('tareas')

        backlog.tareas.push(task)

        res.status(200).json(backlog)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

module.exports = router