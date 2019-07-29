const mongoose = require('mongoose');

//Article Schema
let publicSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
});

let Public = module.exports = mongoose.model('Public', publicSchema);