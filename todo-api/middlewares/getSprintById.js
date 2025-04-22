const Sprint = require('../models/Sprint')

const getSprintById = async(req, res, next) => {
    try{
        const {id} = req.params

        const sprint = await Sprint.findById(id)

        if(!sprint){
            res.status(404).json({message: `No se encuentra el sprint con el id ${id}`})
        }

        res.sprint = sprint
        next()
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = getSprintById