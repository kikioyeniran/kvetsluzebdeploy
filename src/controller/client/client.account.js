import { Router } from 'express';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';



import Client from '../../model/client/client';
import ClientDetails from '../../model/client/client.details';

import Cleaner from '../../model/cleaner/cleaner';
import CleanerDetails from '../../model/cleaner/cleaner.details';

export default ({config, db}) => {
    let api = Router();

    // **************************************************************
    // ******* CLIENT AUTHENTICATION COUPLED WITH BOOKING ***********
    // **************************************************************

    // /api/v1/clent/account/signup -- Booking and signup process
    api.get('/signup', (req, res)=>{
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

    


    return api;
}