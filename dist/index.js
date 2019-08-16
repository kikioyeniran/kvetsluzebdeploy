'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _expressValidator = require('express-validator');

var _expressValidator2 = _interopRequireDefault(_expressValidator);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// importing the config and routes folders
var app = (0, _express2.default)();
app.server = _http2.default.createServer(app);

// middleware
// parse application/json
app.use(_bodyParser2.default.json({
  limit: _config2.default.bodyLimit
}));
app.use(_bodyParser2.default.urlencoded({ extended: false }));

// setting public folder
app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

// morgan logger
app.use((0, _morgan2.default)('dev'));

// Express Validator Middleware
app.use((0, _expressValidator2.default)({
  errorFormatter: function errorFormatter(param, msg, value) {
    var namespace = param.split('-'),
        root = namespace.shift(),
        formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

// routes for API version 1
app.use('/api/v1', _routes2.default);

app.server.listen(_config2.default.port);
console.log('started on port:' + app.server.address().port);

exports.default = app;
//# sourceMappingURL=index.js.map