const express = require('express');
const router = express.Router();

const {
  createTask,
  getAllTasks,
  updateTask,
} = require('../controllers/task.controller');

router.post('/create', createTask);
router.get('/all', getAllTasks);
router.put('/update', updateTask);

module.exports = router;
