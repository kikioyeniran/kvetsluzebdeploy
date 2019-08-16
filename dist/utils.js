'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
    validateToken: function validateToken(req, res, next) {
        var authorizationHeader = req.headers.authorization;
        var result = void 0;
        if (authorizationHeader) {
            var token = req.headers.authorization.split(' ')[1];
            var options = {
                expiresIn: '1d',
                issuer: 'http://relicinnova.com.ng'
            };

            try {
                // verifying to make sure that the token hasnt expired and has been issued by us
                result = _jsonwebtoken2.default.verify(token, _config2.default.secret, options);

                // passing the decoded token to the request object
                req.decoded = result;

                // calling next to pass execution to subsequent middleware 
                next();
            } catch (err) {
                // throwing an error object just in case anything goes wrong 
                throw new Error(err);
            }
        } else {
            result = {
                error: 'Authentication error. Token required.',
                status: 401
            };
            res.status(401).send(result);
        }
    }
};
//# sourceMappingURL=utils.js.map