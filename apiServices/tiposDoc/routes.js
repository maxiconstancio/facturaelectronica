import { Router } from 'express';
import validJWT from '../../middleware/validJWT.js';
import { getAll } from './controllers.js';

const router = Router();


router.get('/', validJWT, isAuthorized(2), getAll)

export default router;