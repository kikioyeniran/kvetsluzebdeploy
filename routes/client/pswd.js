const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
//Bring in Client Models
let Client =  require('../../models/client');
// const domain = 'sandboxfdf76a99b5044d6c96c28e0971d8e9ca.mailgun.org';
// const api_key = '3896a986c536ba4c44b6278b43417c4a-2ae2c6f3-9188bee6';
const mailgun = require("mailgun-js");
const DOMAIN = 'kvetsluzeb.com';
const api_key = '3896a986c536ba4c44b6278b43417c4a-2ae2c6f3-9188bee6';
const mg = mailgun({apiKey: api_key, domain: DOMAIN, host: 'api.eu.mailgun.net'});
// var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});


router.get('/forgotpswd', (req, res) =>{
    res.render('client/forgotpswd');
});

//Forgot Password Post Process
router.post('/forgotpswd',  (req,res) =>{
    // get user based on posted email
    Client.findOne({email: req.body.email}, (err, user) =>{
        console.log(req.body.email);
        if (err) {
            res.status(404).send(err);
        }
        // generate random token

        const resetToken = user.createPasswordResetToken();
        // await user.save()
        user.save({validateBeforeSave: false})

        const resetUrl = `${req.protocol}://${req.get('host')}/client/pswd/resetpswd/${resetToken}`
        const msg = `<strong>Forgot Password?</strong> Please click this link and enter your new password: ${resetUrl}.\n If you didnt forget your password, please ignore this email!`
        var data = {
            from: 'Kvet Sluzeb (Bloom Services) <support@kvetsluzeb.com>',
            to: req.body.email,
            subject: 'Password Reset Token',
            text: msg,
            html: msg
          };
        mg.messages().send(data, function (error, body) {
            if(error){
                console.log(error)
                res.render('client/forgotpswd', {
                  clientID: user._id,
                  message: 'Please make sure you entered the right password'
              })
            }else{
              res.render('client/forgotpswd', {
                  clientID: user._id,
                  message: 'The password reset token has been sent to your mail'
              })
              console.log(body);
            }
            // console.log(body);
        });
    })
    // send it to user email

})

//Reset Password Route
router.get('/resetpswd/:token', (req, res) =>{
    res.render('client/resetpswd',{
        token: req.params.token
    })
});

router.post('/resetpswd/:token', (req, res)=>{
        var password = req.body.password;
        var password2 = req.body.password2;
        req.checkBody('password', 'Password is required').notEmpty();
        req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
        let errors = req.validationErrors();
        if(errors){
            // res.redirect('/client/pswd/resetpswd/'+req.params.token)
            res.render('client/resetpswd',{
                token: req.params.token,
                errors: errors
            });
            console.log(errors);
            return;
        }else{
            // get user based on the token
            const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
            Client.findOne({passwordResetToken: hashedToken, passwordResetExpires: {$gt: Date.now()} }, (err, user) => {
                if(err) {
                    res.status(404).send(err);
                }
                if (user == null){
                    res.render('client/forgotpswd',{
                        message: 'Your reset token has expired. Please resend the token'
                    })
                }else{
                    //console.log(user)
                    user.password = req.body.password
                    //user.password2 = req.body.password2
                    user.passwordResetToken = undefined;
                    user.passwordResetExpires = undefined;
                    bcrypt.genSalt(10, (err, salt)=>{
                        bcrypt.hash(user.password, salt, (err, hash)=>{
                            if(err){
                                console.log(err);
                            }
                            user.password = hash;
                            user.save((err)=>{
                                if(err){
                                    console.log(err);
                                }else{
                                    console.log('password change function worked');
                                    res.redirect('/client/login');
                                }
                            })
                        });
                    });
                }
            });
        }
    })

//Password Change Route
router.get('/pswdchange/:id', (req, res) =>{
    Client.findById(req.params.id, (err, client)=>{
        console.log(client);
        res.render('client/pswdchange',{
            client: client
        });
    })
});

//Password Change Process
router.post('/pswdchange/:id', (req, res) => {
    // get user from collection
    Client.findById(req.params.id, (err, user) => {
        if (err) {
            console.log(err);
            return;
        }else{
            //Check Old Password
            bcrypt.compare(req.body.passwordCurrent, user.password, (err, match) => {
                if(!match) {
                    //Passwords Do Not Match
                    res.render('client/pswdchange',{
                        message: 'Your current password is incorrect. Please try again',
                        client: user
                    })
                } else {
                    //Password Match
                    var password = req.body.password;
                    var passwordConfirm = req.body.passwordConfirm;
                    // console.log(password, passwordConfirm);
                    req.checkBody('password', 'Password is required').notEmpty();
                    req.checkBody('passwordConfirm', 'Passwords do not match').equals(req.body.password);
                    let errors = req.validationErrors();
                    console.log(errors);
                    if(errors){
                        console.log(errors);
                        res.render('client/pswdchange',{
                            errors: errors,
                            client: user
                        });
                        return;
                    }else{
                        user.password = password;
                        // user.passwordConfirm = passwordConfirm;
                        bcrypt.genSalt(10, (err, salt)=>{
                            bcrypt.hash(user.password, salt, (err, hash)=>{
                                if(err){
                                    console.log(err);
                                }
                                user.password = hash;
                                user.save((err)=>{
                                    if(err){
                                        console.log(err);
                                    }else{
                                        console.log('password change function worked');
                                        res.redirect('/client/login');
                                    }
                                })
                            });
                        });
                    }
                }
            });
        }
    })
})

module.exports = router;