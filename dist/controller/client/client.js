'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _client = require('../../model/client/client');

var _client2 = _interopRequireDefault(_client);

var _client3 = require('../../model/client/client.details');

var _client4 = _interopRequireDefault(_client3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var config = _ref.config,
        db = _ref.db;

    var api = (0, _express.Router)();

    // client Dashboard Route
    // 'api/v1/client/dashboard/:id'
    api.get('/dashboard/:id', function (req, res) {
        _client2.default.findById(req.params.id, function (err, client) {

            var query = { clientID: client.clientID };
            _client4.default.find(query, function (err, clientDetails) {
                if (err) {
                    var _result = {};
                    var _status = 400;
                    var error = err;
                    _result.status = _status;
                    _result.error = err;
                    res.status(_status).send(_result);
                }
                // res.render() --> can come here 
                var status = 201;
                var result = {};
                var currentClient = client;
                var currentClientDetails = clientDetails[0];
                result.status = status;
                result.currentClient = currentClient;
                result.currentClientDetails = currentClientDetails;

                res.status(status).send(result);
            });
        });
    });

    return api;
};
//# sourceMappingURL=client.js.map