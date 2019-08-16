'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var CleanerDetailsSchema = Schema({
    postcode: {
        type: String,
        required: true
    },
    extraTasks: {
        type: Array,
        required: true
    },
    dateOfFirstClean: {
        type: Date
    },
    experience: {
        type: String,
        required: true
    },
    profile: {
        type: String
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: true
    },
    nationalId: {
        type: String,
        required: true
    },
    healthInsurance: {
        type: String,
        required: true
    },
    cleanerId: {
        type: String,
        required: true
    },
    income: {
        type: Number,
        required: true
    }
});

CleanerDetailsSchema.set('timestamps', true);
var CleanerDetails = module.exports = _mongoose2.default.model('CleanerDetails', CleanerDetailsSchema);
//# sourceMappingURL=cleaner.details.js.map