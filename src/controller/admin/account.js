import { Router } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import Admin from '../../model/admin/admin';

export default ({config, db}) => {
    let api = Router();

    //Register Processes
    api.post('/signup', (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;

    req.checkBody('username', 'username is required').notEmpty();
    //req.checkBody('username', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    let errors = req.validationErrors();

    if(errors){
        let status = 400;
        let result = {};
        let error = errors;
        result.status = status;
        result.error = error;
        res.status(status).send(result);
    }else{
        let newUser = new Admin({
            username:username,
            password:password
        });
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if(err){
                console.log(err);
            }
            newUser.password = hash;
            newUser.save((err)=>{
                if(err){
                    console.log(err);
                    return;
                }else{
                    req.flash('success', 'You are now registered and can login');
                    res.redirect('/admin/login');
                }
            })
        });
    });
    }
});

    // '/api/v1/account/admin/login'        
    api.post('/login', (req, res)=>{
        let result  = {};
        let status  = 200;

        const {email, password}  = req.body;
        Admin.findOne({email}, (err, user)=>{
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

    // '/api/v1/account/admin/logout'        
    api.get('/logout', (req, res)=>{
        req.logout();
        let result = {};
        let status = 201;
        result.status = status;
        result.message = 'Successfully logged out';
        res.status(status).send(result);
    })

    return api;

}