const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');

//Bring in Cleaner Models
let Cleaner =  require('../../models/cleaner');
let CleanerDetails =  require('../../models/cleanerDetails');
let CleanerWallet = require('../../models/cleanerWallet');

router.get('/page', (req, res) =>{
    res.render('cleaner_registration')
});

//Cleaner Registration Processes
// /cleaner/register/post
router.post('/post', (req, res)=>{
    console.log('submitted');
    // Set The Storage Engine
    const storage = multer.diskStorage({
        destination: './public/uploads/',
        filename: function(req, file, cb){
          cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
      });

      function checkFileType(files, cb){
        // Allowed ext
        const filetypes = /jpeg|jpg|png|gif|pdf/;
        // Check ext
        const extname = filetypes.test(path.extname(files.originalname).toLowerCase());
        // Check mime
        const mimetype = filetypes.test(files.mimetype);

        if(mimetype && extname){
          return cb(null,true);
        } else {
          cb('Error: Images and Documents Only!');
        }
      }
    // Initialise Upload
    const upload = multer({
    storage: storage,
    limits:{fileSize: 10000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
    }).fields([{name: 'profilePic'}, {name: 'nationalID'}, {name: 'healthInsurance'}])

    upload(req, res, (err) => {
        if(err){
            console.log(err);
            return;
        } else{
            const username = req.body.username.toLowerCase();

            const email = req.body.email;
            const password = req.body.password;
            const password2 = req.body.password2;

            const postcode = req.body.postcode;
            const extraTasks = req.body.extraTasks;
            const experience = req.body.experience;
            const profile = req.body.profile;
            const fullName = req.body.fullname;
            const mobileNumber = req.body.mobilenumber;
            const address = req.body.address;
            const city = req.body.city;
            const country = req.body.country;
            const income = req.body.income;
            let cleanerID = bcrypt.hashSync('fullName', 10);
            const profilePic = req.files['profilePic'][0].filename;
            const nationalID = req.files['nationalID'][0].filename;
            const healthInsurance = req.files['healthInsurance'][0].filename;
            //const cleanerID = req.body._id;

            req.checkBody('email', 'Email is required').notEmpty();
            req.checkBody('email', 'Email is not valid').isEmail();
            req.checkBody('username', 'Username is required').notEmpty();
            req.checkBody('password', 'Password is required').notEmpty();
            req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
            req.checkBody('postcode', 'Postcode is required').notEmpty();
            req.checkBody('fullname', 'Your Full Name  is not valid').notEmpty();
            req.checkBody('mobilenumber', 'Mobile Number is required').notEmpty();
            req.checkBody('address', 'Addresss is required').notEmpty();
            req.checkBody('city', 'City is required').notEmpty();
            req.checkBody('country', 'Country is required').notEmpty();
            req.checkBody('income', 'Your desired income is required').notEmpty();
            req.checkBody('experience', 'Your years of experience is required').notEmpty();
            req.checkBody('profile', 'Your profile is required').notEmpty();
            // req.checkBody('nationalID', 'Your means of identification is required').notEmpty();
            // req.checkBody('healthInsurance', 'Your Health Insurance is required').notEmpty();

            let errors = req.validationErrors();

            if(errors){
                res.render('cleaner_registration', {
                    errors:errors
                });
            }
            else{
                let newUser = new Cleaner({
                    email:email,
                    username:username,
                    cleanerID: cleanerID,
                    password:password
                });
                let newUserDetails = new CleanerDetails({
                    postcode: postcode,
                    mobileNumber: mobileNumber,
                    extraTasks: extraTasks,
                    experience: experience,
                    profile: profile,
                    profilePic: profilePic,
                    nationalID: nationalID,
                    healthInsurance: healthInsurance,
                    address: address,
                    fullName: fullName,
                    city: city,
                    country: country,
                    income: income,
                    cleanerID: cleanerID,
                });
                let newCleanerWallet = new CleanerWallet({
                    cleanerID: cleanerID,
                    cleanerIncome: income
                })
                bcrypt.genSalt(10, (err, salt)=>{
                    bcrypt.hash(newUser.password, salt, (err, hash)=>{
                        if(err){
                            console.log(err);
                        }
                        //console.log('bcrypt stage reached');
                        newUser.password = hash;
                        newUser.save((err)=>{
                            if(err){
                                console.log(err);
                                return;
                            }else{
                                //req.flash('success', 'You are now registered and can login');
                                console.log('new user save function worked');
                                // res.redirect('/');
                            }
                        })
                    });
                });
                newUserDetails.save((err) =>{
                    if(err){
                        console.log(err);
                        return;
                    }else {
                        newCleanerWallet.save((err)=>{
                            if(err){
                                console.log(err);
                                return;
                            }else{
                                req.flash('success', 'You are now registered and can login')
                                //res.redirect('/cleaner/cleaner_dashboard');
                                res.redirect('/cleaner/login');
                                console.log('upload successful!');
                            }
                        });
                    }
                });
            }
            console.log('upload successful');

        }
      });
    console.log('form submitted');
});


module.exports = router;

