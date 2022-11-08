import { Router } from 'express';
import invoices from '../apiServices/invoices/routes.js';
import clients from '../apiServices/clients/routes.js';
import typesDocs from '../apiServices/tiposDoc/routes.js'
import comprobantes from '../apiServices/typesInvoice/routes.js'
import user from '../apiServices/users/routes.js';
import auth from '../apiServices/auth/routes.js'

const router = Router();

router.use('/invoices', invoices);
router.use('/clients', clients);
router.use('/typesdocs', typesDocs);
router.use('/comprobantes', comprobantes);
router.use('/users', user);
router.use('/auth', auth)

export default router;
