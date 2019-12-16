const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const validator = require('validator');

//Cleaner schema
const CleanerSchema = mongoose.Schema({
  cleanerID: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  passwordConfirm: {
    type: String,
    // required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!'
    }
  },
  passwordResetToken: String,
  passwordResetExpires: Date
});

CleanerSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; //10mins
  return resetToken;
};
CleanerSchema.methods.correctPassword = function(
  candidatePassword,
  userPassword
) {
  bcrypt.compare(candidatePassword, userPassword, (err, match) => {
    if (match) {
      // passwords match
      // callback(null, true);
      return match;
    } else {
      // passwords do not match
      // callback('Invalid password match', null);
      return match;
    }
  });
};

const Cleaner = (module.exports = mongoose.model('cleaner', CleanerSchema));

// module.exports.createUser = (newUser, callback)=> {
//     bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(newUser.password, salt, (err, hash) =>{
//             newUser.password = hash;
//             newUser.save(callback);
//         })
//     })
// }
