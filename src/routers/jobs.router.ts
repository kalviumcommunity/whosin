import express from 'express';

import jobController from '../controllers/job.controller';

const router = express.Router();

router.get('/', jobController.handle);

export default router;
