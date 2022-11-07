import { Router } from 'express';

import { getPersona, getWsaa } from '../../middleware/clients.js';  
import isAuthorized from '../../middleware/isAuthorized.js';
import validJWT from '../../middleware/validJWT.js';
import {createClient, findClient, getAllClients, delClient, getStatus } from './controllers.js'

const router = Router();

//Gen WS Token and Key 
router.get('/auth', validJWT, isAuthorized(2), getWsaa);

//WS Dummy 

router.get('/status',validJWT, isAuthorized(2), getStatus)

//Get Client Information  and save
router.post('/new', validJWT, isAuthorized(2), getPersona, createClient);

//Get All Client
router.get('/', validJWT, isAuthorized(2), getAllClients);

//Get Client
router.get('/find', validJWT, isAuthorized(2), findClient);


//delete Client
router.delete('/:cuit', validJWT, isAuthorized(2), delClient);



export default router;