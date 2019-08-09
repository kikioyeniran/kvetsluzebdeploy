const express = require('express');
const router = express.Router();
const passport = require('passport');

//Login  Form Page route
router.get('', (req, res)=>{
    res.render('client/client_login');
});

router.post('',
  passport.authenticate('client', { failureRedirect: '/client/login', failureFlash: true  }),
  function(req, res) {
    res.redirect('/client/dashboard/home/'+req.user.id);
    });

//Logout
router.get('/logout', (req, res)=>{
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/client/login')
});


module.exports = router;