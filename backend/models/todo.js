const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({

 todoTitle : { type: String, required: true },
 imageUrl: { type: String },

})

module.exports = mongoose.model('todoSchema', todoSchema);