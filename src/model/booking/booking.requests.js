import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BookingSchema = Schema({
    clientID:{
        type: String,
        required: true
    },
    clientName:{
        type: String,
        required: true
    },
    selectedCleaners:{
        type: Array,
        required: true
    },
    selectedCleanerIDs:{
        type: Array,
        required: true
    },
    postcode:{
        type: String,
        required: true
    },
    extraTasks:{
        type: Array,
        required: true
    },
    dateFirstClean:{
        type: Date,
        required: true
    },
    priority:{
        type: String
    },
    clientPhone:{
        type: Number,
        required: true
    },
    clientEmail:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    accessType:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default: false,
        required: true
    }
});

RequestSchema.set('timestamps', true);
let Booking = module.exports = mongoose.model('Booking', BookingSchema);