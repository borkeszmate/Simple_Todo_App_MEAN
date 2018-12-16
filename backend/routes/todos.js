const express = require("express");

const router = express.Router();

const todoController = require('../controllers/todoController');

const authGuard = require('../middlewares/auth-middleware');


// Posting data to MongoDB with Mongoose
router.post('/posts', todoController.upload, todoController.todoPost);


// Getting data from MongoDB with Mongoose
router.get('/posts', todoController.getTodos);

// Deleting data from MongoDB with Mongoose

router.delete('/posts/:id', todoController.deleteTodo);

module.exports = router;


