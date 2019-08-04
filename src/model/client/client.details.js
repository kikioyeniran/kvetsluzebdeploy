import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

const ClientDetailsSchema = Schema({
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
    extraTasks:{
        type: Array,
        required: true
    },
    dateOfFirstClean:{
        type: Date,
        required: true
    },
    cleaningHours:{
        type: Number,
        required: true
    },
    moreCleaningHours:{
        type: Number
    },
    cleaningPriority:{
        type: String
    },
    apartmentAccess:{
        type: String,
        required: true
    },
    keyHiddenPin:{
        type: String
    },
    keySafePin:{
        type: String
    },
    cleaningFrequency:{
        type: String,
        required: true
    },
    mobileNumber:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    fullName:{
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
    }
});

ClientDetailsSchema.set('timestamps', true);
let ClientDetails = mongoose.exports = mongoose.model('ClientDetails', ClientDetailsSchema);