const express = require('express');
const router = express.Router();
var empty = require('is-empty');
const keys = require('../../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

// Create the PaymentIntent on the backend.
router.post('', async (req, res, next) => {
  // let {currency, items} = req.body;
  const amount = (await req.body.totalPay) * 100;
  let currency = 'eur';
  try {
    const intent = await stripe.paymentIntents.create({
      amount,
      currency,
      description: 'Cleaning for a particular cleaner'
      // payment_method_types: 'card',
      // customer: customer.id,
      // confirmation_method: 'manual',
      // confirm: true
    });
    console.log(intent.status);
    generate_payment_response(intent);
    return res.status(200).json({ intent });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

const generate_payment_response = intent => {
  if (
    intent.status === 'requires_payment_method' &&
    intent.next_action.type === 'use_stripe_sdk'
  ) {
    // Tell the client to handle the action
    console.log('requires action');
    res.render('client/finance', {
      requires_action: true,
      payment_intent_client_secret: intent.client_secret
    });
    // return {
    //   //"/client/dashboard/wallet/"+client._id
    // };
  } else if (intent.status === 'succeeded') {
    // The payment didn’t need any additional actions and completed!
    // Handle post-payment fulfillment
    console.log('payment succceded without action');
    res.render('client/success', {
      clientID: req.body.clientID,
      clientName: req.body.clientName,
      cleanerID: req.body.cleanerID,
      cleanDate: req.body.cleanDate,
      totalPay: req.body.totalPay,
      revisit: false,
      success: true
    });
    // return {
    //   success: true
    // };
  } else {
    // Invalid status
    console.log('invalid payment status');
    return {
      error: 'Invalid PaymentIntent status'
    };
  }
};

// router.post('', (req, res)=>{
//     // get the total amount
//     // what you are doing here is to set this amount to
//     let amount = req.body.totalPay * 100;
//     // create a customer
//     // var clientID = req.body.clientID;
//     // var clientName = req.body.clientName;
//     // var cleanerID = cleanerID;
//     // var cleanDate = req.body.cleanDate
//     //console.log(req.body.totalPay);
//     stripe.customers.create({
//       email: req.body.stripeEmail, // customer email
//       source: req.body.stripeToken //token for the card
//     })
//     .then(customer =>
//         stripe.charges.create({
//           // charge the customer
//           amount,
//           description: 'Cleaning for a particular cleaner',
//           currency: 'eur',
//           customer: customer.id
//         }))
//       .then(charge => res.render('client/success',{
//           clientID: req.body.clientID,
//           clientName: req.body.clientName,
//           cleanerID: req.body.cleanerID,
//           cleanDate: req.body.cleanDate,
//           totalPay: req.body.totalPay,
//           revisit: false
//       })) //render the payment successful page
//   });

module.exports = router;
