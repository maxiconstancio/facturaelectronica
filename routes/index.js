import { Router } from 'express';
import invoices from '../apiServices/invoices/routes.js';
import clients from '../apiServices/clients/routes.js';
import typesDocs from '../apiServices/tiposDoc/routes.js'
import comprobantes from '../apiServices/typesInvoice/routes.js'

const router = Router();

router.use('/invoices', invoices);
router.use('/clients', clients);
router.use('/typesdocs', typesDocs);
router.use('/comprobantes', comprobantes);


export default router;
