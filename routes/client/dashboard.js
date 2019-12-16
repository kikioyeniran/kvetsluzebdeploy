const express = require('express');
const router = express.Router();
var empty = require('is-empty');
const keys = require('../../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

//Bring in Client Models
let Client = require('../../models/client');
let Cleaner = require('../../models/cleaner');
let ClientDetails = require('../../models/clientDetails');
let ClientWallet = require('../../models/clientWallet');
let AllTransactions = require('../../models/allTransactions');
let CleanerDetails = require('../../models/cleanerDetails');
let CleaningSchedule = require('../../models/cleaningSchedule');

//Client Dashboard route
router.get('/home/:id', (req, res) => {
  Client.findById(req.params.id, (err, client) => {
    //console.log(client)
    var query = { clientID: client.clientID };
    ClientDetails.find(query, (err, client_details) => {
      //console.log(client_details[0]);
      res.render('client/client_dashboard', {
        client: client,
        clientDetails: client_details[0]
      });
    });
  });
});

//Renew Booking Route
router.get('/renew/:id', (req, res) => {
  Client.findById(req.params.id, (err, client) => {
    //console.log(client)
    var query = { clientID: client.clientID };
    ClientDetails.find(query, (err, client_details) => {
      //console.log(client_details[0]);
      res.render('client/client_renewbooking', {
        client: client,
        clientDetails: client_details[0]
      });
    });
  });
});

//Client FAQs Route
router.get('/client_faq/:id', (req, res) => {
  Client.findById(req.params.id, (err, client) => {
    //console.log(client)
    var query = { clientID: client.clientID };
    ClientDetails.find(query, (err, client_details) => {
      //console.log(client_details[0]);
      res.render('client/client_faq', {
        client: client,
        clientDetails: client_details[0]
      });
    });
  });
});

//Client Finance Page route
router.get('/wallet/:id', (req, res) => {
  Client.findById(req.params.id, (err, client) => {
    //console.log(client)
    var query = { clientID: client.clientID };
    ClientDetails.find(query, (err, client_details) => {
      //console.log(client_details[0]);
      ClientWallet.findOne(query, (err, clientWallet) => {
        var pending;
        var costStatus = false;
        if (empty(clientWallet.pendingPay)) {
          costStatus = true;
          pending = true;
          console.log('pending pay is empty');
        } else {
          if (empty(clientWallet.pendingPay[0].cost)) {
            costStatus = true;
            //pending = false;
            console.log('cost Status is empty');
          }
          pending = false;
          //costStatus = false;
          console.log(
            'pending pay is not empty ',
            clientWallet.pendingPay[0].cost,
            ' ',
            costStatus
          );
        }
        var cleanQuery = { cleanerID: clientWallet.cleanerID };
        CleanerDetails.findOne(cleanQuery, (err, cleaner) => {
          console.log(clientWallet.pendingPay[0].cleanDate);
          res.render('client/client_finance', {
            client: client,
            clientDetails: client_details[0],
            wallet: clientWallet,
            date: clientWallet.pendingPay[0].cleanDate,
            costStatus: costStatus,
            cleaner: cleaner,
            pending: pending,
            stripePublishableKey: keys.stripePublishableKey
          });
        });
      });
    });
  });
});

//All Transactions Route
router.get('/transactions/:id', (req, res) => {
  Client.findById(req.params.id, (err, client) => {
    //console.log(client)
    var query = { clientID: client.clientID };
    ClientDetails.find(query, (err, client_details) => {
      //console.log(client_details[0]);
      AllTransactions.find(query, (err, transactions) => {
        var noTransaction = false;
        if (empty(transactions)) {
          noTransaction = true;
        }
        // console.log(transactions[0].cleaner);
        res.render('client/allTransactions', {
          client: client,
          clientDetails: client_details[0],
          transactions: transactions,
          transactionStatus: noTransaction
        });
      });
    });
  });
});

//Client Finance Page route
router.get('/client_invoice', (req, res) => {
  res.render('client/client_invoice');
});
//Client Schedule Page route
router.get('/schedule/:id', (req, res) => {
  Client.findById(req.params.id, (err, client) => {
    //console.log(client)
    var query = { clientID: client.clientID };
    ClientDetails.find(query, (err, client_details) => {
      console.log(client_details[0]._id);
      var query2 = { clientDetails: { _id: client_details[0]._id } };
      CleaningSchedule.find(query2, (err, schedule) => {
        console.log(schedule);
        Cleaner.findById(schedule[0].cleanerID, (err, cleaner) => {
          var query3 = { cleanerID: cleaner.cleanerID };
          CleanerDetails.find(query3, (err, cleanerDetails) => {
            res.render('client/client_calendar', {
              client: client,
              clientDetails: client_details[0],
              schedule: schedule[0],
              cleanerDetails: cleanerDetails[0]
            });
          });
        });
      });
    });
  });
});
//Client FAQs Page route
router.get('/client_faq', (req, res) => {
  res.render('client/client_faq');
});

router.get('/cleaner', (req, res) => {
  res.render;
});

module.exports = router;
