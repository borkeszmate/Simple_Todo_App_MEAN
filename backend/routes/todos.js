const express = require("express");
const todoSchema = require('../models/todo');
const multer = require("multer");
const path = require("path");

const router = express.Router();
const fs = require("fs");



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
router.post('/posts', upload, (req, res, next) => {
  
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
router.get('/posts', (req, res, next) => {


  let docs;
  
  const previousPageIndex = req.query.previousPageIndex;
  const pageIndex = +req.query.pageIndex;
  const pageSize = +req.query.pageSize;
  // console.log(pageSize);

  const queryAll = todoSchema.find().skip(pageIndex * pageSize).limit(pageSize);



  queryAll.then(documents => {
    
     docs = documents;
     return todoSchema.countDocuments()
    

  }).then(count => {
    res.status(201);
    res.send({
      mgs:'Posts are fetched!',
      documents : docs,
      totalNumTodos : count
    })
  })


  .catch(err => console.log(err)
  );

});







// Deleting data from MongoDB with Mongoose


router.delete('/posts/:id', (req, res, next) => {
  
  //  First find the file in db and retrive img path. 
  
  todoSchema.findOne({
   _id: req.params.id
 }).then(result => {
  //  Extract img file name from image path
   const imgPath = result.imageUrl 
   const cut = imgPath.indexOf('img/');
   const imgFileName = imgPath.substr(cut + 4, imgPath.length);
  //  Remove file 
   fs.unlink(`img/${imgFileName}`, (err) => {
     if (err) {
       console.log(err);
     }
   });

  // Delete record from DB
   todoSchema.deleteOne({
    _id : req.params.id
   })
    .then(response => {
    //  Send back the response msg
     res.status(201).json({
      message : 'succesfully deleted!',
      body: response
     })
    })
    .catch(err => console.log(err))
  })
  
});




module.exports = router;


