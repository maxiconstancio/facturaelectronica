import { Router } from 'express';
import { getWsaa, registerInvoice, getAll } from './controllers.js';
import { getInvoice } from '../../middleware/invoice.js';
import { FECompUltimoAutorizado } from '../../services/afip/wsfe.js';
import validJWT from '../../middleware/validJWT.js';
import isAuthorized from '../../middleware/isAuthorized.js';

const router = Router();

// Get Authorization Token and Key
router.get('/auth', validJWT, isAuthorized(2), getWsaa);

//Get Autorizathion CAE and Register Invoice
router.post('/invoice', validJWT, isAuthorized(2), getInvoice, registerInvoice)


//Get All Invoices 

router.get('/', validJWT, isAuthorized(2), getAll);



export default router;