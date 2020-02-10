const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// const fs = require('fs');
// const Jimp = require('jimp');
// const modifyExif = require('modify-exif');
const autoRotate = require('exif-image-auto-rotation');
var empty = require('is-empty');
const multer = require('multer');
const path = require('path');

//Bring in Client Models
let Client = require('../../models/client');
let ClientDetails = require('../../models/clientDetails');

//Edit Client Details Process
router.post('/:clientID/:id', (req, res) => {
  let client = {};
  client.fullName = req.body.fullName;
  console.log(req.body.fullName);
  client.postcode = req.body.postcode;
  client.city = req.body.city;
  client.country = req.body.country;
  client.address = req.body.address;
  client.mobileNumber = req.body.mobileNumber;
  client.time = req.body.time;
  let query = { clientID: req.params.clientID };
  console.log(query);
  console.log(req.params.clientID);

  ClientDetails.updateOne(query, client, err => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log('found and updated');
      req.flash('success', 'Account Updated');
      res.redirect('/client/dashboard/home/' + req.params.id);
    }
  });
});

router.post('/images/:clientID/:id', (req, res) => {
  console.log(req.path);

  const image_path = req.path;
  autoRotate(image_path);
  const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb) {
      cb(
        null,
        file.fieldname + '-' + Date.now() + path.extname(file.originalname)
      );
    }
  });
  function checkFileType(files, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(
      path.extname(files.originalname).toLowerCase()
    );
    // Check mime
    const mimetype = filetypes.test(files.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images only!');
    }
  }

  // Initialise Upload
  const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 },
    fileFilter: function(req, file, cb) {
      checkFileType(file, cb);
    }
  }).single('profilePic');
  upload(req, res, err => {
    if (err) {
      console.log(err);
    } else {
      let client = {};
      if (empty(req.file)) {
        console.log('no picture chosen');
        Client.findById(req.params.id, (err, client) => {
          //console.log(client)
          var query = { clientID: client.clientID };
          ClientDetails.find(query, (err, client_details) => {
            //console.log(client_details[0]);
            res.render('client/client_dashboard', {
              client: client,
              clientDetails: client_details[0],
              picUpdate: false
            });
          });
        });
        // res.redirect('/cleaner/dashboard/home/' + req.params.id);
        return;
      }
      client.profilePic = req.file.filename;
      let query = { clientID: req.params.clientID };
      ClientDetails.updateOne(query, client, err => {
        if (err) {
          console.log(err);
          return;
        } else {
          console.log('found and updated');
          req.flash('success', 'Picture Updated');
          res.redirect('/client/dashboard/home/' + req.params.id);
        }
      });
    }
  });
});

module.exports = router;
