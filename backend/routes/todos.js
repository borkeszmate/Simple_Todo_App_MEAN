const express = require("express");
const todoSchema = require('../models/todo');
const multer = require("multer");
const path = require('path');

const router = express.Router();



// File upload configuration
const storage = multer.diskStorage({
 destination: (req, file, cb) => {
  //  console.log(file.mimetype);
  cb(null, './img');
 },
 filename: (req, file, cb) => {
   
   cb(null, file.originalname + '-' + Date.now() + '.jpg');
 }
});

const upload = multer({
  storage: storage,

  fileFilter: (req, file, cb) => {
    const allowedFiles = /png|jpg|jpeg/i;
    const mimeType = allowedFiles.test(file.mimetype);
    const extentionName = allowedFiles.test(path.extname(file.originalname));

    if (mimeType && extentionName) {
      return cb(null, true);
    }
    cb(`Error ${file.mimetype} is not supperted file type. Please select from the following filetypes: JPG/JPEG/PNG`);
    
 }, 
   })
   .single('image')







// Posting data to MongoDB with Mongoose
router.post('', upload, (req, res, next) => {
  
  const url = req.protocol + '://' + req.get('host');
  
  const todo = new todoSchema({
    todoTitle: req.body.todoTitle,
    imageUrl: url + '/img/' + req.file.filename
    });

  todo.save()
  .then(savedTodo => {

   res.status(201).json({
    id: savedTodo.id,
    todoTitle: savedTodo.todoTitle,
    imageUrl: savedTodo.imageUrl
   });
  });


  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log(err);
    } else if (err) {
      // An unknown error occurred when uploading.
      console.log(err);
    }

    // Everything went fine.
    // console.log('Feltöltve!');
  })

});







// Getting data from MongoDB with Mongoose
router.get('', (req, res, next) => {

todoSchema.find()
 .then(response => {
  res.status(201);

  res.send(response.map(todo => {
   return {
    id : todo._id,
    todoTitle : todo.todoTitle,
     imageUrl: todo.imageUrl
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


