const mongoose = require('mongoose');

//Cleaner Detils Schema
let CleanerDetailsSchema = mongoose.Schema({
    postcode:{
        type: String,
        required: true
    },
    extra_tasks:{
        type: Array,
        required: true
    },
    date_first_clean:{
        type: Date
    },
    experience:{
        type: String,
        required: true
    },
    profile:{
        type: String
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
    profile_pic:{
        type: String,
        required: true
    },
    national_id:{
        type: String,
        required: true
    },
    health_insurance:{
        type: String,
        required: true
    },
    cleaner_id:{
        type: String,
        required: true
    },
    income:{
        type: Number,
        required: true
    },
    updated:{
        type: Date,
        default: Date.now
    }
});

let CleanerDetails = module.exports = mongoose.model('Cleaner_details', CleanerDetailsSchema);