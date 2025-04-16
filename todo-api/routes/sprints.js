const express = require('express')

const router = express.Router()

const Sprint = require('../models/Sprint')

const Task = require('../models/Task')

router.get('/sprints', async(req, res) => {
    try{
        const sprints = await Sprint.find().populate('tareas')

        res.status(200).json(sprints)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

router.get('/sprints/:id', async(req, res) => {
    try{
        const {id} = req.params

        const sprint = await Sprint.findById(id).populate('tareas')

        if(!sprint){
            res.status(404).json({message: "No fue encontrado el sprint con ese id"})
            return
        }

        res.status(200).json(sprint)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('sprints', async(req, res) => {
    const {fechaInicio, fechaCierre, tareas} = req.body

    if(!fechaCierre || !fechaInicio){
        res.status(404).json({message: "Los campos fechaCierre y fechaInicio son requeridos"})
        return
    }

    const sprint = new Sprint({
        fechaInicio,
        fechaCierre,
        tareas,
    })
    try{
        const newSprint = await sprint.save()

        res.status(201).json(newSprint)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

router.put('/sprints/:id', async(req, res) => {
    try{
        const {id} = req.params
        const updatedData = req.body

        const updatedSprint = await Sprint.findByIdAndUpdate(id, updatedData, {new: true})

        if(!updatedSprint){
            res.status(404).json({message: "No fue encontrado el sprint para actualizarlo"})
        }

        res.status(200).json(updatedSprint)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

router.delete('/sprints/:id', async(req, res) => {
    try{
        const {id} = req.params

        const deleteSprint = await Sprint.findByIdAndDelete(id)

        if(!deleteSprint){
            res.status(404).json({message: "No se encontro el sprint para eliminarlo"})
        }

        res.status(200).json(deleteSprint)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//preguntar por este metodo

router.put('/sprints/:id/add-task/:taskId', async(req, res) => {
    try{
        const {id, taskId} = req.params
        
        const sprint = await Sprint.findById(id).populate('tareas')

        if(!sprint){
            res.status(404).json({message: "No fue encontrado el sprint con el id dado"})
            return
        }

        const tareaReferida = await Task.findById(taskId)
        
        if(!tareaReferida){
            res.status(404).json({message: "La tarea no existe"})
            return
        }
        sprint.tareas.push(taskId)

        await sprint.save()

        res.status(200).json(sprint)

    }catch(error){
        res.status(500).json({message: error.message})
    }
})

module.exports = router

