import * as path from 'path';
import './envloader';
import app from './app';
import { PORT } from './config/app.config';
import { EXPRESS_CONTEXT } from './config/loggerContexts';
import ModeRegistry from './helpers/modeRegistry';
import redisClient from './helpers/redisClient';
import logger from './logger';

// Initialize the redis client
redisClient.initialize();

// Register the modes
ModeRegistry.modesRegisterFromDir(path.join(__dirname, 'modes'));

app.listen(PORT, () => {
    logger.info(EXPRESS_CONTEXT, `Server running on port ${PORT}`);
});
