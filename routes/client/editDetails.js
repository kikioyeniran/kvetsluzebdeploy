const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
var empty = require('is-empty');
const multer = require('multer');
const path = require('path');

//Bring in Client Models
let Client =  require('../../models/client');
let ClientDetails =  require('../../models/client_details');

//Edit Client Details Process
router.post('/:clientID/:id', (req, res) =>{
    let client = {};
    client.full_name = req.body.fullName;
    console.log(req.body.fullName);
    client.postcode = req.body.postcode;
    client.city = req.body.city;
    client.address = req.body.address;
    client.mobile_number = req.body.mobileNumber;
    let query = {clientID : req.params.clientID}
    console.log(query);
    console.log(req.params.clientID)

    ClientDetails.updateOne(query, client, (err) =>{
        if(err){
            console.log(err);
            return;
        }else {
            console.log('found and updated');
            req.flash('success', 'Account Updated');
            res.redirect('/client/dashboard/home/'+req.params.id);
        }
    });
});

module.exports = router;