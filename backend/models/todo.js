const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({

 todoTitle : { type: String, required: true }

})

module.exports = mongoose.model('todoSchema', todoSchema);