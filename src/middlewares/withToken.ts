import { NextFunction, Response } from 'express';

import { TOKEN } from '../config/app.config';
import { SessionRequest } from '../types/session';
import { BadRequestError } from '../errors/apiErrors';

export default async (
    req: SessionRequest,
    _res: Response,
    next: NextFunction
) => {
    // get the token from the header
    const token = req.headers.authorization?.split(' ')[1];

    if (token !== TOKEN) {
        next(new BadRequestError('Invalid token found'));
    }

    req.token = token;

    next();
};
