const express = require("express");
const router = express.Router();


router.post('/register', (req, res, next) => {
 res.status(201).json({'hello': 'bello'});
});

module.exports = router;