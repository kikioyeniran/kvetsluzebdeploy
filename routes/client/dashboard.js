const express = require('express');
const router = express.Router();

//Bring in Client Models
let Client =  require('../../models/client');
let ClientDetails =  require('../../models/clientDetails');
let ClientWallet =  require('../../models/clientWallet');
let AllTransactions =  require('../../models/allTransactions');

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
router.get('/wallet/:id', (req, res) =>{
    Client.findById(req.params.id, (err, client) =>{
        //console.log(client)
        var query = {clientID: client.clientID};
        ClientDetails.find((query), (err, client_details)=>{
            //console.log(client_details[0]);
            ClientWallet.findOne((query), (err,clientWallet)=>{
                console.log(clientWallet)
                res.render('client/client_finance',{
                    client: client,
                    clientDetails: client_details[0],
                    wallet: clientWallet
                });
            })
        });
    });
});

//All Transactions Route
router.get('/transactions/:id', (req, res) =>{
    Client.findById(req.params.id, (err, client) =>{
        //console.log(client)
        var query = {clientID: client.clientID};
        ClientDetails.find((query), (err, client_details)=>{
            //console.log(client_details[0]);
            AllTransactions.find((query), (err, transactions)=>{
                res.render('client/allTransactions',{
                    client: client,
                    clientDetails: client_details[0],
                    transactions: transactions[0]
                });
            })
        });
    });
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