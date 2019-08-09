const express = require('express');
const router = express.Router();

//Bring in Client Models
let Client =  require('../../models/client');
let ClientDetails =  require('../../models/client_details');

//Client Dashboard route
router.get('/home/:id', (req, res) =>{
    Client.findById(req.params.id, (err, client) =>{
        //console.log(client)
        var query = {clientID: client.clientID};
        ClientDetails.find((query), (err, client_details)=>{
            //console.log(client_details[0]);
            res.render('client/client_dashboard',{
                client: client,
                clientDetails: client_details[0]
            });
        });
    });
});


//Renew Booking Route
router.get('/renew/:id', (req, res) =>{
    Client.findById(req.params.id, (err, client) =>{
        //console.log(client)
        var query = {clientID: client.clientID};
        ClientDetails.find((query), (err, client_details)=>{
            //console.log(client_details[0]);
            res.render('client/client_renewbooking',{
                client: client,
                clientDetails: client_details[0]
            });
        });
    });
});

//Client FAQs Route
router.get('/client_faq/:id', (req, res) =>{
    Client.findById(req.params.id, (err, client) =>{
        //console.log(client)
        var query = {clientID: client.clientID};
        ClientDetails.find((query), (err, client_details)=>{
            //console.log(client_details[0]);
            res.render('client/client_faq',{
                client: client,
                clientDetails: client_details[0]
            });
        });
    });
});

//Client Finance Page route
router.get('/client_finance', (req, res) =>{
    res.render('client/client_finance')
});
//Client Finance Page route
router.get('/client_invoice', (req, res) =>{
    res.render('client/client_invoice')
});
//Client Calendar Page route
router.get('/client_calendar', (req, res) =>{
    res.render('client/client_calendar')
});
//Client FAQs Page route
router.get('/client_faq', (req, res) =>{
    res.render('client/client_faq')
});


module.exports = router;