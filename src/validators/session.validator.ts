import Joi from 'joi';
import ModeRegistry from '../helpers/modeRegistry';

const isValidForSessionCreation = (data: any) => {
    const modes = ModeRegistry.getRegisteredModes();

    const sessionCreationSchema = Joi.object({
        mode: Joi.string()
            .valid(...modes)
            .required(),
        start_time: Joi.date().required(),
        end_time: Joi.date().required(),
        callback: Joi.string().required(),
        participants: Joi.array().items(Joi.string()),
        metadata: Joi.any()
    });

    return sessionCreationSchema.validateAsync(data);
};

const isValidSessionId = (sessionId: string) => {
    return Joi.string().required().validateAsync(sessionId);
};

export { isValidForSessionCreation, isValidSessionId };
