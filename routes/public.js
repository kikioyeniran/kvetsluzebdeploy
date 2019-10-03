const express = require('express');
const router = express.Router();

//Add route
router.get('/add', (req, res) =>{
    res.render('add_article', {
        title: 'Add Article'
    })
});

//Client Registration route
//Cleaner Invoice Page route
router.get('/booking', (req, res) =>{
    res.render('booking');
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
router.get('/careers', (req, res) =>{
    res.render('careers')
});

//checked route
router.get('/privacy-policy', (req, res) =>{
    res.render('privacy')
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