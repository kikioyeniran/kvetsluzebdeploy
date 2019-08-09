const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local')
const multer = require('multer');
const path = require('path');

//Bring in Cleaner Models
let Cleaner =  require('../../models/cleaner');
let CleanerDetails =  require('../../models/cleaner_details');

//Bring in Client Model
let ClientDetails =  require('../../models/client_details');

//Bring in Request Model
let CleanerWallet = require('../../models/cleanerWallet');

//Bring in Cleaning Schedule Model
let CleaningSchedule =  require('../../models/cleaningSchedule');

router.get('/:scheduleID/:cleanerID', (req,res)=>{
    let scheduleID = req.params.scheduleID;
    let cleanerID = req.params.cleanerID;

    CleaningSchedule.findById(scheduleID, (err, schedule)=>{
       let paymentUpdate = {};
       var totalCharge = schedule.totalCharge;
       var cleanerIncome = schedule.cleanerIncome;
       var lastClean = schedule.lastClean[0];
       var currentClean = schedule.currentClean[0];
       var increment = schedule.currentClean[0].increment;
       var newCurrentDate = schedule.currentClean[0].nextCleanDate;
       var nextCleanDate = new Date().setDate(newCurrentDate.getDate() + 14);
       var nextCleanDate = new Date(nextCleanDate);
       console.log(newCurrentDate, ' ', nextCleanDate);
       var lastClean = {
           cleanStatus : true,
           paidStatus : false,
           requestStatus : true,
           lastCleanDate  : currentClean.currentCleanDate
       };
       var currentClean = {
            cleanStatus : true,
            paidStatus : false,
            requestStatus : true,
            currentCleanDate  : newCurrentDate,
            nextCleanDate: nextCleanDate,
            increment: increment
       }
       paymentUpdate.lastClean = lastClean;
       paymentUpdate.currentClean = currentClean;
       var query = {_id: scheduleID};
       CleaningSchedule.updateOne(query, paymentUpdate, (err) =>{
            if(err){
                console.log(err);
                return;
            }else {
                console.log('Schedule Updated');
                let newCleanerWallet = new CleanerWallet({
                    cleanerID: cleanerID,
                    totalIncome: totalCharge,
                    cleanerIncome: cleanerIncome
                })
                newCleanerWallet.save((err)=>{
                    if(err){
                        console.log(err);
                        return;
                    }else{
                        req.flash('success', 'Account Updated');
                        res.redirect('/cleaner/dashboard/cleaner_calendar/'+cleanerID);
                    }
                });
            }
        });
    });
})

module.exports = router;