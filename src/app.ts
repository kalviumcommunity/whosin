import express from 'express';
import cors from 'cors';

import routes from './router';
import errorHandler from './middlewares/globalErrorHandler';
import requestLogger from './middlewares/requestLogger';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(requestLogger);
app.use(routes);
app.use(errorHandler);

app.get('/', (_: any, res: any) => {
    return res.status(200).json({ message: 'ok' });
});

export default app;
