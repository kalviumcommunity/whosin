import redis from 'redis';
import { Session } from '../types/session';

import { redisConfig } from '../config/app.config';
import logger from '../logger';
import { REDIS_CONTEXT } from '../config/loggerContexts';

const redisClient = redis.createClient(redisConfig);

const connectRedisClient = async () => {
    try {
        await redisClient.connect();
        logger.info(REDIS_CONTEXT, 'Redis client connected.');
    } catch (error) {
        logger.error(
            REDIS_CONTEXT,
            'Error connecting to Redis client: ',
            error.message
        );

        // propagate the error to the calling code for higher-level handling
        throw error;
    }
};

const initialize = async () => {
    await connectRedisClient();
};

const setSession = async (sessionInfo: Session) => {
    const sessionKey = `session:${sessionInfo.session_id}`;

    const { logs, ...rest } = sessionInfo; // eslint-disable-line

    const session = {
        ...rest,
        participants: JSON.stringify(sessionInfo.participants),
        metadata: JSON.stringify(sessionInfo.metadata)
    };

    await redisClient.hSet(sessionKey, session);
};

const getSession = async (sessionId: string): Promise<Session | null> => {
    const sessionKey = `session:${sessionId}`;

    const entries = await redisClient.hGetAll(sessionKey);

    // check if the session exists
    if (Object.keys(entries).length === 0) return null;

    return {
        ...entries,
        participants: JSON.parse(entries.participants),
        metadata: JSON.parse(entries.metadata)
    } as Session;
};

const getSessions = async () => {
    // get the session from the redis database
    const sessionKeys = await redisClient.keys('session:*');

    // trim the session key prefix
    return sessionKeys.map((key) => key.replace('session:', ''));
};

const log = async ({ session_id, mode }: Session, data: object) => {
    const keyName = `logs:${mode}:${session_id}`;

    const message = JSON.stringify({ ...data, timestamp: Date.now() });

    await redisClient.rPush(keyName, message);
};

const getLogs = async ({ session_id, mode }: Session) => {
    const keyName = `logs:${mode}:${session_id}`;

    const entries = await redisClient.lRange(keyName, 0, -1);

    return entries.map((entry) => {
        try {
            return JSON.parse(entry);
        } catch (error) {
            return entry;
        }
    });
};

const clearSession = async ({ session_id, mode }: Session) => {
    const sessionKey = `session:${session_id}`;
    const sessionLogKey = `logs:${mode}:${session_id}`;

    // check if the session exists
    if (!(await redisClient.exists(sessionKey))) return;
    if (!(await redisClient.exists(sessionLogKey))) return;

    await redisClient.del(sessionKey);
    await redisClient.del(sessionLogKey);
};

const acquireLock = async (key: string, ttlInSeconds?: number) => {
    const lockKey = `lock:${key}`;

    const lock = await redisClient.setNX(lockKey, 'OK');
    logger.info(
        REDIS_CONTEXT,
        lock
            ? `Lock ${lockKey} acquired.`
            : `Failed to acquire lock: ${lockKey}.`
    );

    // set the ttl for the lock
    if (lock) {
        await redisClient.expire(lockKey, ttlInSeconds ?? 10);
    }

    return lock;
};

const releaseLock = async (key: string) => {
    const lockKey = `lock:${key}`;

    if (!(await redisClient.exists(lockKey))) return;

    await redisClient.del(lockKey);
    logger.info(REDIS_CONTEXT, `Lock ${lockKey} released.`);
};

export default {
    initialize,
    getSessions,
    setSession,
    getSession,
    log,
    getLogs,
    clearSession,
    acquireLock,
    releaseLock
};
