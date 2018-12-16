const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// Routers
const todosRouter = require('./routes/todos');
const userRouter = require('./routes/user');

const app = express();




mongoose.connect(
  'mongodb+srv://borkeszmate:SRa6aqBc0BWhDNeZ@cluster0-jqq25.mongodb.net/test?retryWrites=true',
  {
  useNewUrlParser: true }
 )
 .then(response => {
  console.log('connected to db')
  })
 .catch( (err) =>{
  console.log(err);
  console.log('Not connected to the database! :(')

 }
 )



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/img', express.static('img'));

app.use((req, res, next) => {
 res.setHeader("Access-Control-Allow-Origin", "*");
 res.setHeader(
  "Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept, authtoken"
 );
 res.setHeader(
  "Access-Control-Allow-Methods",
  "GET, POST, PATCH, PUT, DELETE, OPTIONS"
 );
 next();
});

app.use('/api/todos', todosRouter );
app.use('/api/user', userRouter);



module.exports = app;
