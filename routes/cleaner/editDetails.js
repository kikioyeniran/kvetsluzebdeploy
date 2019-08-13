const express = require('express');
const router = express.Router();

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

module.exports = router;