'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var ClientDetailsSchema = Schema({
    postcode: {
        type: String,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    extraTasks: {
        type: Array,
        required: true
    },
    dateOfFirstClean: {
        type: Date,
        required: true
    },
    cleaningHours: {
        type: Number,
        required: true
    },
    moreCleaningHours: {
        type: Number
    },
    cleaningPriority: {
        type: String
    },
    apartmentAccess: {
        type: String,
        required: true
    },
    keyHiddenPin: {
        type: String
    },
    keySafePin: {
        type: String
    },
    cleaningFrequency: {
        type: String,
        required: true
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
    clientID: {
        type: String,
        required: true
    }
});

ClientDetailsSchema.set('timestamps', true);
var ClientDetails = _mongoose2.default.exports = _mongoose2.default.model('ClientDetails', ClientDetailsSchema);
//# sourceMappingURL=client.details.js.map