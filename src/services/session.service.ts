import { BadRequestError } from '../errors/apiErrors';
import ModeRegistry from '../helpers/modeRegistry';
import redisClient from '../helpers/redisClient';
import { Session, SessionCreationAttrs } from '../types/session';

const getSessions = async () => {
    return await redisClient.getSessions();
};

const getAvailableModes = () => {
    return ModeRegistry.getRegisteredModes();
};

const createSession = async (data: SessionCreationAttrs) => {
    if (!ModeRegistry.isModeRegistered(data.mode)) {
        throw new BadRequestError('Mode not registered.');
    }

    const modeInstance = ModeRegistry.getMode(data.mode);

    const sessionInfo = await modeInstance.createSession(data);

    redisClient.setSession(sessionInfo);

    return sessionInfo;
};

const getSessionInfo = async (sessionInfo: Session, data: any) => {
    const modeInstance = ModeRegistry.getMode(sessionInfo.mode);

    const session = await modeInstance.getSessionInfo(sessionInfo, data);

    return session;
};

const updateSession = async (sessionInfo: Session, data: any) => {
    const modeInstance = ModeRegistry.getMode(sessionInfo.mode);

    const session = await modeInstance.updateSession(sessionInfo, data);

    return session;
};

const deleteSession = async (sessionInfo: Session) => {
    const modeInstance = ModeRegistry.getMode(sessionInfo.mode);

    const session = await modeInstance.deleteSession(sessionInfo);

    return session;
};

const recordEntry = async (sessionInfo: Session, data: any) => {
    const modeInstance = ModeRegistry.getMode(sessionInfo.mode);

    const session = await modeInstance.recordEntry(sessionInfo, data);

    return session;
};

export default {
    getSessions,
    getAvailableModes,
    createSession,
    getSessionInfo,
    updateSession,
    deleteSession,
    recordEntry
};
