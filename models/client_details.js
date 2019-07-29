const mongoose = require('mongoose');

//Client Detils Schema
let ClientDetailsSchema = mongoose.Schema({
    postcode:{
        type: String,
        required: true
    },
    bedrooms:{
        type: Number,
        required: true
    },
    bathrooms:{
        type: Number,
        required: true
    },
    extra_tasks:{
        type: Array,
        required: true
    },
    date_first_clean:{
        type: Date,
        required: true
    },
    cleaning_hours:{
        type: Number,
        required: true
    },
    more_cleaning_hours:{
        type: Number
    },
    cleaning_priority:{
        type: String
    },
    apartment_access:{
        type: String,
        required: true
    },
    key_hidden_pin:{
        type: String
    },
    key_safe_pin:{
        type: String
    },
    cleaning_frequency:{
        type: String,
        required: true
    },
    mobile_number:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    full_name:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    clientID:{
        type: String,
        required: true
    },
    updated:{
        type: Date,
        default: Date.now
    }
});

let ClientDetails = module.exports = mongoose.model('client_details', ClientDetailsSchema);