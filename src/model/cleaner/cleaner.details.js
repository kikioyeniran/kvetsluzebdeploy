import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let CleanerDetailsSchema = Schema({
    postcode:{
        type: String,
        required: true
    },
    extraTasks:{
        type: Array,
        required: true
    },
    dateOfFirstClean:{
        type: Date
    },
    experience:{
        type: String,
        required: true
    },
    profile:{
        type: String
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
    profilePic:{
        type: String,
        required: true
    },
    nationalId:{
        type: String,
        required: true
    },
    healthInsurance:{
        type: String,
        required: true
    },
    cleanerId:{
        type: String,
        required: true
    },
    income:{
        type: Number,
        required: true
    }
});

CleanerDetailsSchema.set('timestamps', true);
let CleanerDetails = module.exports = mongoose.model('CleanerDetails', CleanerDetailsSchema);

