const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local')
const multer = require('multer');
const path = require('path');

//Bring in Cleaner Models
let Cleaner =  require('../models/cleaner');
let CleanerDetails =  require('../models/cleaner_details');


//cleaner registration route
router.get('/cleaner_registration', (req, res) =>{
    res.render('cleaner_registration')
});

//Cleaner Login route
router.get('/cleaner_login', (req, res) =>{
    res.render('admin/cleaner_login')
});

router.get('/admin/cleaner_dashboard/:id', (req, res) =>{
    Cleaner.findById(req.params.id, (err, cleaner) =>{
        console.log(cleaner)
        var query = {cleaner_id: cleaner.cleanerid};
        CleanerDetails.find((query), (err, cleaner_details)=>{
            //console.log(cleaner_details[0].full_name);
            res.render('admin/cleaner_dashboard',{
                cleaner: cleaner,
                cleanerDetails: cleaner_details[0]
            });
        });
    });
});

//Cleaner Finance Page route
router.get('/admin/cleaner_finance', (req, res) =>{
    res.render('admin/cleaner_finance')
});
//Cleaner Finance Page route
router.get('/admin/cleaner_invoice', (req, res) =>{
    res.render('admin/cleaner_invoice')
});
//Cleaner Calendar Page route
router.get('/admin/cleaner_calendar', (req, res) =>{
    res.render('admin/cleaner_calendar')
});
//Cleaner FAQs Page route
router.get('/admin/cleaner_faq', (req, res) =>{
    res.render('admin/cleaner_faq')
});

//Cleaner Registration Processes
router.post('/cleaner_registration', (req, res)=>{
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
    }).fields([{name: 'profile_pic'}, {name: 'national_id'}, {name: 'health_insurance'}])

    upload(req, res, (err) => {
        if(err){
            console.log(err);
            return;
        } else{
            const username = req.body.username.toLowerCase;
            const email = req.body.email;
            const password = req.body.password;
            const password2 = req.body.password2;

            const postcode = req.body.postcode;
            const extra_tasks = req.body.extra_tasks;
            const experience = req.body.experience;
            const profile = req.body.profile;
            const fullName = req.body.fullname;
            const mobileNumber = req.body.mobilenumber;
            const address = req.body.address;
            const city = req.body.city;
            const income = req.body.income;
            const cleaner_id = bcrypt.hashSync('fullName', 10);
            const profile_pic = req.files['profile_pic'][0].filename;
            const national_id = req.files['national_id'][0].filename;
            const health_insurance = req.files['health_insurance'][0].filename;
            //const cleaner_id = req.body._id;

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
            req.checkBody('income', 'Your desired income is required').notEmpty();
            req.checkBody('experience', 'Your years of experience is required').notEmpty();
            req.checkBody('profile', 'Your profile is required').notEmpty();
            // req.checkBody('national_id', 'Your means of identification is required').notEmpty();
            // req.checkBody('health_insurance', 'Your Health Insurance is required').notEmpty();

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
                    cleanerid: cleaner_id,
                    password:password
                });
                let newUserDetails = new CleanerDetails({
                    postcode: postcode,
                    mobile_number: mobileNumber,
                    extra_tasks: extra_tasks,
                    experience: experience,
                    profile: profile,
                    profile_pic: profile_pic,
                    national_id: national_id,
                    health_insurance: health_insurance,
                    address: address,
                    full_name: fullName,
                    city: city,
                    income: income,
                    cleaner_id: cleaner_id,
                });
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
                                req.flash('success', 'You are now registered and can login');
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
                        req.flash('success', 'Cleaner added')
                        //res.redirect('/cleaner/cleaner_dashboard');
                        res.redirect('/cleaner/cleaner_login');
                        console.log('upload successful!');
                    }
                });
            }
            console.log('upload successful');

        }
      });
    console.log('form submitted');
});


router.post('/cleaner_login',
  passport.authenticate('cleaner', { failureRedirect: '/cleaner/cleaner_login', failureFlash: true  }),
  function(req, res) {
    res.redirect('/cleaner/admin/cleaner_dashboard/'+req.user.id);
  });

//Logout
router.get('/cleaner_logout', (req, res)=>{
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/cleaner/cleaner_login')
});

//Access Control
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        console.log('authenticated');
        return next();
    } else{
        console.log('not authenticated');
        req.flash('danger', 'Please Login');
        res.redirect('/cleaner/cleaner_login');
    }
}
module.exports = router;