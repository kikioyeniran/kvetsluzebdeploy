const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
//Bring in Cleaner Models
let Cleaner = require('../../models/cleaner');
// const domain = 'sandboxfdf76a99b5044d6c96c28e0971d8e9ca.mailgun.org';
// const api_key = 'key-574b470a222d9b71a2b31386d4e4dc5d';
const mailgun = require('mailgun-js');
const DOMAIN = 'kvetsluzeb.com';
const api_key = 'key-574b470a222d9b71a2b31386d4e4dc5d';
const mg = mailgun({
  apiKey: api_key,
  domain: DOMAIN,
  host: 'api.eu.mailgun.net'
});
// var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

router.get('/forgotpswd', (req, res) => {
  res.render('cleaner/forgotpswd');
});

//Forgot Password Post Process
router.post('/forgotpswd', (req, res) => {
  // get user based on posted email
  Cleaner.findOne({ email: req.body.email }, (err, user) => {
    console.log(req.body.email);
    if (err) {
      res.status(404).send(err);
    }
    // generate random token
    var mailing = 'kikioyeniran@gmail.com';
    const resetToken = user.createPasswordResetToken();
    // await user.save()
    user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get(
      'host'
    )}/cleaner/pswd/resetpswd/${resetToken}`;
    const msg = `<strong>Forgot Password?</strong> <br />
    Please click this link and enter your new password: <br /> ${resetUrl}. <br />
    If you didn't forget your password, please ignore this email!`;
    var data = {
      from: 'Kvet Sluzeb (Bloom Services) <support@kvetsluzeb.com>',
      to: req.body.email,
      subject: 'Password Reset Token',
      text: msg,
      html: msg
    };
    mg.messages().send(data, function(error, body) {
      if (error) {
        console.log(error);
        res.render('cleaner/forgotpswd', {
          cleanerID: user._id,
          message: 'Please make sure you entered the right password'
        });
      } else {
        res.render('cleaner/forgotpswd', {
          cleanerID: user._id,
          message: 'The password reset token has been sent to your mail'
        });
        console.log(body);
      }
      // console.log(body);
    });
  });
  // send it to user email
});

//Reset Password Route
router.get('/resetpswd/:token', (req, res) => {
  res.render('cleaner/resetpswd', {
    token: req.params.token
  });
});

router.post('/resetpswd/:token', (req, res) => {
  var password = req.body.password;
  var password2 = req.body.password2;
  req.checkBody('password', 'Password is required').notEmpty();
  req
    .checkBody('password2', 'Passwords do not match')
    .equals(req.body.password);
  let errors = req.validationErrors();
  if (errors) {
    // res.redirect('/cleaner/pswd/resetpswd/'+req.params.token)
    res.render('cleaner/resetpswd', {
      token: req.params.token,
      errors: errors
    });
    console.log(errors);
    return;
  } else {
    // get user based on the token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');
    Cleaner.findOne(
      {
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
      },
      (err, user) => {
        if (err) {
          res.status(404).send(err);
        }
        if (user == null) {
          res.render('cleaner/forgotpswd', {
            message: 'Your reset token has expired. Please resend the token'
          });
        } else {
          //console.log(user)
          user.password = req.body.password;
          //user.password2 = req.body.password2
          user.passwordResetToken = undefined;
          user.passwordResetExpires = undefined;
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
              if (err) {
                console.log(err);
              }
              user.password = hash;
              user.save(err => {
                if (err) {
                  console.log(err);
                } else {
                  console.log('password change function worked');
                  res.redirect('/cleaner/login');
                }
              });
            });
          });
        }
      }
    );
  }
});

//Password Change Route
router.get('/pswdchange/:id', (req, res) => {
  Cleaner.findById(req.params.id, (err, cleaner) => {
    console.log(cleaner);
    res.render('cleaner/pswdchange', {
      cleaner: cleaner
    });
  });
});

//Password Change Process
router.post('/pswdchange/:id', (req, res) => {
  // get user from collection
  Cleaner.findById(req.params.id, (err, user) => {
    if (err) {
      console.log(err);
      return;
    } else {
      //Check Old Password
      bcrypt.compare(req.body.passwordCurrent, user.password, (err, match) => {
        if (!match) {
          //Passwords Do Not Match
          res.render('cleaner/pswdchange', {
            message: 'Your current password is incorrect. Please try again',
            cleaner: user
          });
        } else {
          //Password Match
          var password = req.body.password;
          var passwordConfirm = req.body.passwordConfirm;
          // console.log(password, passwordConfirm);
          req.checkBody('password', 'Password is required').notEmpty();
          req
            .checkBody('passwordConfirm', 'Passwords do not match')
            .equals(req.body.password);
          let errors = req.validationErrors();
          console.log(errors);
          if (errors) {
            console.log(errors);
            res.render('cleaner/pswdchange', {
              errors: errors,
              cleaner: user
            });
            return;
          } else {
            user.password = password;
            // user.passwordConfirm = passwordConfirm;
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) {
                  console.log(err);
                }
                user.password = hash;
                user.save(err => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log('password change function worked');
                    res.redirect('/cleaner/login');
                  }
                });
              });
            });
          }
        }
      });
    }
  });
});

module.exports = router;
