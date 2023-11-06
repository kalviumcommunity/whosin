import express from 'express';

import sessionController from '../controllers/session.controller';

import withSessionInfo from '../middlewares/withSession';
import withToken from '../middlewares/withToken';

const router = express.Router();

router.get('/', [withToken], sessionController.getSessions);
router.post('/', [withToken], sessionController.createSession);
router.get('/:sessionId', [withSessionInfo], sessionController.getSessionInfo);
router.post('/:sessionId', [withSessionInfo], sessionController.recordEntry);
router.patch(
    '/:sessionId',
    [withToken, withSessionInfo],
    sessionController.updateSession
);
router.delete(
    '/:sessionId',
    [withToken, withSessionInfo],
    sessionController.deleteSession
);

export default router;
