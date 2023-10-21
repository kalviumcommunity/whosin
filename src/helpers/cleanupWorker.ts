import axios from 'axios';

import logger from '../logger';
import { SESSION_CONTEXT } from '../config/loggerContexts';
import { Session } from '../types/session';

import redisClient from './redisClient';
import ModeRegistry from './modeRegistry';

export default class CleanupWorker {
    static async start() {
        try {
            const sessionIds = await redisClient.getSessions();

            const clearPromises = sessionIds.map(async (sessionId) => {
                const session = await redisClient.getSession(sessionId);
                if (new Date(session.end_time) < new Date()) {
                    return this._clearSession(session);
                }
                return false;
            });

            const clearedSessions = await Promise.all(clearPromises);
            const clearedSessionsCount = clearedSessions.filter(Boolean).length;

            logger.info(
                SESSION_CONTEXT,
                `Cleared ${clearedSessionsCount} of ${sessionIds.length} sessions.`
            );
        } catch (error) {
            logger.error(
                SESSION_CONTEXT,
                'Error during cleanup: ',
                error.message
            );
        }
    }

    private static async _clearSession(session: Session) {
        try {
            logger.info(
                SESSION_CONTEXT,
                `Clearing session ${session.session_id}`
            );

            const lock = await redisClient.acquireLock(session.session_id, 10);

            if (!lock) return false;

            const modeInstance = ModeRegistry.getMode(session.mode);

            const sessionInfo = await modeInstance.getSessionReport(session);

            await this._createCallbackSender(session.callback)(sessionInfo);

            await modeInstance.deleteSession(session);

            await redisClient.clearSession(sessionInfo);

            return true;
        } catch (error) {
            logger.error(
                SESSION_CONTEXT,
                `Error clearing session ${session.session_id}: ${error.message}`
            );
            return false;
        } finally {
            await redisClient.releaseLock(session.session_id);
        }
    }

    private static _createCallbackSender(url: string) {
        const instance = axios.create({
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return async function (session: any) {
            return await instance.post(url, session);
        };
    }
}
