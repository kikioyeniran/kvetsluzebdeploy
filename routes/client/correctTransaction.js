/*AFTER PAYMENT, YOU'RE SUPPOSED TO UPDATE THE TRANSACTIONS MODEL.
AFTER UPDATING THE TRANSACTIONS MODEL, DO THE FOLLOWING

STEP 1 UPDATE THE CLIENT MODEL
STEP 2 UPDATE THE CLEANER MODEL
STEP 3 UPDATE THE CLEANING SCHEDULE*/

//USE THIS AS A GUIDELINE TO UPDATE CLIENT WALLET
//STEP 1
let clientWalletUpdate = {};
var pendingPay = [];
clientWalletUpdate.pendingPay = pendingPay;
//use the cleaner id to update the clientwallet
let clientWalletQuery = { pendingPay: [{ cleanerID: cleanerID }] };
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
      let cleanerWalletQuery = { cleanerID: cleanerID };
      let cleanerWallet = {};
      cleanerWallet.paidIncome = totalPaid; //totalPaid is the amount that has been succesfully paid
      CleanerWallet.updateOne(cleanerWalletQuery, cleanerWallet, err => {
        if (err) {
          console.log(err);
        } else {
          //STEP 3
          //FINALLY, UPDATE THE CLEANING SCHEDULE
          let scheduleQuery = { cleanerID: cleanerID };
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
                result.message = 'Transaction Completed';
                result.statusCode = statusCode;
                result.userID = mainID;
                res.status(statusCode).send(result);
              }
            }
          );
        }
      });
    }
  }
);
