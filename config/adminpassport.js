const localStrategy = require('passport-local').Strategy;
const Admin = require('../models/admin');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

module.exports = (adminpassport)=>{
    //Local Strategy For Admin
    adminpassport.use('admin', new localStrategy((email, password, done)=>{
        //Match Username
        let query = {email:email};
        Admin.findOne(query, (err, admin)=>{
            if(err) throw err;
            if(!admin){
                console.log('no admin found');
                return done(null, false, {message: 'No Admin found'});
            }

            //Match password
            bcrypt.compare(password, admin.password, (err, isMatch)=>{
                if(err) throw err;
                if(isMatch){
                    return done(null, admin);
                }else{
                    return done(null, false, {message: 'Wrong password'});
                }
            });
        });
    }));

    adminpassport.serializeUser((admin, done)=>{
        done(null, admin.id);
    });

    adminpassport.deserializeUser((id, done)=>{
        Admin.findById(id, (err, admin)=>{
            done(err, admin);
        });
    });

}