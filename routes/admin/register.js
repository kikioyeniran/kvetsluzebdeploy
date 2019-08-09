const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//Bring in Admin Model
let Admin =  require('../../models/admin');

//Register Route
router.get('', (req, res) =>{
    //console('register view called');
    res.render('admin/register')
});

//Register Processes
router.post('', (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;

    req.checkBody('username', 'username is required').notEmpty();
    //req.checkBody('username', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    let errors = req.validationErrors();

    if(errors){
        res.render('admin/register', {
            errors:errors
        });
    }else{
        let newUser = new Admin({
            username:username,
            password:password
        });
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if(err){
                console.log(err);
            }
            newUser.password = hash;
            newUser.save((err)=>{
                if(err){
                    console.log(err);
                    return;
                }else{
                    req.flash('success', 'You are now registered and can login');
                    res.redirect('/admin/login');
                }
            })
        });
    });
    }
});

module.exports = router;