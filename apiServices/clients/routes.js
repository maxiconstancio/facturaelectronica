import { Router } from 'express';

import { getPersona, getWsaa } from '../../middleware/clients.js';
import createClient from './controllers.js'

const router = Router();

router.get('/auth', getWsaa);

router.get('/', getPersona, createClient);

export default router;