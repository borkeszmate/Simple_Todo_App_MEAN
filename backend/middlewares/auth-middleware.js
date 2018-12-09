
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
 
 
 const token = req.headers.authtoken;

 try{
  jwt.verify(token, 'Bud_Asz_1992');
 }
 catch(err){

  res.status(401).json({
   error: 'User is not authenticated! Please register and log in!'
  });
 }
 next();

}