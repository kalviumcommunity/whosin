import Joi from 'joi';

const isModeInstanceValid = (mode: any) => {
    const modeSchema = Joi.object({
        modeName: Joi.string().required().label('modeName'),
        createSession: Joi.func().required().label('createSession'),
        getSessionInfo: Joi.func().required().label('getSessionInfo'),
        updateSession: Joi.func().required().label('updateSession'),
        deleteSession: Joi.func().required().label('deleteSession'),
        recordEntry: Joi.func().required().label('recordEntry')
    })
        .unknown(true)
        .required()
        .label('modeInstance');

    return modeSchema.validateAsync(mode);
};

export { isModeInstanceValid };
