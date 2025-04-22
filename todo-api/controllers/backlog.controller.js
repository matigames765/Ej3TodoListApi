const Backlog = require('../models/Backlog')

const getBacklogById = async(req, res, next) => {
    try{
        const {id} = req.params

        const backlog = await Backlog.findById(id)

        if(!backlog){
            res.status(404).json({message: `No se encuentra el backlog con el id ${id}`})
        }

        res.backlog = backlog
        next()
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const existBacklog = async() => {
    try{
        const backlogs = await Backlog.find()

        if(backlogs.length === 0){
            const primerBacklog = new Backlog({
                tareas: [{}]
            })

            await primerBacklog.save()
        }

    }catch(error){
        console.log("Error: " + error)
    }
}

module.exports = {getBacklogById, existBacklog}
