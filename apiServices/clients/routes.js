import express from 'express';
import { getWsaa,  getPersona } from '../clients/controllers.js';
var router = express.Router();

/* GET home page. */
router.get('/auth', getWsaa);

router.post('/', getPersona);

export default router;
