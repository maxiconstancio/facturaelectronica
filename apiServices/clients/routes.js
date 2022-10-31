import { Router } from 'express';

import { getPersona, getWsaa } from './controllers.js';


const router = Router();

router.get('/auth', getWsaa);

router.get('/', getPersona);

export default router;