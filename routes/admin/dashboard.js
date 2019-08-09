const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
var empty = require('is-empty');
const multer = require('multer');
const path = require('path');

//Bring in Admin Model
let Admin =  require('../../models/admin');

//Bring in Client Models
let Client =  require('../../models/client');
let ClientDetails =  require('../../models/client_details');

//Cleaner Models
let Cleaner = require('../../models/cleaner');
let CleanerDetails = require('../../models/cleaner_details');

//Route for Home Page
router.get('/:id', (req, res) =>{
    Admin.findById(req.params.id, (err, admin) =>{
        //console.log(admin);
        var active = true;
        res.render('admin/dashboard',{
            admin: admin,
            active: active
        });
    });
    //res.render('admin/dashboard')
});

//Route for All Clients Page
router.get('/clients/:id', (req, res) =>{
    Admin.findById(req.params.id, (err, admin) =>{
        //console.log(admin);
        ClientDetails.find({}, (err, clientDetails)=>{
            //var active = true;
            res.render('admin/allClients',{
                admin: admin,
                clientDetails: clientDetails
            });
        })
    });
});

//Route for All Cleaners Page
router.get('/cleaners/:id', (req, res)=>{
    Admin.findById(req.params.id, (err, admin) =>{
        //console.log(admin);
        CleanerDetails.find({}, (err, cleanerDetails)=>{
            var active = true;
            res.render('admin/allCleaners',{
                admin: admin,
                cleanerDetails: cleanerDetails
            });
        })
    });
});

//Route for Single Cleaner
router.get('/singlecleaner/:id/:cleanerID', (req, res) =>{
    Admin.findById(req.params.id, (err, admin) =>{
        var query = {cleanerID: req.params.cleanerID}
        Cleaner.findOne((query), (err, cleaner)=>{
            var query = {cleanerID: req.params.cleanerID}
            CleanerDetails.findOne((query), (err, cleanerDetails)=>{
                console.log(cleanerDetails);
                res.render('admin/singleCleaner',{
                    admin: admin,
                    cleaner: cleaner,
                    cleanerDetails: cleanerDetails
                });
            })
        });
    });
});

//Route for Single Client
router.get('/singleclient/:id/:clientid', (req, res) =>{
    Admin.findById(req.params.id, (err, admin) =>{
        var query = {clientID: req.params.clientid}
        Client.findOne((query), (err, client)=>{
            var query = {clientID: req.params.clientid}
            ClientDetails.findOne((query), (err, clientDetails)=>{
                console.log(clientDetails);
                res.render('admin/singleClient',{
                    admin: admin,
                    client: client,
                    clientDetails: clientDetails
                });
            })
        });
    });
});
module.exports = router;