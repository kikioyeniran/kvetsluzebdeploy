'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

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

    // **************************************************************
    // ******* CLIENT AUTHENTICATION COUPLED WITH BOOKING ***********
    // **************************************************************

    // /api/v1/clent/account/signup -- Booking and signup process
    api.get('/signup', function (req, res) {
        var _req$body = req.body,
            username = _req$body.username,
            email = _req$body.email,
            password = _req$body.password,
            password2 = _req$body.password2;
        var _req$body2 = req.body,
            postcode = _req$body2.postcode,
            bedrooms = _req$body2.bedrooms,
            bathrooms = _req$body2.bathrooms,
            extraTasks = _req$body2.extraTasks,
            hours = _req$body2.hours,
            moreHours = _req$body2.moreHours,
            priority = _req$body2.priority,
            accessType = _req$body2.accessType,
            keySafePin = _req$body2.keySafePin,
            keyHiddenPin = _req$body2.keyHiddenPin,
            schedule = _req$body2.schedule,
            dateOfFirstClean = _req$body2.dateOfFirstClean,
            fullName = _req$body2.fullName,
            mobileNumber = _req$body2.mobileNumber,
            address = _req$body2.address,
            city = _req$body2.city;


        var clientID = _bcryptjs2.default.hashSync('fullName', 10);

        req.checkBody('email', 'Email is required').notEmpty();
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('username', 'Username is required').notEmpty();
        req.checkBody('password', 'Password is required').notEmpty();
        req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

        req.checkBody('postcode', 'Postcode is required').notEmpty();
        req.checkBody('bedrooms', 'Number of Bedrooms is required').notEmpty();
        req.checkBody('bedrooms', 'Bedroom field must be a number').isNumeric();
        req.checkBody('bathrooms', 'Number of Bathrooms is required').notEmpty();
        req.checkBody('bathrooms', 'Bathroom field must be a number').isNumeric();
        req.checkBody('hours', 'Hours for cleaning is required').notEmpty();
        req.checkBody('hours', 'Hours field must be a number').isNumeric();
        if (moreHours === 'more') {
            req.checkBody('moreHours', 'Extend cleaning hours is required').notEmpty();
        }
        req.checkBody('accessType', 'Access Type field is required').notEmpty();
        if (accessType === 'keySafe') {
            req.checkBody('keySafePin', 'keySafePin field is required').notEmpty();
        }
        if (accessType === 'keyHidden') {
            req.checkBody('KeyHiddenPin', 'KeyHiddenPin field is required').notEmpty();
        }

        req.checkBody('schedule', 'Schedule field is required').notEmpty();
        req.checkBody('fullName', 'FullName field is required').notEmpty();
        req.checkBody('mobileNumber', 'Mobile Number field is required').notEmpty();
        req.checkBody('address', 'Addresss field is required').notEmpty();
        req.checkBody('city', 'City field is required').notEmpty();

        var errors = req.validationErrors();

        if (errors) {
            var _status = 400;
            var _result = {};
            var _error = errors;
            _result.status = _status;
            _result.error = _error;
            res.status(_status).send(_result);
        } else {
            var newClient = new _client2.default({
                email: email,
                username: username,
                password: password,
                clientID: clientID
            });
            var newClientDetails = new _client4.default({
                postcode: postcode,
                bedrooms: bedrooms,
                bathrooms: bathrooms,
                extraTasks: extraTasks,
                dateOfFirstClean: dateOfFirstClean,
                cleaningHours: hours,
                moreCleaningHours: moreHours,
                cleaningPriority: priority,
                apartmentAccessType: accessType,
                keyHiddenPin: keyHiddenPin,
                keySafePin: keySafePin,
                cleaningFrequency: schedule,
                mobileNumber: mobileNumber,
                address: address,
                fullName: fullName,
                city: city,
                clientID: clientID
            });

            _client2.default.createUser(newClient, function (err, user) {
                // let result = {};
                // let status = 200;
                if (err) {
                    status = 400;
                    result.status = status;
                    result.error = err;
                    res.status(status).send(result);
                }
                result.status = status;
                result.message = 'Successfullt created a new Client Account';
                res.status(status).send(result);
            });

            newClientDetails.save(function (err) {
                if (err) {
                    var _result2 = {};
                    var _status2 = 400;
                    var _error2 = err;
                    _result2.status = _status2;
                    _result2.error = _error2;
                    res.status(_status2).send(_result2);
                }
                var result = {};
                var status = 201;
                var message = 'Done adding details';
                result.status = status;
                result.message = message;
                res.status(status).send(result);
            });
        }
    });

    // '/api/v1/client/account/login'    
    api.post('/login', function (req, res) {
        var result = {};
        var status = 200;

        var _req$body3 = req.body,
            email = _req$body3.email,
            password = _req$body3.password;

        _client2.default.findOne({ email: email }, function (err, user) {
            if (!err && user) {
                // if there is no error and a user is found 
                _bcryptjs2.default.compare(password, user.password).then(function (match) {
                    if (match) {
                        status = 200;

                        // creating the user token
                        // const payload = { user: user.name};
                        var payload = { _id: user._id };

                        var options = { expiresIn: '1d', issuer: 'http://relicinnova.com.ng' };
                        var secret = config.secret;
                        var token = jwt.sign(payload, secret, options);

                        // printing the token 
                        result.token = token;
                        result.user = user;
                        result.status = status;

                        res.status(status).send(result);
                    } else {
                        status = 400;
                        result = error = 'Authentication error';
                        res.status(status).send(result);
                    }
                }).catch(function (err) {
                    status = 500;
                    result.status = status;
                    result.error = err;
                    res.status(status).send(result);
                });
            } else {
                status = 400;
                message = 'Incorrect email or password';
                result.status = status;
                result.error = err;
                result.message = message;
                res.status(status).send(result);
            }
        });
    });

    // '/api/v1/client/account/logout'    
    api.get('/logout', function (req, res) {
        req.logout();
        var result = {};
        var status = 201;
        var message = 'Successfully Logged out';
        result.status = status;
        result.message = message;
        res.status(status).send(result);
    });

    return api;
};
//# sourceMappingURL=client.account.js.map