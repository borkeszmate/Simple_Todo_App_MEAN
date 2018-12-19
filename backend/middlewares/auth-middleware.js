
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
 
 const token = req.headers.authtoken;
 
 
//  if (token === null | token === undefined ) {
//   console.log(err);
//   res.status(401).json({
//    isAuthenticated: false
//   });
//  }
  // const verify = jwt.verify(token, 'Bud_Asz_1992');
  // console.log(verify);
  // res.status(201).json({
  //   isAuthenticated: true
  // });
 try{
  jwt.verify(token, 'Bud_Asz_1992');
  res.status(202).json({
   isAuthenticated: true
  });
 }
 catch(err){
  console.log(err);
  res.status(200).json({
   isAuthenticated: false
  });
 }
 

}