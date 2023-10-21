import express from 'express';

import jobRouter from './routers/jobs.router';
import sessionRouter from './routers/session.router';

const router = express.Router();

router.use('/jobs', jobRouter);
router.use('/sessions', sessionRouter);

export default router;
