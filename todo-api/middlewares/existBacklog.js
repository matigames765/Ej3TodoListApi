const Backlog = require('../models/Backlog')

const existBacklog = async() => {
    try{
        const backlogs = await Backlog.find()

        if(backlogs.length === 0){
            const primerBacklog = new Backlog({
                tareas: []
            })

            await primerBacklog.save()
        }

    }catch(error){
        console.log("Error: " + error)
    }
}

module.exports = existBacklog
