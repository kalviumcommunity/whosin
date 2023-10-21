import { Session, SessionCreationAttrs } from '../types/session';

interface BaseMode {
    modeName: string;

    createSession(sessionInfo: SessionCreationAttrs): Promise<Session>;
    getSessionInfo(sessionInfo: Session, data: any): Promise<Session>;
    updateSession(sessionInfo: Session, data: Session): Promise<Session>;
    deleteSession(sessionInfo: Session): Promise<Session>;
    recordEntry(sessionInfo: Session, data: any): Promise<Session>;
    getSessionReport(sessionInfo: Session): Promise<Session>;
}

export default BaseMode;
