// tslint:disable-next-line: no-require-imports no-var-requires
require('dotenv').config();

export const APP = {
    NODE_ENV: process.env.NODE_ENV,
    NODE_PORT: process.env.PORT || 3050,
};

export const MONGO_DATABASE = {
    URL: process.env.MONGO_URL,
    USER: process.env.MONGO_USER ,
    PASSWORD: process.env.MONGO_PASSWORD,
    DB_NAME: process.env.MONGO_DB_NAME,
    HOST: process.env.MONGO_HOST,
    PORT: process.env.MONGO_PORT
};

export const JWT_TOKEN = {
    SECRET: process.env.JWT_SECRET || "secret",
    ALGORITHMS: 'HS512',
    EXPIRATION_TIME: {
        MINS_10: '10m',
        HOURS_10: '10h'
    }
};