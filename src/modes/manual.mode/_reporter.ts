import redisClient from '../../helpers/redisClient';
import { Session } from '../../types/session';

const reporter = {
    report: async (
        session: Session,
        userKey?: string,
        isAdmin = false
    ): Promise<{
        session: Session;
        logs: any[];
    }> => {
        const logs = await redisClient.getLogs(session);

        const participants = _calculateAttendance(logs, session.participants);

        if (isAdmin) {
            return {
                session: {
                    ...session,
                    participants
                },
                logs
            };
        }

        const isFacilitatorOrParticipant = _isFacilitatorOrParticipant(
            userKey,
            session.metadata.facilitators,
            session.participants
        );

        const facilitators = _filterFacilitators(
            session.metadata.facilitators,
            userKey
        );

        return {
            session: {
                ...session,
                participants: isFacilitatorOrParticipant ? participants : [],
                metadata: {
                    ...session.metadata,
                    facilitators
                }
            },
            logs: isFacilitatorOrParticipant ? logs : []
        };
    }
};

const _isFacilitatorOrParticipant = (
    userKey: string,
    facilitators: any[],
    participants: any[]
): boolean => {
    return (
        facilitators.some((f) => f.key === userKey) ||
        participants.some((p) => p.key === userKey)
    );
};

const _filterFacilitators = (facilitators: any[], userKey: string): any[] => {
    const facilitator = facilitators.find((f) => f.key === userKey);
    return facilitator ? [facilitator] : [];
};

const _calculateAttendance = (
    logs: { action: string; data: any }[],
    participants: any[]
): any[] => {
    const defaultStatus = 'pending';

    const participantsMap = new Map();

    participants.forEach((participant) => {
        participantsMap.set(participant.id, {
            id: participant.id,
            key: participant.key,
            status: defaultStatus
        });
    });

    logs.forEach((log) => {
        const { action, data } = log;

        if (action === 'mark') {
            const [, participantId, status] = data;
            const participant = participantsMap.get(participantId);
            if (participant) {
                participant.status = status;
            }
        }
    });

    return Array.from(participantsMap.values());
};

export { reporter };
