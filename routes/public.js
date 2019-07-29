const express = require('express');
const router = express.Router();

// User Models
let Public =  require('../models/public');


//Add route
router.get('/add', (req, res) =>{
    res.render('add_article', {
        title: 'Add Article'
    })
});


//About route
router.get('/about', (req, res) =>{
    res.render('about')
});

//FAQ route
router.get('/faq', (req, res) =>{
    res.render('faq')
});

//checked route
router.get('/checked', (req, res) =>{
    res.render('checked')
});
//checked2 route
router.get('/checked2', (req, res) =>{
    res.render('checked2')
});

//How It works route
router.get('/howitworks', (req, res) =>{
    res.render('howitworks')
});

module.exports = router;