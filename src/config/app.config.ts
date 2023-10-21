export const redisConfig = {
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    password: process.env.REDIS_PASSWORD
};

export const nanoIdConfig = {
    KEY_ALPHABET:
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    SESSION_ID_SIZE: 16,
    KEY_SIZE: 10
};

export const PORT = Number(process.env.PORT) || 3000;

export const LOG_LEVEL = Number(process.env.LOG_LEVEL) || 0;

export const TOKEN = process.env.TOKEN;
