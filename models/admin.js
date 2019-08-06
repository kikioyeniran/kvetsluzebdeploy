const mongoose = require('mongoose');


//Cleaner schema
const AdminSchema = mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },

});
const Admin = module.exports = mongoose.model('admin', AdminSchema);