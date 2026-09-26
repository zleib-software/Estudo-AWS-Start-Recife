import { Router } from 'express';
import { getDomains } from '../controllers/domainController.js';

const router = Router();

router.get('/', getDomains);

export default router;
