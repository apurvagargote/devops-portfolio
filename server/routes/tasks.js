const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  toggleComplete,
  toggleFavorite
} = require('../controllers/taskController');

// Routes
router
  .route('/')
  .get(getAllTasks)
  .post(createTask);

router
  .route('/:id')
  .get(getTask)
  .put(updateTask)
  .delete(deleteTask);

router.patch('/:id/toggle-complete', toggleComplete);
router.patch('/:id/toggle-favorite', toggleFavorite);

module.exports = router;