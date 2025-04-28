const express = require('express')

const router = express.Router()

const getTaskById = require('../middlewares/getTaskById')

const backlogController = require('../controllers/backlog.controller')

const getBacklogById = require('../middlewares/getBacklogById')

router.get('/backlog', backlogController.getAllBacklogs)

router.get('/backlog/:id', getBacklogById, backlogController.getBacklog)

router.post(('/backlog'), backlogController.createBacklog)

router.put('/backlog/add-task/:taskId', getTaskById, backlogController.createTaskInBacklog)

router.put('/backlog', backlogController.editBacklog)

module.exports = router