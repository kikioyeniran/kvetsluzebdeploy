const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local')
const multer = require('multer');
const path = require('path');
//Cleaner Login route
router.get('', (req, res) =>{
    res.render('cleaner/cleaner_login')
});

//Post login route
router.post('',
  passport.authenticate('cleaner', { failureRedirect: '/cleaner/login', failureFlash: true  }),
  function(req, res) {
    console.log(req.user.id);
    res.redirect('/cleaner/dashboard/home/'+req.user.id);
    //res.redirect('/');
  });

//Logout
router.get('/cleaner_logout', (req, res)=>{
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/cleaner/login')
});

module.exports = router;