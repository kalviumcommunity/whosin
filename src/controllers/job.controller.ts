import { Request, Response } from 'express';
import CleanupWorker from '../helpers/cleanupWorker';

const handle = async (_req: Request, res: Response) => {
    // Clean up worker
    await CleanupWorker.start();

    res.send({ message: 'ok' });
};

export default {
    handle
};
