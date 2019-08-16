import { Router } from 'express';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

import Client from '../../model/client/client';
import ClientDetails from '../../model/client/clientDetails';
import CleanerDetails from '../../model/cleaner/cleanerDetails';
import CleaningSchedule from '../../model/cleaningSchedule';
import Wallet from '../../model/cleaner/cleanerWallet';



export default ({config, db}) =>{
    let api = Router();

    api.get('/home/:id', (req, res) =>{
        let result = {};
        let statusCode = 200;

        Cleaner.findById(req.params.id, (err, cleaner) =>{
            // result.Clea
            var query = {cleanerID: cleaner.cleanerID};
            CleanerDetails.find((query), (err, cleaner_details)=>{
                if(err) {
                    let statusCode = 400;
                    let error = err;
                    result.statusCode = statusCode;
                    result.error = error;
                    res.status(statusCode).send(result);
                }
                
            });
        });
    });

    return api;
}
