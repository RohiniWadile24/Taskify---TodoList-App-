const express = require('express');
const { check } = require('express-validator');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validator');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getTasks)
  .post(
    [
      check('title', 'Title is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty()
    ],
    validateRequest,
    createTask
  );

router.route('/:id')
  .get(getTask)
  .put(updateTask)
  .delete(deleteTask);

module.exports = router;
