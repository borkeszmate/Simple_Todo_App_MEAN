const express = require("express");
const router = express.Router();
const userSchema = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');




router.get('/register', (req, res, next) => {
  userSchema.find().then(users => console.log(users));

 
 console.log('users');
});


router.post('/register', (req, res, next) => {
 const password = req.body.password;
 const confirmPassword = req.body.confirmPassword;
 let hashedPassword;
 let hashedConfirmPasword;
 
 // Check if user is registered
 userSchema.findOne({email:req.body.email}, (err, user) => {
  
  if (user) {
   // If user already registered
   res.status(200).json({
    message: `${req.body.email} is already registered!`
   })
   return false;
  }

// If user is not registered
  bcrypt.genSalt(10, (err, salt) => {
   bcrypt.hash(password, salt, (err, hash) => {
    hashedPassword = hash;
   });
   
   bcrypt.hash(confirmPassword, salt, (err, hash) => {
    hashedConfirmPasword = hash;
 
    // Saving hashed user data to MongoDB
     const user = new userSchema({
      email: req.body.email,
      password: hashedPassword,
      confirmPassword: hashedConfirmPasword,
     });
    
     user.save()
      .then(  
      () => res.status(201).json({ 
       message: 'User successfully registered!',
       user: {
        email : req.body.email
       }
      })
      )
      .catch(err => res.status(400).json(err));  
   }) 
  });

 })

});


router.post('/login', (req, res, next) => {
 loginEmail = req.body.email;
 loginPassword = req.body.password;
 let hashedLoginPassword;
 // Check if email is in DB
 userSchema.findOne({email: loginEmail}, (err, user) => {
  if (user !== null) {
    // console.log(user.password);
    if (bcrypt.compareSync(loginPassword, user.password)) {
     // Correct password
      const token = jwt.sign({email: loginEmail}, 'Bud_Asz_1992');
      res.status(202).json({
        message: 'Succesfully logged in and token created!',
        user: {
          email: loginEmail,
          token: token
        }
      })

    } else {
     // Password does not match
    };

  } else {
   res.status(201).json({
    error: `${loginEmail} is not registered yet!`
   })
  } 
 });
});

module.exports = router;