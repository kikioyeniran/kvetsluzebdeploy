api.post("/payment_webhook", (req, res) => {
    const sig = req.headers["stripe-signature"];
    let endpointSecret = "whsec_P6Ylyopnf6Fyz59BO57zD9VbMDsVeVE9", event;
    try{
        event =  stripe.webhooks
        .constructEvent(req.rawBody, sig, endpointSecret)
            let intent = event.type;
            switch (intent) {
            case "payment_intent.succeeded":
                //update
                console.log(event.data.object);
                //       console.log(intent, event.data);
                //   AllTransactions
            Transactions.updateOne(
                {
                    clientSecret: event.data.object.id
                },
                {
                    pending: false
                }
                ).exec((err, transaction) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(transaction, "\n \n done");
                    let clientWalletUpdate = {};
                        var pendingPay = [];
                        clientWalletUpdate.pendingPay = pendingPay;
                        //use the cleaner id to update the clientwallet
                        let clientWalletQuery = { pendingPay: [{ cleanerID: cleanerDet.cleanerID||cl.cleanerID }] };
                        //Update Client Wallet and Set Pending Pay to empty
                        ClientWallet.updateOne(
                        clientWalletQuery,
                        clientWalletUpdate,
                        (err, updWallet) => {
                            if (err) {
                            console.log(err);
                            } else {
                            console.log('client wallet updated');
                            //STEP 2
                            //AFTER YOU UPDATE CLIENT WALLET => UPDATE THE CLEANER WALLET
                            //FOR THE CLEANER WALLET FOLLOW THIS GUIDE
                            let cleanerWalletQuery = { cleanerID: cleanerDet.cleanerID||cl.cleanerIDD };
                            let cleanerWallet = {};
                            cleanerWallet.paidIncome = totalPaid; //totalPaid is the amount that has been succesfully paid
                            CleanerWallet.updateOne(cleanerWalletQuery, cleanerWallet, err => {
                                if (err) {
                                console.log(err);
                                } else {
                                console.log('cleaner wallet updated');
                                //STEP 3
                                //FINALLY, UPDATE THE CLEANING SCHEDULE
                                let scheduleQuery = { cleanerID: cleanerDet.cleanerID||cl.cleanerID };
                                let scheduleUpdate = {};
                                var newStatus = {
                                    paidStatus: true
                                };
                                scheduleUpdate.lastClean = newStatus;
                                CleaningSchedule.updateOne(
                                    scheduleQuery,
                                    scheduleUpdate,
                                    (err, schedule) => {
                                        let result = {};
                                        let statusCode = 200;
                                        if (err) {
                                            console.log(err)
                                        } else {
                                            console.log('cleaning schedule updated')
                                        }
                                    }
                                );
                                }
                            });
                            }
                        }
                    );
                }
                res.status(200).json({
                    success: true
                });
                });

                break;
                case "payment_intent.payment_failed":
                intent = event.data.object
                const message =
                intent.last_payment_error && intent.last_payment_error.message;
                console.log("Failed:", intent.id, message);
                res.status(200).json({
                    success: true
                });
                break;
                default:
                res.status(200).json({
                ok: true
                });
            }
    }catch(error){
    console.log(error.message)
    res.status(500).json({
        error: true,
        message: message.error + ":\n" +   ${error.message}
    });
  }
});

  //cODE FOR CONFIRMED PAYMENTS

  api.post("/payment_requst", (req, res) => {
    let { clientID, cleanerID, totalPaid, date, paymentMethod } = req.body;
    if (!date) {
      res.status(500).json({
        error: true,
        message: message.error
      });
      return;
    }
    ClientDetails.findOne({
      clientID
    }).exec((err, clientDet) => {
      if (err) {
        res.status(500).json({
          error: true,
          message: message.error + ': ' + err.message
        });
        return;
      }
      if (!clientDet) {
        res.status(404).json({
          error: true,
          message: "client " + message.notFound
        });
        return;
      }

      Cleaner.findById(
        cleanerID
      ).exec((err, cleanerDet) => {
        if (err) {
  console.log(err)

          res.status(500).json({
            error: true,
            message: message.error + "lion " + err.message
          });
          return;
        }
        if (!cleanerDet) {
          res.status(404).json({
            error: true,
            message: "cleaner " + message.notFound
          });
          return;
        }

  const cl={}
  let key;
  for(key in cleanerDet) {
  cl[key] = cleanerDet[key]}
  cl.fullName = cleanerDet.fullName||cl._doc.fullName

        stripe.paymentIntents
          .create({
            amount: totalPaid * 100,
            currency: "eur",
            confirm:true,
            description: 'Payment of €'+totalPaid +' by '+ cleanerDet.fullName||cl.fullName,
            payment_method: paymentMethod,


          })
          .then(intent => {
            let newTransaction = {
              clientID,
              cleanerID: cleanerDet.cleanerID||cl.cleanerID,
              clientName: clientDet.fullName,
              cleanerName: cleanerDet.fullName||cl.fullName,
              totalPaid,
              Date: date,
              pending: intent.status!=='succeeded',
              clientSecret: intent.id
            };
            let newTransactionInst = new Transactions(newTransaction);
                newTransactionInst.save().then(resp => {
                    console.log(intent);
                    let clientWalletUpdate = {};
                    var pendingPay = [];
                    clientWalletUpdate.pendingPay = pendingPay;
                    //use the cleaner id to update the clientwallet
                    let clientWalletQuery = { pendingPay: [{ cleanerID: cleanerDet.cleanerID||cl.cleanerID }] };
                    //Update Client Wallet and Set Pending Pay to empty
                    ClientWallet.updateOne(
                    clientWalletQuery,
                    clientWalletUpdate,
                    (err, updWallet) => {
                        if (err) {
                        console.log(err);
                        } else {
                        //STEP 2
                        //AFTER YOU UPDATE CLIENT WALLET => UPDATE THE CLEANER WALLET
                        //FOR THE CLEANER WALLET FOLLOW THIS GUIDE
                        let cleanerWalletQuery = { cleanerID: cleanerDet.cleanerID||cl.cleanerIDD };
                        let cleanerWallet = {};
                        cleanerWallet.paidIncome = totalPaid; //totalPaid is the amount that has been succesfully paid
                        CleanerWallet.updateOne(cleanerWalletQuery, cleanerWallet, err => {
                            if (err) {
                            console.log(err);
                            } else {
                            //STEP 3
                            //FINALLY, UPDATE THE CLEANING SCHEDULE
                            let scheduleQuery = { cleanerID: cleanerDet.cleanerID||cl.cleanerID };
                            let scheduleUpdate = {};
                            var newStatus = {
                                paidStatus: true
                            };
                            scheduleUpdate.lastClean = newStatus;
                            CleaningSchedule.updateOne(
                                scheduleQuery,
                                scheduleUpdate,
                                (err, schedule) => {
                                    let result = {};
                                    let statusCode = 200;
                                    if (err) {
                                        statusCode = 404;
                                        result.statusCode = statusCode;
                                        result.error = err;
                                        res.status(statusCode).send(result);
                                    } else {
                                        // result.message = 'Transaction Completed';
                                        // result.statusCode = statusCode;
                                        // result.userID = mainID;
                                        // res.status(statusCode).send(result);
                                        res.status(201).json({
                                            transaction: resp,
                                            paymentIntent: intent.client_secret,
                                            success: intent.status==='succeeded',
                                            requires_action: intent.status==='requires_action',
                                            requires_payment_method: intent.status==='requires_payment_method',
                                            fullName: cleanerDet.fullName, cleaner:cleanerDet,
                                        });
                                    }
                                }
                            );
                            }
                        });
                        }
                    }
                );
            });
          })
          .catch(err => {
            console.log(err.message);
            res.status(500).json({
              error: true,
              message: message.error + ":\n" +   ${err.message},
              card_declined:err.code === 'card_declined'
            });
          });
      });
    });
  });
