const express = require("express");
const todoSchema = require('../models/todo');

const router = express.Router();


// Posting data to MongoDB with Mongoose
router.post('', (req, res, next) => {
  
 const todo = new todoSchema({
   todoTitle: req.body.todoTitle
  });

  todo.save()
  .then(savedTodo => {
   res.status(201).json({
    id: savedTodo.id,
    todoTitle: savedTodo.todoTitle
   });
  }); 

});

// Getting data from MongoDB with Mongoose
router.get('', (req, res, next) => {

todoSchema.find()
 .then(response => {
  res.status(201);

  res.send(response.map(todo => {
   return {
    id : todo._id,
    todoTitle : todo.todoTitle
   } 
  }));
 }
 )
  .catch(err => console.log(err)
  );

});


// Deleting data from MongoDB with Mongoose

router.delete('/:id', (req, res, next) => {
 
 todoSchema.deleteOne({
  _id : req.params.id
 })
  .then(response => {
   res.status(201).json({
    message : 'succesfully deleted!',
    body: response
   })
  })
  .catch(err => console.log(err))
})


module.exports = router;


