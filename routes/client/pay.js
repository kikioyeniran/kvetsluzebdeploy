const express = require('express');
const router = express.Router();
var empty = require('is-empty');
const keys = require('../../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

router.post('', (req, res)=>{
    // get the total amount
    // what you are doing here is to set this amount to
    let amount = 10*100;
    // create a customer
    stripe.customers.create({
      email: req.body.stripeEmail, // customer email
      source: req.body.stripeToken //token for the card
    })
    .then(customer =>
        stripe.charges.create({
          // charge the customer
          amount,
          desctiption: 'Cleaning for a particular cleaner',
          currency: 'eur',
          customer: customer.id
        }))
      .then(charge => res.render('client/success',{
          clientID: req.body.clientID,
          clientName: req.body.clientName,
          cleanerID: cleanerID,
          date: req.body.cleanDate,
          totalPay: totalPay,
          revisit: false
      })) //render the payment successful page
  });

  module.exports = router;