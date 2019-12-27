const express = require('express');
const router = express.Router();

//Bring in Cleaner Models
let Cleaner = require('../../models/cleaner');
let CleanerDetails = require('../../models/cleanerDetails');

//Bring in Client Model
let ClientDetails = require('../../models/clientDetails');

//Bring in Client Wallet Model
let ClientWallet = require('../../models/clientWallet');

//Bring in Cleaner Wallet Model
let CleanerWallet = require('../../models/cleanerWallet');

//Bring in Cleaning Schedule Model
let CleaningSchedule = require('../../models/cleaningSchedule');

router.get('/:scheduleID/:cleanerID/:clientID', (req, res) => {
  const { scheduleID, cleanerID, clientID } = req.params;

  CleaningSchedule.findById(scheduleID, (err, schedule) => {
    if (err) {
      console.log(err);
    } else {
      let paymentUpdate = {};
      var totalCharge = schedule.totalCharge;
      var cleanerIncome = schedule.cleanerIncome;
      var dblastClean = schedule.lastClean[0];
      var dbcurrentClean = schedule.currentClean[0];
      var incremental = schedule.currentClean[0].incremental;
      var newCurrentDate = schedule.currentClean[0].nextCleanDate;
      var nextCleanDate = new Date().setDate(
        newCurrentDate.getDate() + incremental
      );
      var nextCleanDate = new Date(nextCleanDate);
      console.log(incremental);
      var done = false;
      if (incremental === 0) {
        done = true;
      }
      //console.log(dbcurrentClean.currentCleanDate);
      // console.log(newCurrentDate, ' ', nextCleanDate);
      var lastClean = [
        {
          cleanStatus: true,
          paidStatus: false,
          cancelStatus: false,
          lastCleanDate: dbcurrentClean.currentCleanDate
        }
      ];
      var currentClean = [
        {
          cleanStatus: true,
          paidStatus: false,
          cancelStatus: false,
          currentCleanDate: newCurrentDate,
          nextCleanDate: nextCleanDate,
          incremental: incremental
        }
      ];
      //console.log(lastClean, ' ', currentClean);
      paymentUpdate.lastClean = lastClean;
      paymentUpdate.currentClean = currentClean;
      paymentUpdate.done = done;
      var newLastCleanDate = dbcurrentClean.currentCleanDate;
      console.log(newLastCleanDate);
      var query = { _id: scheduleID };
      CleaningSchedule.updateOne(query, paymentUpdate, err => {
        if (err) {
          console.log(err);
          return;
        } else {
          //console.log('Schedule Updated');
          let queryWallet = { cleanerID: req.params.cleanerID };
          Cleaner.findById(req.params.cleanerID, (err, cleaner) => {
            var CleanSpecID = cleaner.cleanerID;
            // console.log(CleanSpecID);
            let queryWallet2 = { cleanerID: CleanSpecID };
            CleanerWallet.findOne(queryWallet2, (err, walletFound) => {
              let wallet = {};
              wallet.totalIncome = totalCharge + walletFound.totalIncome;
              wallet.expectedIncome = totalCharge;
              CleanerWallet.updateOne(queryWallet, wallet, err => {
                //console.log(clientID);
                let clientQuery = { clientID: clientID };
                ClientWallet.findOne(clientQuery, (err, clientFound) => {
                  CleanerDetails.findOne({
                    cleanerID: CleanSpecID
                  }).exec((err, cl) => {
                    let clientWallet = {};
                    var pendingPay = {
                      cleanDate: newLastCleanDate,
                      cleanerID: cleanerID,
                      cost: totalCharge,
                      cleaner: cl
                    };
                    clientWallet.totalPaid =
                      totalCharge + clientFound.totalPaid;
                    clientWallet.pendingPay = pendingPay;
                    ClientWallet.updateOne(clientQuery, clientWallet, err => {
                      if (err) {
                        console.log(err);
                        return;
                      } else {
                        //console.log('wallet found and updated');
                        //req.flash('success', 'Account Updated');
                        res.redirect(
                          '/cleaner/dashboard/cleaner_calendar/' + cleanerID
                        );
                      }
                    });
                  });
                });
              });
            });
          });
        }
      });
    }
  });
});

module.exports = router;
