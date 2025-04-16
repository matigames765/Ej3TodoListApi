const express = require ('express')

const router = express.Router()

const Task = require('../models/Task')

const Sprint = require('../models/Sprint')

router.get('/tasks', async(req, res) => {
    try{
        const tasks = await Task.find()

        return res.json(tasks)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

router.get('/tasks/:id', async(req, res) => {
    try{
        const taskById = await Task.findById(req.paramas.id)

        if(!taskById){
            res.status(404).json({message: 'Tarea no encontrada'})
            return 
        }

        return res.json(taskById)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('tasks', async(req, res) => {

    const {titulo, descripcion, estado, fechaLimite} = req.body

    if (!titulo || !estado || !fechaLimite){
        res.status(400).json({message:"Los campos titulo, estado y fechaLimite son requeridos"})
        return
    }

    const task = new Task({
        titulo,
        descripcion,
        estado,
        fechaLimite,
    })
    try{
        const newTask = task.save()
        
        res.status(201).json(newTask)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

router.put('tasks/:id', async(req,res) => {
    try{
        const {id} = req.params
        const updatedData = req.body

        const updatedTask = await Task.findByIdAndUpdate(id, updatedData, {new: true})

        if(!updatedTask){
            res.status(404).json({message: "Tarea no encontrada"})
            return
        }

        res.status(200).json(updatedTask)
        
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

router.delete('/tasks/:id', async(req, res) => {
    try{
        const {id} = req.params

        const sprints = await Sprint.find().populate('tareas')

        for(let i = 0; i < sprints.length; i++){
            for (let j = 0; j < sprints[i].tareas; j++){
                if(sprints[i].tareas[j].id === id){
                    res.status(409).json({message: "La tarea no se puede elimnar ya que se encuentra en un sprint"})
                    return
                }
            }
        }
        
        const deleteTask = await Task.findByIdAndDelete(id)

        if(!deleteTask){
            res.status(404).json({message: "Tarea no encontrada"})
        }

        res.status(200).json(deleteTask)

    }catch(error){
        res.status(500).json({message: error.message})
    }
})

module.exports = router