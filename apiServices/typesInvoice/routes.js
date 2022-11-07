import { Router } from 'express';
import { getAll } from './controllers.js';

const router = Router();


router.get('/', getAll)

export default router;