import Joi from 'joi';

import nanoId from '../../helpers/nanoId';
import redisClient from '../../helpers/redisClient';
import {
    AttendanceStatus,
    Session,
    SessionCreationAttrs
} from '../../types/session';
import BaseMode from '../baseMode';

import { reporter } from './_reporter';
import { manualTransformer } from './_transformer';

class ManualMode implements BaseMode {
    modeName: string = 'MANUAL';

    async createSession(sessionInfo: SessionCreationAttrs): Promise<Session> {
        const { metadata, ...otherInfo } = sessionInfo;

        const facilitators = this._generateFacilitatorsKeys(
            metadata.facilitators
        );

        const participants = this._generateParticipantsKeys(
            sessionInfo.participants
        );

        const session: Session = {
            session_id: nanoId.generateSessionId(),
            ...otherInfo,
            participants,
            metadata: { ...metadata, facilitators }
        };

        this._logToRedis(session, 'create', null);

        return manualTransformer.transform(session, null, true);
    }

    async getSessionInfo(sessionInfo: Session, data: any): Promise<Session> {
        const { key } = data;

        const report = await reporter.report(sessionInfo, key);

        return manualTransformer.transform(report.session, report.logs);
    }

    async updateSession(
        sessionInfo: Session,
        sessionData: any
    ): Promise<Session> {
        const { metadata, ...otherInfo } = sessionData;

        const session: Session = {
            ...sessionInfo,
            ...otherInfo,
            metadata: { ...sessionInfo.metadata, ...metadata }
        };

        this._logToRedis(session, 'update', null);

        const report = await reporter.report(session);

        return manualTransformer.transform(report.session, report.logs);
    }

    async deleteSession(sessionInfo: Session): Promise<Session> {
        const report = await reporter.report(sessionInfo);

        const session = manualTransformer.transform(
            report.session,
            report.logs,
            true
        );

        await redisClient.clearSession(sessionInfo);

        return session;
    }

    async recordEntry(sessionInfo: Session, data: any): Promise<Session> {
        const { action, params, key } = data;

        const facilitatorsMap = new Map<string, any>(
            sessionInfo.metadata.facilitators.map((obj) => [obj.key, obj])
        );

        const participantsMap = new Map<string, any>(
            sessionInfo.participants.map((obj) => [obj.key, obj])
        );

        const validatedRecord = await this._isValidRecord(action, params);

        if (validatedRecord.action === 'mark') {
            const facilitator = facilitatorsMap.get(key);

            if (!facilitator) {
                const report = await reporter.report(sessionInfo, key);
                return manualTransformer.transform(report.session, report.logs);
            }

            const logPromises: Promise<void>[] = [];

            for (const [participantKey, value] of Object.entries(
                validatedRecord.params
            )) {
                const participant = participantsMap.get(participantKey);

                if (!participant) return;

                logPromises.push(
                    this._logToRedis(sessionInfo, 'mark', [
                        facilitator.id,
                        participant.id,
                        value
                    ])
                );
            }

            await Promise.all(logPromises);
        }

        const report = await reporter.report(sessionInfo, key);

        return manualTransformer.transform(report.session, report.logs);
    }

    async getSessionReport(sessionInfo: Session): Promise<Session> {
        const report = await reporter.report(sessionInfo, null, true);

        const session = manualTransformer.transform(
            report.session,
            report.logs
        );

        return session;
    }

    private _isValidRecord = (action: any, params: any) => {
        const schema = Joi.object({
            action: Joi.string()
                .valid('mark')
                .required()
                .messages({ 'any.only': 'Invalid action type.' }),
            params: Joi.object()
                .pattern(
                    Joi.string(),
                    Joi.string().valid(...Object.values(AttendanceStatus))
                )
                .required()
                .messages({ 'any.only': 'Invalid attendance status.' })
        });

        return schema.validateAsync({ action, params });
    };

    private _generateFacilitatorsKeys(facilitators: any) {
        return facilitators.map((facilitator: any) => ({
            id: facilitator,
            key: nanoId.generateParticipantId()
        }));
    }

    private _generateParticipantsKeys = (participants: any[]) => {
        return participants.map((participant) => ({
            id: participant,
            key: nanoId.generateParticipantId(),
            status: 'pending'
        }));
    };

    private async _logToRedis(
        session: Session,
        action: string,
        data: object
    ): Promise<void> {
        return await redisClient.log(session, { action, data });
    }
}

export default ManualMode;
