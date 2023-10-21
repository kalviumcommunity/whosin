import { Session } from '../../types/session';

const _sanitizeParticipants = (participants: any[]): any[] => {
    // delete key from the participants
    return participants.map(({ id, status }) => ({ id, status }));
};

const _sanitizeFacilitators = (facilitators: any[]): any[] => {
    return facilitators.map(({ id }) => ({ id }));
};

const formatLogs = (logs: any[]): any[] => {
    // format the logs as [action, data]
    return logs.map((log: { action: string; data: any | null, timestamp: number }) => {
        const { action, data, timestamp } = log;

        return `[${timestamp},${action},${data}]`;
    });
};

const manualTransformer = {
    transform: (data: Session, logs?: object[], withKeys = false): Session => {
        return {
            session_id: data.session_id,
            mode: data.mode,
            start_time: new Date(data.start_time).toISOString(),
            end_time: new Date(data.end_time).toISOString(),
            participants: withKeys
                ? data.participants
                : _sanitizeParticipants(data.participants),
            callback: data.callback,
            metadata: {
                ...data.metadata,
                facilitators: withKeys
                    ? data.metadata.facilitators
                    : _sanitizeFacilitators(data.metadata.facilitators)
            },
            logs: logs ? formatLogs(logs) : null
        };
    }
};

export { manualTransformer };
