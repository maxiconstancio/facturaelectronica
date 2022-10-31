import express from 'express';
import { getWsaa, getInvoice } from '../invoices/controllers.js';
var router = express.Router();

/* GET home page. */
router.get('/auth', getWsaa);

router.post('/invoice', getInvoice);


export default router;
