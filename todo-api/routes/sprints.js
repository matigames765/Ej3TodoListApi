const express = require('express')

const router = express.Router()

const getSprintById = require('../middlewares/getSprintById')

const getTaskById = require('../middlewares/getTaskById')

const sprintController = require('../controllers/sprint.controller')

router.get('/sprints', sprintController.getAllSprints)

router.get('/sprints/:id',getSprintById, sprintController.getSprint)

router.post('sprints', sprintController.createSprint)

router.put('/sprints/:id', sprintController.updateSprint)

router.delete('/sprints/:id', sprintController.deleteSprint)

router.put('/sprints/:id/add-task/:taskId',getTaskById, sprintController.createTaskInSprint)

module.exports = router

