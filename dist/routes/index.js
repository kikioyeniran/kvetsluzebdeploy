'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _middleware = require('../middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _client = require('../controller/client/client.account');

var _client2 = _interopRequireDefault(_client);

var _cleaner = require('../controller/cleaner/cleaner.account');

var _cleaner2 = _interopRequireDefault(_cleaner);

var _booking = require('../controller/booking/booking.request');

var _booking2 = _interopRequireDefault(_booking);

var _client3 = require('../controller/client/client');

var _client4 = _interopRequireDefault(_client3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import cleaner from '../controller/cleaner/cleaner.account';
// import booking from '../controller/booking/booking.request'

var router = (0, _express2.default)();

// connect to DB
(0, _db2.default)(function (db) {
    // internal middleware
    router.use((0, _middleware2.default)({ config: _config2.default, db: db }));
    // /api/v1/booking/cleaner/
    // api routes (/api/v1)
    router.use('/cleaner/account', (0, _cleaner2.default)({ config: _config2.default, db: db }));
    router.use('/booking', (0, _booking2.default)({ config: _config2.default, db: db }));

    router.use('/client', (0, _client4.default)({ config: _config2.default, db: db }));
    router.use('/client/account', (0, _client2.default)({ config: _config2.default, db: db }));
});

exports.default = router;
//# sourceMappingURL=index.js.map