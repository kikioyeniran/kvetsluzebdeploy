const express = require('express');
const router = express.Router();

router.get('/forgotpswd', (req, res) =>{
    res.render('cleaner/forgotpswd');
});

router.get('/resetpswd', (req, res) =>{
    res.render('cleaner/resetpswd');
});

router.get('/pswdchange', (req, res) =>{
    res.render('cleaner.pswdchange');
});

module.exports = router;