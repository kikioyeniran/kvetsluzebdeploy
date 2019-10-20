const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

//Bring in cleaner models
let Cleaner =  require('../../models/cleaner');
let CleanerDetails =  require('../../models/cleanerDetails');

//Edit cleaner Details Process
router.post('/:cleanerID/:id/', (req, res) =>{
    console.log('code is here');
    let cleaner = {};
    cleaner.fullName = req.body.fullName;
    //console.log(req.body.fullName);
    cleaner.postcode = req.body.postcode;
    cleaner.city = req.body.city;
    cleaner.country = req.body.country;
    cleaner.address = req.body.address;
    cleaner.mobileNumber = req.body.mobileNumber;
    cleaner.extraTasks = req.body.extraTasks;
    cleaner.profile = req.body.profile;
    cleaner.income = req.body.income;
    let query = {cleanerID : req.params.cleanerID}
    //console.log(query);
    //console.log(req.params.cleanerID)

    CleanerDetails.updateOne(query, cleaner, (err) =>{
        if(err){
            console.log(err);
            return;
        }else {
            console.log('found and updated');
            req.flash('success', 'Account Updated');
            res.redirect('/cleaner/dashboard/home/'+req.params.id);
        }
    });
});

//Edit Profile Picture
router.post('/images/:cleanerID/:id', (req, res)=>{
    console.log('form submitted');
    const storage = multer.diskStorage({
        destination: './public/uploads/',
        filename: function(req, file, cb){
          cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
      });
      function checkFileType(files, cb){
        // Allowed ext
        const filetypes = /jpeg|jpg|png|gif/;
        // Check ext
        const extname = filetypes.test(path.extname(files.originalname).toLowerCase());
        // Check mime
        const mimetype = filetypes.test(files.mimetype);

        if(mimetype && extname){
          return cb(null,true);
        } else {
          cb('Error: Images Only!');
        }
      }
      // Initialise Upload
    const upload = multer({
        storage: storage,
        limits:{fileSize: 10000000},
        fileFilter: function(req, file, cb){
            checkFileType(file, cb);
        }
        }).single('profilePic')
        upload(req, res, (err) => {
            if(err){
                console.log(err);
            }else{
                let cleaner = {};
                cleaner.profilePic = req.file.filename;
                let query = {cleanerID : req.params.cleanerID};
                CleanerDetails.updateOne(query, cleaner, (err) =>{
                    if(err){
                        console.log(err);
                        return;
                    }else {
                        console.log('found and updated');
                        req.flash('success', 'Picture Updated');
                        res.redirect('/cleaner/dashboard/home/'+req.params.id);
                    }
                });
            }
        });
});
module.exports = router;