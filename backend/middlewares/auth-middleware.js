
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
 
 console.log(req);
 const token = req.headers.authtoken;
 
 // if (token === null | token === undefined ) {
 //  console.log(err);
 //  res.status(401).json({
 //   isAuthenticated: false
 //  });
 // }

 try{
  jwt.verify(token, 'Bud_Asz_1992');
  console.log('Sending response');
  res.status(202).json({
   isAuthenticated: true
  });
 }
 catch(err){
  console.log(err);
  res.status(401).json({
   isAuthenticated: false
  });
 }


}