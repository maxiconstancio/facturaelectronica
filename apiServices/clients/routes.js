import { Router } from 'express';

import { getPersona, getWsaa } from '../../middleware/clients.js';  
import {createClient, findClient, getAllClients, delClient, getStatus } from './controllers.js'

const router = Router();

//Gen WS Token and Key 
router.get('/auth', getWsaa);

//WS Dummy 

router.get('/status', getStatus)

//Get Client Information  and save
router.post('/new', getPersona, createClient);

//Get All Client
router.get('/', getAllClients);

//Get Client
router.get('/find', findClient);


//delete Client
router.delete('/:cuit', delClient);



export default router;