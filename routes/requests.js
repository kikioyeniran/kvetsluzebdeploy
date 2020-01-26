const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mailgun = require('mailgun-js');
const DOMAIN = 'kvetsluzeb.com';
const api_key = 'key-574b470a222d9b71a2b31386d4e4dc5d';
const mg = mailgun({
  apiKey: api_key,
  domain: DOMAIN,
  host: 'api.eu.mailgun.net'
});
//Models
let Request = require('../models/requests');

router.get('/test', (req, res) => {
  res.send('Hello');
});

// router.get('/booking_final', (req, res) =>{
//     res.render('admin/client_login');
// });

router.post('/booking_final', (req, res) => {
  console.log('form submitted');
  const clientID = req.body.clientID;
  const clientName = req.body.clientName;
  const clientPhone = req.body.clientPhone;
  const clientEmail = req.body.clientEmail;
  const extraTasks = req.body.extraTasks;
  const hours = req.body.hours;
  const moreHours = req.body.moreHours;
  const priority = req.body.priority;
  const accessType = req.body.accessType;
  const keyHiddenPin = req.body.keyHiddenPin;
  const keySafePin = req.body.keySafePin;
  const frequency = req.body.frequency;
  const dateFirstClean = req.body.dateFirstClean;
  const postcode = req.body.postcode;
  const address = req.body.address;
  const city = req.body.city;
  const country = req.body.country;
  const time = req.body.time;
  const selectedCleaner0 = req.body.selectedCleaner0;
  const selectedCleaner1 = req.body.selectedCleaner1;
  const selectedCleaner2 = req.body.selectedCleaner2;
  const selectedcleanerID0 = req.body.selectedcleanerID0;
  const selectedcleanerID1 = req.body.selectedcleanerID1;
  const selectedcleanerID2 = req.body.selectedcleanerID2;
  const selectedcleanerMail0 = req.body.selectedcleanerMail0;
  const selectedcleanerMail1 = req.body.selectedcleanerMail1;
  const selectedcleanerMail2 = req.body.selectedcleanerMail2;
  const selectedCleaners = [
    selectedCleaner0,
    selectedCleaner1,
    selectedCleaner2
  ];
  const selectedcleanerIDs = [
    selectedcleanerID0,
    selectedcleanerID1,
    selectedcleanerID2
  ];
  const selectedcleanerMails = [
    selectedcleanerMail0,
    selectedcleanerMail1,
    selectedcleanerMail2
  ];
  const status = false;

  console.log(clientID);
  console.log(selectedCleaners);
  console.log(selectedcleanerIDs);
  req.checkBody('clientID', 'clientID is required').notEmpty();
  req.checkBody('clientName', 'clientName is required').notEmpty();
  req.checkBody('clientPhone', 'clientPhone is required').notEmpty();
  req.checkBody('clientEmail', 'clientEmail is required').notEmpty();
  req.checkBody('extraTasks', 'extraTasks is required').notEmpty();
  req.checkBody('hours', 'Cleaning hours is required').notEmpty();
  req.checkBody('accessType', 'Apartment access type is required').notEmpty();
  req.checkBody('frequency', 'Cleaning frequency is required').notEmpty();
  req.checkBody('dateFirstClean', 'Date of First Clean is required').notEmpty();
  req.checkBody('postcode', 'Postcode is required').notEmpty();
  req.checkBody('address', 'address is required').notEmpty();
  req.checkBody('city', 'City is required').notEmpty();
  //req.checkBody('selectedCleaners', 'Cleaners must be selected').notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    // res.render('client/booking_final/'+clientID, {
    //     errors:errors
    // });
    console.log(errors);
  } else {
    //Mailing happens here
    var msg = `<strong>You have just been selected</strong> by ${clientName} to clean.\n Please Login to your account to view details and accept this offer. Ignore this request if you're not interested in this offer!`;
    var data = {
      from: 'Kvet Sluzeb <info@kvetsluzeb.com>',
      to: selectedcleanerMail0,
      cc: selectedcleanerMail1,
      cc: selectedcleanerMail2,
      subject: 'Cleaning Request',
      text: msg,
      html: msg
    };
    mg.messages().send(data, function(error, body) {
      if (error) {
        console.log(error);
        //     res.render('cleaner/forgotpswd', {
        //       cleanerID: user._id,
        //       message: 'Please make sure you entered the right password'
        //   })
      } else {
        let newUser = new Request({
          clientID: clientID,
          clientName: clientName,
          clientEmail: clientEmail,
          clientPhone: clientPhone,
          extraTasks: extraTasks,
          hours: hours,
          moreHours: moreHours,
          address: address,
          city: city,
          country: country,
          postcode: postcode,
          keySafePin: keySafePin,
          keyHiddenPin: keyHiddenPin,
          frequency: frequency,
          priority: priority,
          accessType: accessType,
          dateFirstClean: dateFirstClean,
          selectedCleaners: selectedCleaners,
          selectedcleanerIDs: selectedcleanerIDs,
          status: status,
          time: time || '09:00'
        });

        newUser.save(err => {
          if (err) {
            console.log(err);
            return;
          } else {
            console.log('mail sent');
            req.flash('success', 'Request completed');
            res.redirect('/client/login');
          }
        });
        //   console.log(body);
      }
    });
  }
});
module.exports = router;
