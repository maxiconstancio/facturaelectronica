import { Router } from 'express';
import { getWsaa, registerInvoice, getAll } from './controllers.js';
import { getInvoice } from '../../middleware/invoice.js';
import { FECompUltimoAutorizado } from '../../services/afip/wsfe.js';

const router = Router();

// Get Authorization Token and Key
router.get('/auth', getWsaa);

//Get Autorizathion CAE and Register Invoice
router.post('/invoice', getInvoice, registerInvoice)


//Get All Invoices 

router.get('/', getAll);



export default router;