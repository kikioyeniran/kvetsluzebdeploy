const express = require('express');
const router = express.Router();

//Bring in cleaner models
let CleanerWallet = require('../../models/cleanerWallet');

//Edit cleaner Details Process
router.post('/:cleanerID/:id', (req, res) =>{
    //console.log('code is here');
    let wallet = {};
    wallet.acctName = req.body.acctName;
    wallet.ibanNumber = req.body.ibanNumber;
    wallet.swiftCode = req.body.swiftCode;
    // wallet.acctNumber = req.body.acctNumber;
    let query = {cleanerID : req.params.cleanerID}

    CleanerWallet.updateOne(query, wallet, (err) =>{
        if(err){
            console.log(err);
            return;
        }else {
            console.log('wallet and updated');
            //req.flash('success', 'Account Updated');
            res.redirect('/cleaner/dashboard/wallet/'+req.params.id);
        }
    });
});

module.exports = router;