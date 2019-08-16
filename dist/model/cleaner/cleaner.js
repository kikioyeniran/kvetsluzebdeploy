'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var CleanerSchema = Schema({
    cleanerId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

CleanerSchema.set('timestamps', true);
var Cleaner = module.exports = _mongoose2.default.model('Cleaner', CleanerSchema);

module.exports.createUser = function (newUser, callback) {
    _bcryptjs2.default.genSalt(10, function (err, salt) {
        _bcryptjs2.default.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};
//# sourceMappingURL=cleaner.js.map