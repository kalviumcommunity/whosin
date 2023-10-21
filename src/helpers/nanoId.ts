import { customAlphabet } from 'nanoid';
import { nanoIdConfig } from '../config/app.config';

const { KEY_ALPHABET, SESSION_ID_SIZE, KEY_SIZE } = nanoIdConfig;

const generateId = customAlphabet(KEY_ALPHABET, SESSION_ID_SIZE);

const generateSessionId = () => generateId(SESSION_ID_SIZE);

const generateParticipantId = () => generateId(KEY_SIZE);

export default {
    generateSessionId,
    generateParticipantId
};
