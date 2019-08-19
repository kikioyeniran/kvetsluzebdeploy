const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local')
const multer = require('multer');
const path = require('path');

//Bring in Cleaner Models
let Cleaner =  require('../../models/cleaner');
let CleanerDetails =  require('../../models/cleanerDetails');

//Bring in Client Model
let ClientDetails =  require('../../models/clientDetails');

//Bring in Request Model
let Requests = require('../../models/requests');

//Bring in Cleaning Schedule Model
let CleaningSchedule =  require('../../models/cleaningSchedule');

//Edit Request and create schedule Process
router.get('/:clientID/:cleanerID/:requestID', (req, res) =>{
    let clientID = req.params.clientID;
    let cleanerID = req.params.cleanerID;
    let requestID = req.params.requestID;

    let request = {};
    request.status = true;
    request.confirmedCleanerID = cleanerID;
    request
    let query = {_id : requestID};
    Requests.updateOne(query, request, (err) =>{
        if(err){
            console.log(err);
            return;
        }else {
            console.log('found and updated', clientID);

            //req.flash('success', 'Account Updated');
            query2 = {_id: requestID}
            Requests.find((query2), (err, clientRequest)=>{
                if(err){
                    console.log(err)
                }else{
                    //console.log(clientRequest[0].cleanerID)
                    var dateFirstClean = clientRequest[0].dateFirstClean;
                    var frequency = clientRequest[0].frequency;
                    var incremental = 0;

                    if(frequency == "weekly"){
                        var nextCleanDate = new Date().setDate(dateFirstClean.getDate() + 7);
                        var nextCleanDate = new Date(nextCleanDate);
                        var followingDate = new Date().setDate(nextCleanDate.getDate() + 7);
                        var followingDate = new Date(followingDate);
                        var incremental = 7;
                        //console.log(nextCleanDate);
                    }
                    if(frequency == "fortnightly"){
                        var nextCleanDate = new Date().setDate(dateFirstClean.getDate() + 14);
                        var nextCleanDate = new Date(nextCleanDate);
                        var followingDate = new Date().setDate(nextCleanDate.getDate() + 14);
                        var followingDate = new Date(followingDate);
                        var incremental = 14;
                        //console.log(nextCleanDate);
                    }
                    if(frequency == "one-off"){
                        var nextCleanDate = new Date(dateFirstClean);
                        var incremental = 0;
                        //console.log(nextCleanDate);
                    }
                    Cleaner.findById(cleanerID, (err, cleanerDetail)=>{
                        //console.log(cleanerDetail.cleanerID);
                        query = {cleanerID: cleanerDetail.cleanerID}
                        CleanerDetails.findOne((query), (err, newCleaner)=>{
                            var cleanerCharge = newCleaner.income;
                            var hours = clientRequest[0].hours
                            if(hours == "more"){
                                var hourCost = parseFloat(client.Request[0].moreHours);
                            }else{
                                var hourCost = parseFloat(clientRequest[0].hours);
                            }
                            var extraTasks = clientRequest[0].extraTasks[0];
                            var result = extraTasks.split(",");
                            var extraTaskCost = result.length;
                            if(extraTaskCost <=2){
                                hourCost = hourCost + 0.5;
                            }
                            if(extraTaskCost >2){
                                hourCost = hourCost + 1;
                            }
                            var cleanerIncome = newCleaner.income * hourCost;
                            query2 = {clientID: req.params.clientID};
                            ClientDetails.findOne((query2), (err, clientDetails)=>{
                                //console.log(req.params.clientID, ' + ', clientDetails);
                                var clientID = clientDetails._id;
                                let newSchedule = new CleaningSchedule({
                                    clientDetails: clientID,
                                    clientName: clientRequest[0].clientName,
                                    cleanerID: cleanerID,
                                    dateFirstClean: dateFirstClean,
                                    currentClean:[
                                        {
                                            currentCleanDate: dateFirstClean,
                                            nextCleanDate: nextCleanDate,
                                            incremental: incremental
                                        }
                                    ],
                                    extraTasks: extraTasks,
                                    cleanerIncome: cleanerCharge,
                                    totalHours: hourCost,
                                    totalCharge: cleanerIncome
                                });
                                newSchedule.save((err)=>{
                                    if(err){
                                        console.log(err);
                                        return;
                                    }else{
                                        req.flash('success', 'Cleaning Request Accepted');
                                        console.log('Cleaning Request Accepted');
                                        //console.log(cleanerID);
                                        res.redirect('/cleaner/dashboard/cleaner_calendar/'+encodeURIComponent(req.params.cleanerID));
                                    }
                                })
                            })
                        });
                    });
                }
            });
        }
    });
});

module.exports = router;
