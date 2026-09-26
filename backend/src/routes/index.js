import { Router } from 'express';
import domainRoutes from './domainRoutes.js';
import questionRoutes from './questionRoutes.js';

const router = Router();

router.use('/domains', domainRoutes);
router.use('/questions', questionRoutes);

export default router;
