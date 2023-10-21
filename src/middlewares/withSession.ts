import { NextFunction, Response } from 'express';

import redisClient from '../helpers/redisClient';
import { SessionRequest } from '../types/session';
import { isValidSessionId } from '../validators/session.validator';
import { NotFoundError } from '../errors/apiErrors';

export default async (
    req: SessionRequest,
    _res: Response,
    next: NextFunction
) => {
    const { sessionId } = req.params;

    const validatedSessionId = await isValidSessionId(sessionId);

    const sessionInfo = await redisClient.getSession(validatedSessionId);

    if (!sessionInfo) {
        next(new NotFoundError('Session not found'));
    }

    req.sessionInfo = sessionInfo;

    next();
};
