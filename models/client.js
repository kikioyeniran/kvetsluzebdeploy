const mongoose = require('mongoose');


//Cleaner schema
const ClientSchema = mongoose.Schema({
    clientID:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },

});
const Client = module.exports = mongoose.model('client', ClientSchema);