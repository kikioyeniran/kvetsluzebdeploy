const localStrategy = require('passport-local').Strategy;
const Client = require('../models/client');
const Cleaner = require('../models/cleaner');
const Admin = require('../models/admin');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

module.exports = (passport)=>{
    //Local Strategy For Admin
    passport.use('admin', new localStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },(username, password, done)=>{
        //Match Username
        console.log(username);
        let query = {email:username};
        Admin.findOne(query, (err, admin)=>{
            if(err) throw err;
            if(!admin){
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

    passport.serializeUser((admin, done)=>{
        console.log(admin);
        done(null, admin.id);
    });

    passport.deserializeUser((id, done)=>{
        Admin.findById(id, (err, admin)=>{
            done(err, admin);
        });
    });

    //Local Strategy For Clients
    passport.use('client', new localStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },(username, password, done)=>{
        //Match Username
        console.log(username);
        let query = {email: username};
        Client.findOne(query, (err, client)=>{
            //console.log(client.email)
            if(err) throw err;
            if(!client){
                return done(null, false, {message: 'No client found'});
            }

            //Match password
            bcrypt.compare(password, client.password, (err, isMatch)=>{
                if(err) throw err;
                if(isMatch){
                    return done(null, client);
                }else{
                    return done(null, false, {message: 'Wrong password'});
                }
            });
        });
    }));

    passport.serializeUser((client, done)=>{
        done(null, client.id);
    });

    passport.deserializeUser((id, done)=>{
        Client.findById(id, (err, client)=>{
            done(err, client);
        });
    });


    //Local Strategy for Cleaners
    passport.use('cleaner', new localStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },(username, password, done)=>{
        //Match Username
        let query = {email:username};
        Cleaner.findOne(query, (err, cleaner)=>{
            if(err) throw err;
            if(!cleaner){
                console.log('no cleaner found');
                return done(null, false, {message: 'No Cleaner found'});
            }

            //Match password
            bcrypt.compare(password, cleaner.password, (err, isMatch)=>{
                if(err) throw err;
                if(isMatch){
                    console.log('match is found');
                    return done(null, cleaner);
                }else{
                    return done(null, false, {message: 'Wrong password'});
                }
            });
        });
    }));

    passport.serializeUser((cleaner, done)=>{
        console.log('serialize cleaner working');
        done(null, cleaner.id);
    });

    passport.deserializeUser((id, done)=>{
        Cleaner.findById(id, (err, cleaner)=>{
            done(err, cleaner);
        });
    });
}