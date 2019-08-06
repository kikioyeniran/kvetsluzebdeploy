const express = require('express');
const router = express.Router();

//Bring in cleaner models
let Cleaner =  require('../../models/cleaner');
let CleanerDetails =  require('../../models/cleaner_details');

//Edit cleaner Details Process
router.post('/:cleanerID/:id/', (req, res) =>{
    console.log('code is here');
    let cleaner = {};
    cleaner.full_name = req.body.fullName;
    //console.log(req.body.fullName);
    cleaner.postcode = req.body.postcode;
    cleaner.city = req.body.city;
    cleaner.address = req.body.address;
    cleaner.mobile_number = req.body.mobileNumber;
    cleaner.extra_tasks = req.body.extra_tasks;
    cleaner.profile = req.body.profile;
    cleaner.income = req.body.income;
    let query = {cleaner_id : req.params.cleanerID}
    console.log(query);
    console.log(req.params.cleanerID)

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