import { Router } from 'express';
import mongoose from 'mongoose';

import Booking from '../../model/booking/booking.requests';
import Client from '../../model/client/client';
import ClientDetails from '../../model/client/client.details';
import Cleaner from '../../model/cleaner/cleaner';
import CleanerDetails from '../../model/cleaner/cleaner.details';

export default ({config, db}) => {
    let api = Router();

    // '/api/v1/booking/request'
    api.post('/request', (req, res)=>{
        let result = {};

        const { clientID, clientName, clientPhone, clientEmail, extraTasks, hours, moreHours, priority, accessType, keyHiddenPin, keySafePin, frequency, dateFirstClean, postcode, address, city } = req.body;
        const selectedCleaner0 = req.body.selectedCleaner0;
        const selectedCleaner1 = req.body.selectedCleaner1;
        const selectedCleaner2 = req.body.selectedCleaner2;
        const selectedCleanerID0 = req.body.selectedCleanerID1;
        const selectedCleanerID1 = req.body.selectedCleanerID1;
        const selectedCleanerID2 = req.body.selectedCleanerID2;
        const selectedCleaners = [selectedCleaner0, selectedCleaner1, selectedCleaner2];
        const selectedCleanerIDs = [selectedCleanerID0, selectedCleanerID1, selectedCleanerID2];
        const status = false;

        res.json({'clientID': clientID},{'SelectedCleaners': selectedCleaners},{'selectedCleanerIDs': selectedCleanerIDs});

        req.checkBody('clientID', 'clientID is required').notEmpty();
        req.checkBody('clientName', 'clientName is required').notEmpty();
        req.checkBody('clientPhone', 'clientPhone is required').notEmpty();
        req.checkBody('clientEmail', 'clientEmail is required').notEmpty();
        req.checkBody('extraTasks', 'extraTasks is required').notEmpty();
        req.checkBody('hours', 'Cleaning hours is required').notEmpty();
        req.checkBody('accessType', 'Apartment access type is required').notEmpty();
        req.checkBody('frequency', 'Cleaning frequency is required').notEmpty();
        req.checkBody('dateFirstClean', 'Date of First Clean is required').notEmpty();
        req.checkBody('postcode', 'Postcode is required').notEmpty();
        req.checkBody('address', 'address is required').notEmpty();
        req.checkBody('city', 'City is required').notEmpty();

        let errors  = req.validationErrors();
        if(errors) {
            let result = {};
            let status = 400;
            result.status = status;
            result.error = errors;
            res.status(status).send(result);
        } else {
            let newRequest = Booking({
                clientID : clientID,
                clientName: clientName,
                clientEmail: clientEmail,
                clientPhone: clientPhone,
                extraTasks: extraTasks,
                hours: hours,
                moreHours: moreHours,
                address: address,
                city: city,
                postcode: postcode,
                keySafePin: keySafePin,
                keyHiddenPin: keyHiddenPin,
                frequency: frequency,
                priority: priority,
                accessType: accessType,
                dateFirstClean: dateFirstClean,
                selectedCleaners: selectedCleaners,
                selectedCleanerIDs: selectedCleanerIDs,
                status: status
            });

            newRequest.save(err=>{
                if (err) {
                    let status = 400;
                    result.status = status;
                    result.error = err;
                    res.status(status).send(result);
                }

                let status = 201;
                result.status = status;
                let message = 'Request is submitted';
                result.message = message;
                res.status(status).send(result);
            });
        }
    });

    // 'api/v1/booking/final/:clientID'
    api.get('/final/:clientID', (req, res) => {
        Client.findOne(({clientID: req.params.clientID}), (err, client) =>{
            ClientDetails.findOne(({clientID: req.params.clientID}), (error, details) =>{
                CleanerDetails.find(({city: details.city}), (err, cleanerDetails) => {
                    if(!(cleanerDetails)){
                        let result = {};
                        let status = 400;
                        let errMsg = 'Cleaner Details Empty';
                        result.status = status;
                        result.errMsg = errMsg;
                        res.status(status).send(result);

                        // render the booking final page
                    }  
                    let result = {};
                    let status = 200;
                    let message = 'Cleaner Details Submited';
                    result.status = status;
                    result.message = message;
                    res.status(status).send(result);
                })
            })
        })
    });

    return api;
}
