const Sprint = require('../models/Sprint')

const getAllSprints = async(req, res) => {
    try{
        const sprints = await Sprint.find().populate('tareas')

        res.status(200).json(sprints)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const getSprint = async(req, res) => {
    try{
        
        const sprint = res.sprint

        res.status(200).json(sprint)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const createSprint =  async(req, res) => {
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
}

const updateSprint = async(req, res) => {
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
}

const deleteSprint = async(req, res) => {
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
}

const createTaskInSprint = async(req, res) => {
    try{
        const {id} = req.params

        const task = req.task
        
        const sprint = await Sprint.findById(id).populate('tareas')

        if(!sprint){
            res.status(404).json({message: "No fue encontrado el sprint con el id dado"})
            return
        }
        
        sprint.tareas.push(task)

        await sprint.save()

        res.status(200).json(sprint)

    }catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    getAllSprints,
    getSprint,
    createSprint,
    updateSprint,
    deleteSprint,
    createTaskInSprint
}