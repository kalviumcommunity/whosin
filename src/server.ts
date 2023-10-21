import './envloader';
import app from './app';
import { PORT } from './config/app.config';
import { EXPRESS_CONTEXT } from './config/loggerContexts';
import ModeRegistry from './helpers/modeRegistry';
import redisClient from './helpers/redisClient';
import logger from './logger';

import ManualMode from './modes/manual.mode/manual';

// Initialize the redis client
redisClient.initialize();

const manualMode = new ManualMode();

// Register the modes
ModeRegistry.registerModes([manualMode]);

app.listen(PORT, () => {
    logger.info(EXPRESS_CONTEXT, `Server running on port ${PORT}`);
});
