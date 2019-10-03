const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const multer  = require('multer');
const config = require('./config/database')

mongoose.connect(config.database, {useNewUrlParser: true});
let db  = mongoose.connection;

//Init App
const app = express();

//Check Connection
db.once('open', () =>{
    console.log('Connected to MongoDB');
});


//Check for DB errors
db.on('error', (err) =>{
    console.log(err);
});



//Load View Engine
app.set('views', path.join(__dirname, 'views'));
console.log(path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//parse application/json
app.use(bodyParser.json({limit: '20mb'}));
//Body Parse Middleware
app.use(bodyParser.urlencoded({ extended: false, limit: '20mb' }));



//Set Public folder
app.use(express.static(path.join(__dirname, 'public')));

//Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: true,
    resave: true
  }));

//Express Mesages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//Express Validator Middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;

      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));

//Passport Config
require('./config/passport')(passport);
// require('./config/adpassport')(passport);

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', (req, res, next)=>{
  res.locals.client = req.client || null;
  res.locals.cleaner = req.cleaner || null;
  next();
});

//Home route
app.get('/', (req, res) =>{
    res.render('index');
});

//Route Files

//Cleaner Route Files
let cleanerDashboard = require('./routes/cleaner/dashboard');
let cleanerLogin = require('./routes/cleaner/login');
let cleanerRegister = require('./routes/cleaner/register');
let cleanerEdit = require('./routes/cleaner/editDetails');
let cleanerSchedule = require('./routes/cleaner/schedule');
let paymentRequest = require('./routes/cleaner/paymentRequest');
let cancelSchedule = require('./routes/cleaner/cancelSchedule');
let wallet = require('./routes/cleaner/wallet');
let cleanerPswd = require('./routes/cleaner/pswd');


//Client Route Files
let clientDashboard = require('./routes/client/dashboard');
let clientBooking = require('./routes/client/booking');
let clientBookingFinal = require('./routes/client/bookingFinal');
let clientEdit = require('./routes/client/editDetails');
let clientRenew = require('./routes/client/renewbooking');
let clientLogin = require('./routes/client/login')
let clientPswd = require('./routes/client/pswd')
let clientTransactions = require('./routes/client/transactions')
let cancelSchedule2 = require('./routes/client/cancelSchedule');
let clientPay = require('./routes/client/pay')
let clientSuccess = require('./routes/client/success')

//General Route File
let public = require('./routes/public');
let requests = require('./routes/requests');
let ratings = require('./routes/ratings');

//Admin Route Files
let adminDashboard = require('./routes/admin/dashboard');
let adminLogin = require('./routes/admin/login');
let adminRegister = require('./routes/admin/register')
let adminPswd = require('./routes/admin/pswd')

//Cleaner Routes
app.use('/cleaner/dashboard', cleanerDashboard);
app.use('/cleaner/login', cleanerLogin);
app.use('/cleaner/register', cleanerRegister);
app.use('/cleaner/edit', cleanerEdit);
app.use('/cleaner/schedule', cleanerSchedule);
app.use('/cleaner/paymentrequest', paymentRequest);
app.use('/cleaner/cancelschedule', cancelSchedule);
app.use('/cleaner/wallet', wallet);
app.use('/cleaner/pswd', cleanerPswd);

//Client Routes
app.use('/client/dashboard', clientDashboard);
app.use('/client/booking', clientBooking);
app.use('/client/booking_final', clientBookingFinal);
app.use('/client/edit', clientEdit);
app.use('/client/renew', clientRenew);
app.use('/client/login', clientLogin);
app.use('/client/pswd', clientPswd);
app.use('/client/transactions', clientTransactions);
app.use('/client/cancelschedule', cancelSchedule2);
app.use('/client/pay', clientPay);
app.use('/client/success', clientSuccess);

//Admin Routes
app.use('/admin/dashboard', adminDashboard);
app.use('/admin/login', adminLogin);
app.use('/admin/register', adminRegister);
app.use('/admin/pswd', adminPswd);

//General Routes
app.use('/public', public);
app.use('/requests', requests);
app.use('/rating', ratings);

//Start Server
app.listen(5000, () => {
    console.log('Server started on port 5000...')
});