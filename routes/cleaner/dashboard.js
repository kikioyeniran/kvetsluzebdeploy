const express = require('express');
const router = express.Router();

//Bring in Cleaner Models
// let Cleaner =  require('/projects/kvetsluzeb/models/cleaner')
// let CleanerDetails =  require('/projects/kvetsluzeb/models/cleaner_details');

let Cleaner = require('../../models/cleaner');
let CleanerDetails = require('../../models/cleaner_details');

//Cleaner dashboard route
router.get('/home/:id', (req, res) =>{
    Cleaner.findById(req.params.id, (err, cleaner) =>{
        //console.log(cleaner)
        var query = {cleaner_id: cleaner.cleanerid};
        CleanerDetails.find((query), (err, cleaner_details)=>{
            //console.log(cleaner_details[0].full_name);
            res.render('cleaner/cleaner_dashboard',{
                cleaner: cleaner,
                cleanerDetails: cleaner_details[0]
            });
        });
    });
});

//Cleaner Finance Page route
router.get('/cleaner_finance/:id', (req, res) =>{
    Cleaner.findById(req.params.id, (err, cleaner) =>{
        console.log(cleaner)
        var query = {cleaner_id: cleaner.cleanerid};
        CleanerDetails.find((query), (err, cleaner_details)=>{
            //console.log(cleaner_details[0].full_name);
            res.render('cleaner/cleaner_finance',{
                cleaner: cleaner,
                cleanerDetails: cleaner_details[0]
            });
        });
    });
});
//Cleaner Invoice Page route
router.get('/cleaner_invoice/:id', (req, res) =>{
    Cleaner.findById(req.params.id, (err, cleaner) =>{
        console.log(cleaner)
        var query = {cleaner_id: cleaner.cleanerid};
        CleanerDetails.find((query), (err, cleaner_details)=>{
            //console.log(cleaner_details[0].full_name);
            res.render('cleaner/cleaner_invoice',{
                cleaner: cleaner,
                cleanerDetails: cleaner_details[0]
            });
        });
    });
});

//Cleaner Requests Page route
router.get('/cleaner_requests/:id', (req, res) =>{
    Cleaner.findById(req.params.id, (err, cleaner) =>{
        console.log(cleaner)
        var query = {cleaner_id: cleaner.cleanerid};
        CleanerDetails.find((query), (err, cleaner_details)=>{
            //console.log(cleaner_details[0].full_name);
            res.render('cleaner/cleaner_requests',{
                cleaner: cleaner,
                cleanerDetails: cleaner_details[0]
            });
        });
    });
});

//Cleaner Calendar Page route
router.get('/cleaner_calendar/:id', (req, res) =>{
    Cleaner.findById(req.params.id, (err, cleaner) =>{
        console.log(cleaner)
        var query = {cleaner_id: cleaner.cleanerid};
        CleanerDetails.find((query), (err, cleaner_details)=>{
            //console.log(cleaner_details[0].full_name);
            res.render('cleaner/cleaner_calendar',{
                cleaner: cleaner,
                cleanerDetails: cleaner_details[0]
            });
        });
    });
});
//Cleaner FAQs Page route
router.get('/cleaner_faq/:id', (req, res) =>{
    Cleaner.findById(req.params.id, (err, cleaner) =>{
        console.log(cleaner)
        var query = {cleaner_id: cleaner.cleanerid};
        CleanerDetails.find((query), (err, cleaner_details)=>{
            //console.log(cleaner_details[0].full_name);
            res.render('cleaner/cleaner_faq',{
                cleaner: cleaner,
                cleanerDetails: cleaner_details[0]
            });
        });
    });
});

module.exports = router;