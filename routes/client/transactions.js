const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
//Models
let Client =  require('../../models/client');
let ClientDetails =  require('../../models/clientDetails');
let CleanerDetails =  require('../../models/cleanerDetails');
let ClientWallet =  require('../../models/clientWallet');
let Transactions =  require('../../models/allTransactions');

router.post('/transactions', (req, res)=>{
    console.log('form submitted');
    const clientID = req.body.clientID;
    const clientName = req.body.clientName;
    const cleanerID = req.body.cleanerID;
    const date = req.body.date;
    const totalPay = req.body.totalPay;
    clientQuery = {clientID: clientID};
    Client.findOne((clientQuery), (err, clients)=>{
        var mainID = cliets._id;
        query = {cleanerID: cleanerID}
        CleanerDetails.findOne((query), (err, cleanerDetails)=>{
            cleanerName = cleanerDetails.fullName
            req.checkBody('clientID', 'clientID is required').notEmpty();
            req.checkBody('clientName', 'clientName is required').notEmpty();
            req.checkBody('cleanerID', 'clientPhone is required').notEmpty();
            req.checkBody('date', 'date is required').notEmpty();
            req.checkBody('totalPay', 'totalPay is required').notEmpty();

            let errors = req.validationErrors();

            if(errors){
                console.log(errors);
            }
            else{
                let newTransaction = new Transactions({
                    clientID: clientID,
                    clientName: clientName,
                    cleanerID: cleanerID,
                    cleanerName: cleanerName,
                    date: date,
                    totalPay: totalPay,
                });

                newTransaction.save((err) =>{
                    if(err){
                        console.log(err);
                        return;
                    }else {
                        req.flash('success', 'Transaction Completed');
                        res.redirect('/client/dashboard/transactions/'+mainID);
                    }
                });
            }
        })
    })

});
module.exports = router;