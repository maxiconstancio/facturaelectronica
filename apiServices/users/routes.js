import { Router } from 'express';
import isAuthorized from '../../middleware/isAuthorized.js';
import validJWT from '../../middleware/validJWT.js';
import { createUser, deleteUser, getAll } from './controller.js';

const router = Router();

router.get('/', validJWT, isAuthorized(1), getAll)


router.post('/', validJWT, isAuthorized(1), createUser)

router.delete('/:email', validJWT, isAuthorized(1), deleteUser )

export default router;