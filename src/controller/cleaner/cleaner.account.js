import mongoose from 'mongoose';
import { Router } from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import path from 'path';

// destructuring the validate token method
import { validateToken } from '../../utils';

// importing the models 
import Cleaner from '../../model/cleaner/cleaner';
import CleanerDetails from '../../model/cleaner/cleaner.details';


export default ({config, db}) => {
    let api = Router();

    // ******************************************
    // ******* CLEANER AUTHENTICATION ***********
    // ******************************************

    // '/api/v1/account/cleaner/signup'
    api.post('/signup',  (req, res)=>{
        // Setting the  Storage engine

        const storage = multer.diskStorage({
            destination: './public/uploads/',
            filename: (req, file, cb) => {
                cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
            }
        });

        const checkFileType = (files, cb) => {
            
            // allowed file extensions
            const fileTypes = /jpeg|jpg|png|gif|pdf/;
            
            // checking file extensions 
            const extname = fileTypes.test(path.extname(files.originalname).toLocaleLowerCase());

            // checking mime 
            const mimeType = fileTypes.test(files.mimeType);

            if(mimeType && extname) {
                return cb(null, true);
            } else {
                cb('Error: Images and Documents only')
            }
        }

        // Initialise Upload
        const upload = multer({
            storage: storage,
            limits: {fileSize: 10000000},
            fileFilter: (req, file, cb) =>{
                checkFileType(file, cb);
            }
        }).fields([{name: 'profilePic'}, {name: 'nationalId'}, {name: 'healthInsurance'}])
        
        // TODO: check if this code is running well because of the (err) part
        upload(req, res, (err)=>{
            if (err) {
                let result = {};
                let status = 400;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
                console.log(err);
                
            } else {
                const {email, password, password2, postcode, extraTasks, experience, profile, fullName, mobileNumber, address, city, income } = req.body;
                const cleanerId = bcrypt.hashSync('fullName', 10);
                const profilePic = req.files['profilePic'][0].filename;
                const nationalId = req.files['nationalId'][0].filename;
                const healthInsurance = req.files['healthInsurance'][0].filename;

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

                let errors = req.validationErrors();
                let status = 200;
                let result = {};

                if (errors) {
                    status = 400;
                    result.error  = errors;
                    result.status = status;
                    res.status(status).send(result);
                } else {
                    let newUser =  new Cleaner({
                        email: email,
                        cleanerId: cleanerId,
                        password: password
                    });

                    let newCleanerDetails = new CleanerDetails ({
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

                    Cleaner.createUser(newUser, (err, user)=>{
                        // let result = {};
                        // let status = 200;
                        if (err) {
                            status = 400;
                            result.status = status;
                            result.error = err;
                            res.status(status).send(result);
                        }
                        result.status = status;
                        result.message = 'Successfullt created a new Cleaner Account';
                        res.status(status).send(result);
                    });

                    newCleanerDetails.save( err =>{
                        if (err) {
                            status = 400;
                            result.status = status;
                            result.error = err;
                            res.send(status).send(result)
                        }

                    });
                }
                res.json({'message': 'Upload Successfull'})
            }
        })
    });


    // '/api/v1/cleaner/account/login'        
    api.post('/login', (req, res)=>{
        let result  = {};
        let status  = 200;

        const {email, password}  = req.body;
        Cleaner.findOne({email}, (err, user)=>{
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

    
    // '/api/v1/account/cleaner/logout'
    api.get('/logout', (req, res)=>{
        req.logout();
        let result = {};
        let status = 201;
        result.status = status;
        result.message = 'Successfully logged out';
        res.status(status).send(result);
    });


    return api;
}
