import { Request } from 'express';

export interface SessionCreationAttrs extends Omit<Session, 'sessionId'> {}

export interface SessionRequest extends Request {
    sessionInfo?: any;
    token?: any;
}

export enum AttendanceStatus {
    PENDING = 'pending',
    ABSENT = 'absent',
    PRESENT = 'present'
}

export interface Session {
    session_id: string;
    start_time: string;
    end_time: string;
    callback: string;
    mode: string;
    participants: any[];
    metadata: any;
    logs?: any[];
}
