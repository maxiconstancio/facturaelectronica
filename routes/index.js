import { Router } from 'express';
import invoices from '../apiServices/invoices/routes.js';
import clients from '../apiServices/clients/routes.js';

const router = Router();

router.use('/invoices', invoices);
router.use('/clients', clients)


export default router;
