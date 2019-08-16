const express = require('express');
const router = express.Router();

router.get('/forgotpswd', (req, res) =>{
    res.render('admin/forgotpswd');
});

router.get('/resetpswd', (req, res) =>{
    res.render('admin/resetpswd');
});

router.get('/pswdchange', (req, res) =>{
    res.render('admin.pswdchange');
});

module.exports = router;