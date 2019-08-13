const express = require('express');
const router = express.Router();

//Bring in cleaner models
let Cleaner =  require('../models/cleaner');
let CleanerDetails =  require('../models/cleanerDetails');
//Client Model
let ClientDetails = require('../models/clientDetails');

//Edit Client Rating Process
router.post('/client/:clientID/:cleanerID/', (req, res) =>{
    console.log('code is here');
    let client = {};
    client.rating = req.body.rating;
    let query = {clientID : req.params.clientID}
    //console.log(query);
    //console.log(req.params.cleanerID)

    ClientDetails.updateOne(query, client, (err) =>{
        if(err){
            console.log(err);
            return;
        }else {
            console.log('rating updated');
            //req.flash('success', 'Account Updated');
            res.redirect('/cleaner/dashboard/cleaner_calendar/'+req.params.cleanerID);
        }
    });
});

//Edit Cleaner Rating Process
router.post('/cleaner/:clientID/:cleanerID/', (req, res) =>{
    //console.log('code is here');
    let cleaner = {};
    cleaner.rating = req.body.rating;
    let query = {cleanerID : req.params.cleanerID}
    //console.log(query);
    //console.log(req.params.cleanerID)

    CleanerDetails.updateOne(query, cleaner, (err) =>{
        if(err){
            console.log(err);
            return;
        }else {
            console.log(' cleaner rating updated');
            //req.flash('success', 'Account Updated');
            res.redirect('/cleaner/dashboard/client_finance/'+req.params.clientID);
        }
    });
});

module.exports = router;