'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _utils = require('../../utils');

var _cleaner = require('../../model/cleaner/cleaner');

var _cleaner2 = _interopRequireDefault(_cleaner);

var _cleaner3 = require('../../model/cleaner/cleaner.details');

var _cleaner4 = _interopRequireDefault(_cleaner3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// importing the models 
exports.default = function (_ref) {
    var config = _ref.config,
        db = _ref.db;

    var api = (0, _express.Router)();

    // ******************************************
    // ******* CLEANER AUTHENTICATION ***********
    // ******************************************

    // '/api/v1/account/cleaner/signup'
    api.post('/signup', function (req, res) {
        // Setting the  Storage engine

        var storage = _multer2.default.diskStorage({
            destination: './public/uploads/',
            filename: function filename(req, file, cb) {
                cb(null, file.fieldname + '-' + Date.now() + _path2.default.extname(file.originalname));
            }
        });

        var checkFileType = function checkFileType(files, cb) {

            // allowed file extensions
            var fileTypes = /jpeg|jpg|png|gif|pdf/;

            // checking file extensions 
            var extname = fileTypes.test(_path2.default.extname(files.originalname).toLocaleLowerCase());

            // checking mime 
            var mimeType = fileTypes.test(files.mimeType);

            if (mimeType && extname) {
                return cb(null, true);
            } else {
                cb('Error: Images and Documents only');
            }
        };

        // Initialise Upload
        var upload = (0, _multer2.default)({
            storage: storage,
            limits: { fileSize: 10000000 },
            fileFilter: function fileFilter(req, file, cb) {
                checkFileType(file, cb);
            }
        }).fields([{ name: 'profilePic' }, { name: 'nationalId' }, { name: 'healthInsurance' }]);

        // TODO: check if this code is running well because of the (err) part
        upload(req, res, function (err) {
            if (err) {
                var result = {};
                var status = 400;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
                console.log(err);
            } else {
                var _req$body = req.body,
                    email = _req$body.email,
                    password = _req$body.password,
                    password2 = _req$body.password2,
                    postcode = _req$body.postcode,
                    extraTasks = _req$body.extraTasks,
                    experience = _req$body.experience,
                    profile = _req$body.profile,
                    fullName = _req$body.fullName,
                    mobileNumber = _req$body.mobileNumber,
                    address = _req$body.address,
                    city = _req$body.city,
                    income = _req$body.income;

                var cleanerId = _bcryptjs2.default.hashSync('fullName', 10);
                var profilePic = req.files['profilePic'][0].filename;
                var nationalId = req.files['nationalId'][0].filename;
                var healthInsurance = req.files['healthInsurance'][0].filename;

                req.checkBody('email', 'Email is required').notEmpty();
                req.checkBody('email', 'Email is not valid').isEmail();
                req.checkBody('password', 'Password is required').notEmpty();
                req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
                req.checkBody('postcode', 'Postcode is required').notEmpty();
                req.checkBody('fullName', 'Full Name is required').notEmpty();
                req.checkBody('mobileNumber', 'Mobile Number is required').notEmpty();
                req.checkBody('address', 'Address is required').notEmpty();
                req.checkBody('city', 'City is required').notEmpty();
                req.checkBody('income', 'Your desired income is required').notEmpty();
                req.checkBody('experience', 'Your years of experience is required').notEmpty();
                req.checkBody('profile', 'Your profile is required').notEmpty();

                var errors = req.validationErrors();
                var _status = 200;
                var _result = {};

                if (errors) {
                    _status = 400;
                    _result.error = errors;
                    _result.status = _status;
                    res.status(_status).send(_result);
                } else {
                    var newUser = new _cleaner2.default({
                        email: email,
                        cleanerId: cleanerId,
                        password: password
                    });

                    var newCleanerDetails = new _cleaner4.default({
                        postcode: postcode,
                        mobileNumber: mobileNumber,
                        extraTasks: extraTasks,
                        experience: experience,
                        profile: profile,
                        profilePic: profilePic,
                        nationalId: nationalId,
                        healthInsurance: healthInsurance,
                        address: address,
                        fullName: fullName,
                        city: city,
                        income: income,
                        cleanerId: cleanerId
                    });

                    _cleaner2.default.createUser(newUser, function (err, user) {
                        // let result = {};
                        // let status = 200;
                        if (err) {
                            _status = 400;
                            _result.status = _status;
                            _result.error = err;
                            res.status(_status).send(_result);
                        }
                        _result.status = _status;
                        _result.message = 'Successfullt created a new Cleaner Account';
                        res.status(_status).send(_result);
                    });

                    newCleanerDetails.save(function (err) {
                        if (err) {
                            _status = 400;
                            _result.status = _status;
                            _result.error = err;
                            res.send(_status).send(_result);
                        }
                    });
                }
                res.json({ 'message': 'Upload Successfull' });
            }
        });
    });

    // '/api/v1/cleaner/account/login'        
    api.post('/login', function (req, res) {
        var result = {};
        var status = 200;

        var _req$body2 = req.body,
            email = _req$body2.email,
            password = _req$body2.password;

        _cleaner2.default.findOne({ email: email }, function (err, user) {
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
                        var token = _jsonwebtoken2.default.sign(payload, secret, options);

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

    // '/api/v1/account/cleaner/logout'
    api.get('/logout', function (req, res) {
        req.logout();
        var result = {};
        var status = 201;
        result.status = status;
        result.message = 'Successfully logged out';
        res.status(status).send(result);
    });

    return api;
};

// destructuring the validate token method
//# sourceMappingURL=cleaner.account.js.map