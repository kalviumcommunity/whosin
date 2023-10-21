import { NextFunction, Request, Response } from 'express';

import sessionService from '../services/session.service';
import logger from '../logger';
import { SessionRequest } from '../types/session';
import { UnauthenticatedError } from '../errors/apiErrors';
import { isValidForSessionCreation } from '../validators/session.validator';
import { SESSION_CONTEXT } from '../config/loggerContexts';

const getSessions = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const sessions = await sessionService.getSessions();
        const modes = sessionService.getAvailableModes();

        return res.status(200).json({ sessions, modes });
    } catch (error) {
        next(error);
    }
};

const createSession = async (
    req: SessionRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.token) {
            throw new UnauthenticatedError('Not allowed to create a session.');
        }

        const validatedSession = await isValidForSessionCreation(req.body);

        const sessionInfo =
            await sessionService.createSession(validatedSession);

        return res.status(200).json(sessionInfo);
    } catch (error) {
        logger.error(
            SESSION_CONTEXT,
            'Error creating session: ',
            error.message
        );

        next(error);
    }
};

const getSessionInfo = async (
    req: SessionRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = {
            ...req.body,
            ...req.query,
            ...req.params,
            isAdmin: !!req.token
        };

        const sessionInfo = await sessionService.getSessionInfo(
            req.sessionInfo,
            data
        );

        return res.status(200).json(sessionInfo);
    } catch (error) {
        logger.error(
            SESSION_CONTEXT,
            'Error getting session info: ',
            error.message
        );
        next(error);
    }
};

const updateSession = async (
    req: SessionRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const validatedSession = await isValidForSessionCreation(req.body);

        const sessionInfo = await sessionService.updateSession(
            req.sessionInfo,
            validatedSession
        );

        return res.status(200).json(sessionInfo);
    } catch (error) {
        logger.error(
            SESSION_CONTEXT,
            'Error updating session: ',
            error.message
        );
        next(error);
    }
};

const deleteSession = async (
    req: SessionRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const sessionInfo = await sessionService.deleteSession(req.sessionInfo);

        return res.status(200).json(sessionInfo);
    } catch (error) {
        logger.error(
            SESSION_CONTEXT,
            'Error deleting session: ',
            error.message
        );
        next(error);
    }
};

const recordEntry = async (
    req: SessionRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = {
            ...req.body,
            ...req.query,
            ...req.params,
            isAdmin: !!req.token
        };

        const sessionInfo = await sessionService.recordEntry(
            req.sessionInfo,
            data
        );

        return res.status(200).json(sessionInfo);
    } catch (error) {
        logger.error(SESSION_CONTEXT, 'Error recording entry: ', error.message);
        next(error);
    }
};

export default {
    getSessions,
    getSessionInfo,
    createSession,
    updateSession,
    deleteSession,
    recordEntry
};
