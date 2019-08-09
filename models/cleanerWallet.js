const mongoose = require('mongoose');


//Cleaner schema
const CleanerWalletSchema = mongoose.Schema({
    cleanerID:{
        type: String,
        required: true
    },
    totalIncome:{
        type: Number,
        required: true
    },
    expectedIncome:{
        type: Number
    },
    paidIncome:{
        type: Number
    },
    cleanerIncome:{
        type: Number,
        required: true
    },
    updated:{
        type: Date,
        default: Date.now
    }
});
const CleanerWallet = module.exports = mongoose.model('cleanerWallet', CleanerWalletSchema);