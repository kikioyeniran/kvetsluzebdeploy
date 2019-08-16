'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var BookingSchema = Schema({
    clientID: {
        type: String,
        required: true
    },
    clientName: {
        type: String,
        required: true
    },
    selectedCleaners: {
        type: Array,
        required: true
    },
    selectedCleanerIDs: {
        type: Array,
        required: true
    },
    postcode: {
        type: String,
        required: true
    },
    extraTasks: {
        type: Array,
        required: true
    },
    dateFirstClean: {
        type: Date,
        required: true
    },
    priority: {
        type: String
    },
    clientPhone: {
        type: Number,
        required: true
    },
    clientEmail: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    accessType: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false,
        required: true
    }
});

RequestSchema.set('timestamps', true);
var Booking = module.exports = _mongoose2.default.model('Booking', BookingSchema);
//# sourceMappingURL=booking.requests.js.map