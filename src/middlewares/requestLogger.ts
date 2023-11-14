/* eslint-disable indent */
import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';

import logger from '../logger';
import { EXPRESS_CONTEXT } from '../config/loggerContexts';

export default (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();

    res.on('finish', () => {
        const responseTime = Date.now() - start;

        const { method, originalUrl } = req;
        const { statusCode } = res;

        const statusColor =
            statusCode >= 500
                ? 'red'
                : statusCode >= 400
                ? 'yellow'
                : statusCode >= 300
                ? 'cyan'
                : 'green';

        const methodColor =
            method === 'GET'
                ? 'cyan'
                : method === 'POST'
                ? 'magenta'
                : method === 'PUT'
                ? 'blue'
                : method === 'DELETE'
                ? 'red'
                : 'gray';

        const statusLabel = chalk[statusColor].bold(`[${statusCode}]`);
        const methodLabel = chalk[methodColor].bold(`${method}`);
        const urlLabel = chalk['green'].bold(`\`${originalUrl}\``);

        logger.info(
            EXPRESS_CONTEXT,
            `${methodLabel} ${urlLabel} ${statusLabel} ${responseTime}ms.`
        );
    });
    next();
};