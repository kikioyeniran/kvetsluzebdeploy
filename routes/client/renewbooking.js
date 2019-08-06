const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
var empty = require('is-empty');
const multer = require('multer');
const path = require('path');

//Bring in Client Models
let ClientDetails =  require('../../models/client_details');

//Renew Client Booking
router.post('/:clientID/:id', (req, res) =>{
    let client = {};
    client.bedrooms = req.body.bedrooms;
    //console.log(req.body.fullName);
    client.bathrooms = req.body.bathrooms;
    client.extra_tasks = req.body.extra_tasks;
    client.date_first_clean = req.body.date;
    client.cleaning_hours = req.body.hours;
    client.more_cleaning_hours = req.body.more_hours;
    client.apartment_access = req.body.access_type;
    client.key_hidden_pin = req.body.key_hidden_pin;
    client.key_safe_pin = req.body.key_safe_pin;
    client.cleaning_frequency = req.body.schedule;
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