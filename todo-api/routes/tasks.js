const express = require ('express')

const router = express.Router()

const getTaskById = require('../middlewares/getTaskById')

const taskController = require('../controllers/task.controller')

router.get('/tasks', taskController.getAllTasks)

router.get('/tasks/:taskId',getTaskById, taskController.getTask)

router.post('tasks', taskController.createTask)

router.put('tasks/:id', taskController.updateTask)

router.delete('/tasks/:id', taskController.deleteTask)

module.exports = router