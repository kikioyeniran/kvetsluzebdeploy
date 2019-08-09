const mongoose = require('mongoose');


//Cleaner schema
const CleanerSchema = mongoose.Schema({
    cleanerID:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },

});
const Cleaner = module.exports = mongoose.model('cleaner', CleanerSchema);