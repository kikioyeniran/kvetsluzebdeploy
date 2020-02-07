const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
var empty = require('is-empty');
const multer = require('multer');
const path = require('path');

//Bring in Admin Model
let Admin = require('../../models/admin');

//Bring in Client Models
let Client = require('../../models/client');
let ClientDetails = require('../../models/clientDetails');
let ClientWallet = require('../../models/clientWallet');

//Cleaner Models
let Cleaner = require('../../models/cleaner');
let CleanerDetails = require('../../models/cleanerDetails');
let Requests = require('../../models/requests');
let Transactions = require('../../models/allTransactions');
let CleaningSchedule = require('../../models/cleaningSchedule');
let CleanerWallet = require('../../models/cleanerWallet');

//Route for Home Page
router.get('/:id', (req, res) => {
  Admin.findById(req.params.id, (err, admin) => {
    //console.log(admin);
    var active = true;
    res.render('admin/dashboard', {
      admin: admin,
      active: active
    });
  });
  //res.render('admin/dashboard')
});

//Route for All Clients Page
// router.get('/clients/:id', (req, res) => {
//   Admin.findById(req.params.id, (err, admin) => {
//     //console.log(admin);
//     ClientDetails.find({}, (err, clientDetails) => {
//       //var active = true;
//       res.render('admin/allClients', {
//         admin: admin,
//         clientDetails: clientDetails
//       });
//     });
//   });
// });

router.get('/clients/:id', (req, res) => {
  Admin.findById(req.params.id, (err, admin) => {
    //console.log(admin);
    Client.find({}, (err, clients) => {
      //var active = true;
      res.render('admin/allClients', {
        admin: admin,
        clients: clients
      });
    });
  });
});

//Route for All Cleaners Page
router.get('/cleaners/:id', (req, res) => {
  Admin.findById(req.params.id, (err, admin) => {
    //console.log(admin);
    CleanerDetails.find({}, (err, cleanerDetails) => {
      var active = true;
      res.render('admin/allCleaners', {
        admin: admin,
        cleanerDetails: cleanerDetails
      });
    });
  });
});
//Route for All Requests
router.get('/requests/:id', (req, res) => {
  Admin.findById(req.params.id, (err, admin) => {
    //console.log(admin);
    Requests.find({}, (err, requests) => {
      var active = true;
      res.render('admin/allRequests', {
        admin: admin,
        requests: requests
      });
    });
  });
});

//Route for All Transactions
router.get('/transactions/:id', (req, res) => {
  Admin.findById(req.params.id, (err, admin) => {
    //console.log(admin);
    Transactions.find({}, (err, transactions) => {
      var active = true;
      res.render('admin/allTransactions', {
        admin: admin,
        transactions: transactions
      });
    });
  });
});
//Route for Single Cleaner
router.get('/singlecleaner/:id/:cleanerID', (req, res) => {
  Admin.findById(req.params.id, (err, admin) => {
    var query = { cleanerID: req.params.cleanerID };
    Cleaner.findOne(query, (err, cleaner) => {
      var query = { cleanerID: req.params.cleanerID };
      CleanerDetails.findOne(query, (err, cleanerDetails) => {
        CleanerWallet.findOne(query, (err, cleanerWallet) => {
          console.log(cleanerWallet);
          //   console.log(cleanerDetails);
          res.render('admin/singleCleaner', {
            admin: admin,
            cleaner: cleaner,
            cleanerDetails: cleanerDetails,
            cleanerAcct: cleanerWallet
          });
        });
      });
    });
  });
});

//Route for Single Client
router.get('/singleclient/:id/:clientid', (req, res) => {
  Admin.findById(req.params.id, (err, admin) => {
    var query = { clientID: req.params.clientid };
    Client.findOne(query, (err, client) => {
      var query = { clientID: req.params.clientid };
      ClientDetails.findOne(query, (err, clientDetails) => {
        console.log(clientDetails);
        res.render('admin/singleClient', {
          admin: admin,
          client: client,
          clientDetails: clientDetails
        });
      });
    });
  });
});

//Route for Delete Client
// router.delete('/deleteclient/:clientid', (req, res) => {
//   let query = { clientID: req.params.clientid };

//   Client.deleteOne(query, err => {
//     if (err) {
//       console.log(err);
//     } else {
//       ClientDetails.find(query, (err, clientDetails) => {
//         var query2 = { clientDetails: { _id: clientDetails[0]._id } };
//         ClientDetails.deleteOne(query, err => {
//           CleaningSchedule.deleteOne(query2, err => {
//             ClientWallet.deleteOne(query, err => {
//               res.send('Success');
//             });
//           });
//         });
//       });
//     }
//   });
// });

router.delete('/deleteclient/:clientid', (req, res) => {
  console.log(req.params.clientid);
  let query = { clientID: req.params.clientid };

  Client.deleteOne(query, err => {
    if (err) {
      console.log(err);
    } else {
      res.send('Success');
    }
  });
});
//Route for Delete Cleaner
router.delete('/deletecleaner/:cleanerid', (req, res) => {
  let query = { cleanerID: req.params.cleanerid };
  let query2 = { confirmedCleanerID: req.params.cleanerID };
  Cleaner.deleteOne(query, err => {
    if (err) {
      console.log(err);
    } else {
      CleanerDetails.deleteOne(query, err => {
        CleanerWallet.deleteOne(query, err => {
          let request = {};
          request.status = false;
          request.confirmedCleanerID = '';
          Requests.updateOne(query2, request, err => {
            res.send('Success');
          });
        });
      });
    }
  });
});
module.exports = router;
