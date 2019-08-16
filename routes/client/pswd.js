const express = require('express');
const router = express.Router();

router.get('/forgotpswd', (req, res) =>{
    res.render('client/forgotpswd');
});

router.get('/resetpswd', (req, res) =>{
    res.render('client/resetpswd');
});

router.get('/pswdchange', (req, res) =>{
    res.render('client.pswdchange');
});

module.exports = router;