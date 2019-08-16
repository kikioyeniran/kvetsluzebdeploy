const mongoose = require('mongoose');
const crypto  = require('crypto');

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
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    

});


const Cleaner = module.exports = mongoose.model('cleaner', CleanerSchema);
