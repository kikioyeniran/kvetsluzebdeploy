import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initializeDB from '../db';

// import cleaner from '../controller/cleaner/cleaner.account';
// import booking from '../controller/booking/booking.request'

import clientAccount from '../controller/client/client.account';
import cleanerAccount from '../controller/cleaner/cleaner.account';
import bookingRequest from '../controller/booking/booking.request';
import client from '../controller/client/client';


let router = express();

// connect to DB
initializeDB(db => {
    // internal middleware
    router.use(middleware({config, db}));
    // /api/v1/booking/cleaner/
    // api routes (/api/v1)
    router.use('/cleaner/account' , cleanerAccount({config, db}));
    router.use('/booking', bookingRequest({config, db}));
    
    router.use('/client', client({config, db}));
    router.use('/client/account', clientAccount({config, db}));
});

export default router; 