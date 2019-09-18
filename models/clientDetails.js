const mongoose = require('mongoose');

//Client Detils Schema
let ClientDetailsSchema = mongoose.Schema({
    email:{
        type: String
    },
    postcode:{
        type: String,
        required: true
    },
    bedrooms:{
        type: Number
    },
    bathrooms:{
        type: Number
    },
    extraTasks:{
        type: Array
    },
    dateFirstClean:{
        type: Date
    },
    cleaningHours:{
        type: Number
    },
    moreCleaningHours:{
        type: Number
    },
    cleaningPriority:{
        type: String
    },
    apartmentAccess:{
        type: String
    },
    keyHiddenPin:{
        type: String
    },
    keySafePin:{
        type: String
    },
    cleaningFrequency:{
        type: String
    },
    mobileNumber:{
        type: Number
    },
    address:{
        type: String
    },
    fullName:{
        type: String
    },
    city:{
        type: String
    },
    country:{
        type: String,
        //required: true
    },
    rating:{
        type: Number,
        default: 0
    },
    clientID:{
        type: String
    },
    profilePic:{
        type: String,
        required: true
    },
    updated:{
        type: Date,
        default: Date.now
    }
});

let ClientDetails = module.exports = mongoose.model('client_details', ClientDetailsSchema);