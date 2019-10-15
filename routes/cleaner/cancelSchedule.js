const express = require('express');
const router = express.Router();
const mailgun = require("mailgun-js");
const DOMAIN = 'kvetsluzeb.com';
const api_key = 'key-574b470a222d9b71a2b31386d4e4dc5d';
const mg = mailgun({apiKey: api_key, domain: DOMAIN, host: 'api.eu.mailgun.net'});

//Bring in Cleaner Models
let Cleaner =  require('../../models/cleaner');
let CleanerDetails =  require('../../models/cleanerDetails');

//Bring in Client Model
let ClientDetails =  require('../../models/clientDetails');

//Bring in Client Wallet Model
let ClientWallet = require('../../models/clientWallet');


//Bring in Cleaner Wallet Model
let CleanerWallet = require('../../models/cleanerWallet');

//Bring in Cleaning Schedule Model
let CleaningSchedule =  require('../../models/cleaningSchedule');

router.get('/:scheduleID/:cleanerID/:clientID', (req,res)=>{
    const {scheduleID, cleanerID, clientID} = req.params;
    CleaningSchedule
        .findById(scheduleID)
        .populate('clientDetails')
        .exec((err, schedule)=>{
        if(err){
            console.log(err)
        }
        else{
            let cancelUpdate = {};
            var totalCharge = schedule.totalCharge;
            var cleanerIncome = schedule.cleanerIncome;
            var dblastClean = schedule.lastClean[0];
            var dbcurrentClean = schedule.currentClean[0];
            var incremental = schedule.currentClean[0].incremental;
            var newCurrentDate = schedule.currentClean[0].nextCleanDate;
            var nextCleanDate = new Date().setDate(newCurrentDate.getDate() + incremental);
            var nextCleanDate = new Date(nextCleanDate);
            var clientMail = schedule.clientDetails[0].email;
            // console.log(schedule.clientDetails[0].email)

            var msg = `<strong>Your cleaning Schedule has just been cancelled</strong> by your cleaner. Please contact you client for clarity on this change of plans and for a reschedule. Sorry for the inconvenience. <br/> Regards. <br/>Kvet Sluzeb Team`
            var data = {
                from: 'Kvet Sluzeb <info@kvetsluzeb.com>',
                to: clientMail,
                subject: 'Schedule Changes',
                text: msg,
                html: msg
            };
            mg.messages().send(data, function (error, body) {
                if(error){
                    console.log(error);
                }
                else{
                    var lastClean = [{
                        cleanStatus : false,
                        paidStatus : false,
                        cancelStatus : true,
                        lastCleanDate  : dbcurrentClean.currentCleanDate
                    }];
                    var currentClean = [{
                            cleanStatus : true,
                            paidStatus : false,
                            cancelStatus : false,
                            currentCleanDate  : newCurrentDate,
                            nextCleanDate: nextCleanDate,
                            incremental: incremental
                    }]
                    //console.log(lastClean, ' ', currentClean);
                    cancelUpdate.lastClean = lastClean;
                    cancelUpdate.currentClean = currentClean;
                    var newLastCleanDate = dbcurrentClean.currentCleanDate;
                    console.log(newLastCleanDate);
                    var query = {_id: scheduleID};
                    CleaningSchedule.updateOne(query, cancelUpdate, (err) =>{
                        if(err){
                            console.log(err);
                            return;
                        }else {
                            res.redirect('/cleaner/dashboard/cleaner_calendar/'+cleanerID);
                        }
                    });
                }
            });
        }
    });
})

module.exports = router;

