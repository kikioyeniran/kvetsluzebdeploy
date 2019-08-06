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

//Cleaner Models
let Cleaner = require('../../models/cleaner');
let CleanerDetails = require('../../models/cleaner_details');

router.get('', (req, res) =>{
    res.render('admin/dashboard')
});

router.get('/cleaners', (req, res) =>{
    res.render('admin/allCleaners')
});

router.get('/clients', (req, res) =>{
    res.render('admin/allClients')
});

module.exports = router;