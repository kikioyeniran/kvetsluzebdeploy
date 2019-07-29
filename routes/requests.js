const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
//Models
let Request =  require('../models/requests');

router.get('/test', (req, res) =>{
    res.send('Hello');
});


router.get('/booking_final', (req, res) =>{
    res.render('admin/client_login');
});

router.post('/booking_final', (req, res)=>{
    console.log('form submitted');
    const clientID = req.body.clientID;
    const clientName = req.body.clientName;
    const clientPhone = req.body.clientPhone;
    const clientEmail = req.body.clientEmail;
    const extraTasks = req.body.extaTasks;
    const hours = req.body.hours;
    const moreHours = req.body.moreHours;
    const priority = req.body.priority;
    const accessType = req.body.accessType;
    const keyHiddenPin = req.body.keyHiddenPin;
    const keySafePin = req.body.keySafePin;
    const frequency = req.body.frequency;
    const dateFirstClean = req.body.dateFirstClean;
    const postcode = req.body.postcode;
    const address = req.body.address;
    const city = req.body.city;
    const selectedCleaner0 = req.body.selectedCleaner0;
    const selectedCleaner1 = req.body.selectedCleaner1;
    const selectedCleaner2 = req.body.selectedCleaner2;
    const selectedCleanerID0 = req.body.selectedCleanerID0;
    const selectedCleanerID1 = req.body.selectedCleanerID1;
    const selectedCleanerID2 = req.body.selectedCleanerID2;
    const selectedCleaners = [selectedCleaner0, selectedCleaner1, selectedCleaner2];
    const selectedCleanerIDs = [selectedCleanerID0, selectedCleanerID1, selectedCleanerID2];
    const status = false;

    console.log(clientID);
    console.log(selectedCleaners);
    console.log(selectedCleanerIDs);
    req.checkBody('clientID', 'clientID is required').notEmpty();
    req.checkBody('clientName', 'clientName is required').notEmpty();
    req.checkBody('clientPhone', 'clientPhone is required').notEmpty();
    req.checkBody('clientEmail', 'clientEmail is required').notEmpty();
    req.checkBody('extraTasks', 'extraTasks is required').notEmpty();
    req.checkBody('hours', 'Cleaning hours is required').notEmpty();
    req.checkBody('accessType', 'Apartment access type is required').notEmpty();
    req.checkBody('frequency', 'Cleaning frequency is required').notEmpty();
    req.checkBody('dateFirstClean', 'Date of First Clean is required').notEmpty();
    req.checkBody('postcode', 'Postcode is required').notEmpty();
    req.checkBody('address', 'address is required').notEmpty();
    req.checkBody('city', 'City is required').notEmpty();
    //req.checkBody('selectedCleaners', 'Cleaners must be selected').notEmpty();

    let errors = req.validationErrors();

    if(errors){
        // res.render('client/booking_final/'+clientID, {
        //     errors:errors
        // });
        console.log(errors);
    }
    else{
        let newUser = new Request({
            clientID: clientID,
            clientName: clientName,
            clientEmail: clientEmail,
            clientPhone: clientPhone,
            extraTasks: extraTasks,
            hours: hours,
            moreHours: moreHours,
            address: address,
            city: city,
            postcode: postcode,
            keySafePin: keySafePin,
            keyHiddenPin: keyHiddenPin,
            frequency: frequency,
            priority: priority,
            accessType: accessType,
            dateFirstClean: dateFirstClean,
            selectedCleaners: selectedCleaners,
            selectedCleanerIDs: selectedCleanerIDs,
            status: status
        });

        newUser.save((err) =>{
            if(err){
                console.log(err);
                return;
            }else {
                req.flash('success', 'Request completed');
                res.redirect('/client/client_login');
            }
        });
    }
});
module.exports = router;