import { Response, Request, NextFunction } from 'express';

import ApiError from '../errors/apiErrors';
import logger from '../logger';

export default (err: any, req: Request, res: Response, _next: NextFunction) => {
    logger.debug('GLOBAL_ERROR_HANDLER', err.stack);
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message });
    } else if (err.name === 'ValidationError') {
        return res.status(403).json({ message: err.message });
    } else {
        const status = 500;
        const message = err.message ?? 'Internal server error';

        return res.status(status).json({ message });
    }
};
