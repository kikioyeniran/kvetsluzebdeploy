const express = require('express');
const router = express.Router();
var empty = require('is-empty');
const date = require('date-and-time');

//Bring in Cleaner Models
// let Cleaner =  require('/projects/kvetsluzeb/models/cleaner')
// let ClientDetails =  require('/projects/kvetsluzeb/models/cleaner_details');

let Cleaner = require('../../models/cleaner');
let CleanerDetails = require('../../models/cleaner_details');
let ClientDetails = require('../../models/client_details');
let Requests = require('../../models/requests');
let CleaningSchedule = require('../../models/cleaningSchedule');


//Cleaner dashboard route
router.get('/home/:id', (req, res) =>{
    Cleaner.findById(req.params.id, (err, cleaner) =>{
        //console.log(cleaner)
        var query = {cleanerID: cleaner.cleanerID};
        CleanerDetails.find((query), (err, cleaner_details)=>{
            //console.log(cleaner_details[0].fullName);
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
        var query = {cleanerID: cleaner.cleanerID};
        CleanerDetails.find((query), (err, cleaner_details)=>{
            //console.log(cleaner_details[0].fullName);
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
        var query = {cleanerID: cleaner.cleanerID};
        CleanerDetails.find((query), (err, cleaner_details)=>{
            //console.log(cleaner_details[0].fullName);
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
        //console.log(cleaner)
        var query = {cleanerID: cleaner.cleanerID};
        CleanerDetails.find((query), (err, cleaner_details)=>{
            var secondQuery = {selectedcleanerIDs: cleaner.cleanerID};
            console.log(secondQuery);
            Requests.find((secondQuery), (err, request)=>{
                console.log(request[0].dateFirstClean);
                res.render('cleaner/cleaner_requests',{
                    cleaner: cleaner,
                    cleanerDetails: cleaner_details[0],
                    requests: request
                });
            })

        });
    });
});

//Cleaner Calendar Page route
router.get('/cleaner_calendar/:id', (req, res) =>{
    Cleaner.findById(req.params.id, (err, cleaner) =>{
        //console.log(cleaner)
        var query = {cleanerID: cleaner.cleanerID};
        CleanerDetails.find((query), (err, cleaner_details)=>{
            query2 = {cleanerID: req.params.id};
            CleaningSchedule.find((query2), (err, schedule)=>{
                console.log(schedule.length);
                if(empty(schedule)){
                    console.log('here');
                    res.render('cleaner/cleaner_calendar',{
                        cleaner: cleaner,
                        cleanerDetails: cleaner_details[0],
                        schedules: null
                    });
                }else{
                    console.log('here else');
                    query3 = {clientID: schedule[0].clientID};
                    ClientDetails.find((query3), (err, clientDetails)=>{
                        var firstClean = false;
                        if(empty(schedule[0].lastClean[0])){
                            firstClean = true;
                        }else{
                            var lastCleanDate = schedule[0].lastClean[0].lastCleanDate;
                            var lastCleanDate = new Date(lastCleanDate);
                            var lastCleanDate = date.format(lastCleanDate, 'ddd, MMM DD YYYY');
                            //.lastCleanDate;
                            //var lastCleanDate = lastCleanDate.split('T')
                        }
                        var currentCleanDate = schedule[0].currentClean[0].currentCleanDate;
                        var currentCleanDate = new Date(currentCleanDate);
                        var currentCleanDate = date.format(currentCleanDate, 'ddd, MMM DD YYYY');
                        var nextCleanDate = schedule[0].currentClean[0].nextCleanDate;
                        var nextCleanDate = new Date(nextCleanDate);
                        var nextCleanDate = date.format(nextCleanDate, 'ddd, MMM DD YYYY');
                        console.log(currentCleanDate, lastCleanDate, nextCleanDate);
                        //console.log(schedule[0]);
                        res.render('cleaner/cleaner_calendar',{
                            cleaner: cleaner,
                            cleanerDetails: cleaner_details[0],
                            clientDetails: clientDetails[0],
                            schedules: schedule,
                            currentClean: schedule[0].currentClean[0],
                            currentCleanDate: currentCleanDate,
                            lastCleanDate: lastCleanDate,
                            nextCleanDate: nextCleanDate,
                            lastClean: schedule[0].lastClean[0],
                            firstClean: firstClean
                        });
                    })
                }
            })
        });
    });
});
//Cleaner FAQs Page route
router.get('/cleaner_faq/:id', (req, res) =>{
    Cleaner.findById(req.params.id, (err, cleaner) =>{
        console.log(cleaner)
        var query = {cleanerID: cleaner.cleanerID};
        CleanerDetails.find((query), (err, cleaner_details)=>{
            //console.log(cleaner_details[0].fullName);
            res.render('cleaner/cleaner_faq',{
                cleaner: cleaner,
                cleanerDetails: cleaner_details[0]
            });
        });
    });
});

module.exports = router;