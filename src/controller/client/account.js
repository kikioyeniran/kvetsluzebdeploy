import { Router } from 'express';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import crypto from 'crypto';

const sendEmail  = require('../../util/email');

import Client from '../../model/client/client';
import ClientDetails from '../../model/client/clientDetails';

import Cleaner from '../../model/cleaner/cleaner';
import CleanerDetails from '../../model/cleaner/cleanerDetails';

export default ({config, db}) => {
    let api = Router();

    // **************************************************************
    // ******* CLIENT AUTHENTICATION COUPLED WITH BOOKING ***********
    // **************************************************************

    // /api/v1/clent/account/signup -- Booking and signup process
    api.post('/signup', (req, res)=>{
        const { username, email, password, password2 } = req.body;
        const { postcode, bedrooms, bathrooms, extraTasks, hours, moreHours, priority, accessType, keySafePin, keyHiddenPin, schedule, dateOfFirstClean, fullName, mobileNumber, address, city } = req.body;

        let clientID = bcrypt.hashSync('fullName', 10);

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
        if(moreHours === 'more'){
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

        let errors = req.validationErrors();

        if(errors) {
            let status = 400;
            let result = {};
            let error = errors;
            result.status = status;
            result.error = error;
            res.status(status).send(result);
        } else {
            let newClient = new Client({
                email: email,
                username: username,
                password: password,
                clientID: clientID
            });
            let newClientDetails = new ClientDetails({
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

            Client.createUser(newClient, (err, user)=>{
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

            newClientDetails.save(err=>{
                if (err) {
                    let result = {};
                    let status = 400;
                    let error = err;
                    result.status = status;
                    result.error = error;
                    res.status(status).send(result)
                } 
                const emailMessage = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

                <html xmlns="http://www.w3.org/1999/xhtml">
                <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <title>[SUBJECT]</title>
                    <style type="text/css">
                
                @media screen and (max-width: 600px) {
                    table[class="container"] {
                        width: 95% !important;
                    }
                }
                
                    #outlook a {padding:0;}
                        body{width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; margin:0; padding:0;}
                        .ExternalClass {width:100%;}
                        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%;}
                        #backgroundTable {margin:0; padding:0; width:100% !important; line-height: 100% !important;}
                        img {outline:none; text-decoration:none; -ms-interpolation-mode: bicubic;}
                        a img {border:none;}
                        .image_fix {display:block;}
                        p {margin: 1em 0;}
                        h1, h2, h3, h4, h5, h6 {color: black !important;}
                
                        h1 a, h2 a, h3 a, h4 a, h5 a, h6 a {color: blue !important;}
                
                        h1 a:active, h2 a:active,  h3 a:active, h4 a:active, h5 a:active, h6 a:active {
                            color: red !important;
                         }
                
                        h1 a:visited, h2 a:visited,  h3 a:visited, h4 a:visited, h5 a:visited, h6 a:visited {
                            color: purple !important;
                        }
                
                        table td {border-collapse: collapse;}
                
                        table { border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; }
                
                        a {color: #000;}
                
                        @media only screen and (max-device-width: 480px) {
                
                            a[href^="tel"], a[href^="sms"] {
                                        text-decoration: none;
                                        color: black; /* or whatever your want */
                                        pointer-events: none;
                                        cursor: default;
                                    }
                
                            .mobile_link a[href^="tel"], .mobile_link a[href^="sms"] {
                                        text-decoration: default;
                                        color: orange !important; /* or whatever your want */
                                        pointer-events: auto;
                                        cursor: default;
                                    }
                        }
                
                
                        @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
                            a[href^="tel"], a[href^="sms"] {
                                        text-decoration: none;
                                        color: blue; /* or whatever your want */
                                        pointer-events: none;
                                        cursor: default;
                                    }
                
                            .mobile_link a[href^="tel"], .mobile_link a[href^="sms"] {
                                        text-decoration: default;
                                        color: orange !important;
                                        pointer-events: auto;
                                        cursor: default;
                                    }
                        }
                
                        @media only screen and (-webkit-min-device-pixel-ratio: 2) {
                            /* Put your iPhone 4g styles in here */
                        }
                
                        @media only screen and (-webkit-device-pixel-ratio:.75){
                            /* Put CSS for low density (ldpi) Android layouts in here */
                        }
                        @media only screen and (-webkit-device-pixel-ratio:1){
                            /* Put CSS for medium density (mdpi) Android layouts in here */
                        }
                        @media only screen and (-webkit-device-pixel-ratio:1.5){
                            /* Put CSS for high density (hdpi) Android layouts in here */
                        }
                        /* end Android targeting */
                        h2{
                            color:#181818;
                            font-family:Helvetica, Arial, sans-serif;
                            font-size:22px;
                            line-height: 22px;
                            font-weight: normal;
                        }
                        a.link1{
                
                        }
                        a.link2{
                            color:#fff;
                            text-decoration:none;
                            font-family:Helvetica, Arial, sans-serif;
                            font-size:16px;
                            color:#fff;border-radius:4px;
                        }
                        p{
                            color:#555;
                            font-family:Helvetica, Arial, sans-serif;
                            font-size:16px;
                            line-height:160%;
                        }
                    </style>
                
                <script type="colorScheme" class="swatch active">
                  {
                    "name":"Default",
                    "bgBody":"ffffff",
                    "link":"fff",
                    "color":"555555",
                    "bgItem":"ffffff",
                    "title":"181818"
                  }
                </script>
                
                </head>
                <body>
                    <!-- Wrapper/Container Table: Use a wrapper table to control the width and the background color consistently of your email. Use this approach instead of setting attributes on the body tag. -->
                    <table cellpadding="0" width="100%" cellspacing="0" border="0" id="backgroundTable" class='bgBody'>
                    <tr>
                        <td>
                    <table cellpadding="0" width="620" class="container" align="center" cellspacing="0" border="0">
                    <tr>
                        <td>
                        <!-- Tables are the most common way to format your email consistently. Set your table widths inside cells and in most cases reset cellpadding, cellspacing, and border to zero. Use nested tables as a way to space effectively in your message. -->
                
                
                        <table cellpadding="0" cellspacing="0" border="0" align="center" width="600" class="container">
                            <tr>
                                <td class='movableContentContainer bgItem'>
                
                                    <div class='movableContent'>
                                        <table cellpadding="0" cellspacing="0" border="0" align="center" width="600" class="container">
                                            <tr height="40">
                                                <td width="200">&nbsp;</td>
                                                <td width="200">&nbsp;</td>
                                                <td width="200">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td width="200" valign="top">&nbsp;</td>
                                                <td width="200" valign="top" align="center">
                                                    <div class="contentEditableContainer contentImageEditable">
                                                        <div class="contentEditable" align='center' >
                
                                                        </div>
                                                      </div>
                                                </td>
                                                <td width="200" valign="top">&nbsp;</td>
                                            </tr>
                                            <tr height="25">
                                                <td width="200">&nbsp;</td>
                                                <td width="200">&nbsp;</td>
                                                <td width="200">&nbsp;</td>
                                            </tr>
                                        </table>
                                    </div>
                
                                    <div class='movableContent'>
                                        <table cellpadding="0" cellspacing="0" border="0" align="center" width="600" class="container">
                                            <tr>
                                                <td width="100">&nbsp;</td>
                                                <td width="400" align="center">
                                                    <div class="contentEditableContainer contentTextEditable">
                                                        <div class="contentEditable" align='left' >
                                                              <p style="text-align: justify;">Hi {Variable},<br/><br/>
                                                                          You have successfully signed up for kvetsluzeb 
                                                                          
                                                </p>
                                                        </div>
                                                      </div>
                                                </td>
                                                <td width="100">&nbsp;</td>
                                            </tr>
                                        </table>
                                        <table cellpadding="0" cellspacing="0" border="0" align="center" width="600" class="container">
                                            <tr>
                                                <td width="200">&nbsp;</td>
                                                <td width="200" align="center" style="padding-top:25px;">
                                                    <table cellpadding="0" cellspacing="0" border="0" align="center" width="200" height="50">
                                                        <tr>
                                                            <td bgcolor="#19a845" align="center" style="border-radius:50px;" width="200" height="50">
                                                                <div class="contentEditableContainer contentTextEditable">
                                                                    <div class="contentEditable" align='center' >
                                                                          <a target='_blank' href="<%= link %>" class='link2'>View Dashboard.</a>
                                                                    </div>
                                                                  </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td width="200">&nbsp;</td>
                                            </tr>
                                        </table>
                                    </div>
                
                
                                    <div class='movableContent'>
                                            <table cellpadding="0" cellspacing="0" border="0" align="center" width="600" class="container">
                                                <tr>
                                                    <td width="100%" colspan="2" style="padding-top:65px;">
                                                        <hr style="height:1px;border:none;color:#333;background-color:#ddd;" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="60%" height="70" valign="middle" style="padding-bottom:20px;">
                                                        <div class="contentEditableContainer contentTextEditable">
                                                <div class="contentEditable" align='center'>
                                                    <span style="font-size:11px;color:#181818;font-family:Helvetica, Arial, sans-serif;line-height:150%;">
                                                        
                                                    </span>
                                                    <br/>
                                                </div>
                                                
                                                <div class="contentEditable" align='center'>
                
                                                </div>
                                             </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                
                
                                </td>
                            </tr>
                        </table>
                
                
                
                
                    </td></tr></table>
                
                        </td>
                    </tr>
                    </table>
                    <!-- End of wrapper table -->
                
                </body>
                </html>`  ;
                const sendEmail = ({
                    email: user.email,
                    subject: 'Welcome to Kvet sluzeb',
                    message: emailMessage
                })
                res.status(200).json({
                    status: 'success',
                    message: 'Token sent to mail'
                })
                let result = {};
                let status = 201;
                let message = 'Done adding details';
                result.status = status;
                result.message = message;
                res.status(status).send(result);
        })
        }
    });

    // '/api/v1/client/account/login'    
    api.post('/login', (req, res)=>{
        let result  = {};
        let status  = 200;

        const {email, password}  = req.body;
        Client.findOne({email}, (err, user)=>{
            if(!err && user) {
                // if there is no error and a user is found 
                bcrypt.compare(password, user.password).then(match => {
                    if (match) {
                        status = 200;

                        // creating the user token
                        // const payload = { user: user.name};
                        const payload = { _id:  user._id}

                        const options = {expiresIn: '1d', issuer: 'http://relicinnova.com.ng'};
                        const secret = config.secret;
                        const token = jwt.sign(payload, secret, options);

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
                }).catch( err=> {
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
        })
    });

    // '/api/v1/client/account/logout'    
    api.get('/logout', (req, res)=>{
        req.logout();
        let result = {};
        let status = 201;
        let message = 'Successfully Logged out';
        result.status = status;
        result.message = message;
        res.status(status).send(result);
    });


    api.post('/forgotPassword',  (req,res) =>{
        // get user baed on posted email
        Client.findOne({email: req.body.email}, (err, user) =>{
            if (err) {
                res.status(404).send(err);
            }
            // generate random token 

            const resetToken = user.createPasswordResetToken();
            // await user.save()
            user.save({validateBeforeSave: false})

            const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/client/account/resetPassword/${resetToken}`
            const message = `Forgot Password? Submit a PATCH request with your new Password and passwordConfirn to: ${resetUrl}.\n IF you didnt forget your password, please ignore this email!`
            try {
                const sendEmail = ({
                    email: user.email,
                    subject: 'Password Reset Link (Valid for 10Mins)',
                    message: message
                })
                res.status(200).json({
                    status: 'success',
                    message: 'Token sent to mail'
                })
            } catch(err) {
                user.passwordResetToken = undefined;
                user.passwordResetExpires = undefined;

                user.save({validateBeforeSave: false})

                console.log(err);
                

            }
            
            

            

            

        })


        // send it to user email
    })

    api.patch('/resetPassword/:token', (req, res)=>{

        // get user based on the token
        const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

        // const user =
         Client.findOne({passwordResetToken: hashedToken, passwordResetExpires: {$gt: Date.now()} }, (err, user) => {
             if(err) {
                 res.status(404).send(err);
             }

             user.password = req.body.password
             user.password2 = req.body.password2
             user.passwordResetToken = undefined;
             user.passwordResetExpires = undefined;

             user.save(err => {
                 if(err) {
                     res.status(200).send(err);
                 }
                 res.status(201).json({
                     message: 'Successful'
                 })
             })

            //  Redirect the user to login

         });






        // if token has not expired and user exists we set the new password

        
    })
    


    return api;
}