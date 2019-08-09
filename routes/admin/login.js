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

//Login Page
router.get('', (req, res) =>{
    res.render('admin/adminLogin')
});

//Login Process
router.post('',
  passport.authenticate('admin', { failureRedirect: '/admin/login', failureFlash: true  }),
  function(req, res) {
      console.log('here');
    res.redirect('/admin/dashboard/'+req.user.id);
    });

//Logout
router.get('/logout', (req, res)=>{
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/admin/login')
});

module.exports = router;