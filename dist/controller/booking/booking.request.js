'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _booking = require('../../model/booking/booking.requests');

var _booking2 = _interopRequireDefault(_booking);

var _client = require('../../model/client/client');

var _client2 = _interopRequireDefault(_client);

var _client3 = require('../../model/client/client.details');

var _client4 = _interopRequireDefault(_client3);

var _cleaner = require('../../model/cleaner/cleaner');

var _cleaner2 = _interopRequireDefault(_cleaner);

var _cleaner3 = require('../../model/cleaner/cleaner.details');

var _cleaner4 = _interopRequireDefault(_cleaner3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var config = _ref.config,
        db = _ref.db;

    var api = (0, _express.Router)();

    // '/api/v1/booking/request'
    api.post('/request', function (req, res) {
        var result = {};

        var _req$body = req.body,
            clientID = _req$body.clientID,
            clientName = _req$body.clientName,
            clientPhone = _req$body.clientPhone,
            clientEmail = _req$body.clientEmail,
            extraTasks = _req$body.extraTasks,
            hours = _req$body.hours,
            moreHours = _req$body.moreHours,
            priority = _req$body.priority,
            accessType = _req$body.accessType,
            keyHiddenPin = _req$body.keyHiddenPin,
            keySafePin = _req$body.keySafePin,
            frequency = _req$body.frequency,
            dateFirstClean = _req$body.dateFirstClean,
            postcode = _req$body.postcode,
            address = _req$body.address,
            city = _req$body.city;

        var selectedCleaner0 = req.body.selectedCleaner0;
        var selectedCleaner1 = req.body.selectedCleaner1;
        var selectedCleaner2 = req.body.selectedCleaner2;
        var selectedCleanerID0 = req.body.selectedCleanerID1;
        var selectedCleanerID1 = req.body.selectedCleanerID1;
        var selectedCleanerID2 = req.body.selectedCleanerID2;
        var selectedCleaners = [selectedCleaner0, selectedCleaner1, selectedCleaner2];
        var selectedCleanerIDs = [selectedCleanerID0, selectedCleanerID1, selectedCleanerID2];
        var status = false;

        res.json({ 'clientID': clientID }, { 'SelectedCleaners': selectedCleaners }, { 'selectedCleanerIDs': selectedCleanerIDs });

        req.checkBody('clientID', 'clientID is required').notEmpty();
        req.checkBody('clientName', 'clientName is required').notEmpty();
        req.checkBody('clientPhone', 'clientPhone is required').notEmpty();
        req.checkBody('clientEmail', 'clientEmail is required').notEmpty();
        req.checkBody('extraTasks', 'extraTasks is required').notEmpty();
        req.checkBody('hours', 'Cleaning hours is required').notEmpty();
        req.checkBody('accessType', 'Apartment access type is required').notEmpty();
        req.checkBody('frequency', 'Cleaning frequency is required').notEmpty();
        req.checkBody('dateFirstClean', 'Date of First Clean is required').notEmpty();
        req.checkBody('postcode', 'Postcode is required').notEmpty();
        req.checkBody('address', 'address is required').notEmpty();
        req.checkBody('city', 'City is required').notEmpty();

        var errors = req.validationErrors();
        if (errors) {
            var _result = {};
            var _status = 400;
            _result.status = _status;
            _result.error = errors;
            res.status(_status).send(_result);
        } else {
            var newRequest = (0, _booking2.default)({
                clientID: clientID,
                clientName: clientName,
                clientEmail: clientEmail,
                clientPhone: clientPhone,
                extraTasks: extraTasks,
                hours: hours,
                moreHours: moreHours,
                address: address,
                city: city,
                postcode: postcode,
                keySafePin: keySafePin,
                keyHiddenPin: keyHiddenPin,
                frequency: frequency,
                priority: priority,
                accessType: accessType,
                dateFirstClean: dateFirstClean,
                selectedCleaners: selectedCleaners,
                selectedCleanerIDs: selectedCleanerIDs,
                status: status
            });

            newRequest.save(function (err) {
                if (err) {
                    var _status2 = 400;
                    result.status = _status2;
                    result.error = err;
                    res.status(_status2).send(result);
                }

                var status = 201;
                result.status = status;
                var message = 'Request is submitted';
                result.message = message;
                res.status(status).send(result);
            });
        }
    });

    // 'api/v1/booking/final/:clientID'
    api.get('/final/:clientID', function (req, res) {
        _client2.default.findOne({ clientID: req.params.clientID }, function (err, client) {
            _client4.default.findOne({ clientID: req.params.clientID }, function (error, details) {
                _cleaner4.default.find({ city: details.city }, function (err, cleanerDetails) {
                    if (!cleanerDetails) {
                        var _result2 = {};
                        var _status3 = 400;
                        var errMsg = 'Cleaner Details Empty';
                        _result2.status = _status3;
                        _result2.errMsg = errMsg;
                        res.status(_status3).send(_result2);

                        // render the booking final page
                    }
                    var result = {};
                    var status = 200;
                    var message = 'Cleaner Details Submited';
                    result.status = status;
                    result.message = message;
                    res.status(status).send(result);
                });
            });
        });
    });

    return api;
};
//# sourceMappingURL=booking.request.js.map