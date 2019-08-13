const express = require('express');
const router = express.Router();
var empty = require('is-empty');

//Bring in Client Models
let Client =  require('../../models/client');
let ClientDetails =  require('../../models/clientDetails');
//Cleaner Models
let CleanerDetails =  require('../../models/cleanerDetails');

//Booking Final route
router.get('/:client', (req, res) =>{
    // res.render('booking_final');
    // var ID = req.params.client;
    // console.log(ID);
    //var query1 = {clientID: ID};
    Client.findOne(({clientID: req.params.client}), (err, client) =>{
        console.log(client)
        ClientDetails.findOne(({clientID: req.params.client}), (err, client_details)=>{
            console.log(client_details.city);
            var query2 = {city: client_details.city};
            CleanerDetails.find((query2), (err, cleanerDetails)=>{
                if(empty(cleanerDetails)){
                    console.log('cleaner details empty');
                    res.render('booking_final',{
                        client: client,
                        clientDetails: client_details
                    });
                }else{
                    //console.log(cleanerDetails);
                    res.render('booking_final',{
                        client: client,
                        clientDetails: client_details,
                        cleanerDetails: cleanerDetails
                    });
                }

            });
        });
    });
});


module.exports = router;