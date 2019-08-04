import { Router } from 'express';
import mongoose from 'mongoose';

import Client from '../../model/client/client';
import ClientDetails from '../../model/client/client.details';

export default ({config, db}) => {
    let api  = Router();

    // client Dashboard Route
    // 'api/v1/client/dashboard/:id'
    api.get('/dashboard/:id', (req, res) => {
        Client.findById(req.params.id, (err, client) => {

            let query = {clientID: client.clientID};
            ClientDetails.find((query), (err, clientDetails) => {
                if (err) {
                    let result = {};
                    let status = 400;
                    let error = err;
                    result.status = status;
                    result.error = err;
                    res.status(status).send(result);
                }
                // res.render() --> can come here 
                let status = 201;
                let result = {};
                let currentClient = client;
                let currentClientDetails = clientDetails[0];
                result.status = status;
                result.currentClient = currentClient;
                result.currentClientDetails = currentClientDetails;
                
                res.status(status).send(result);
            });
        });
    });

    return api;
}