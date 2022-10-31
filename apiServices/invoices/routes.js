import { Router } from 'express';
import { getInvoice, getWsaa } from './controllers.js';


const router = Router();

router.get('/auth', getWsaa);

router.post('/invoice', getInvoice)

export default router;