import { Router } from 'express';
import { getWsaa, registerInvoice } from './controllers.js';
import { getInvoice } from '../../middleware/invoice.js';

const router = Router();

router.get('/auth', getWsaa);

router.post('/invoice', getInvoice, registerInvoice)

export default router;