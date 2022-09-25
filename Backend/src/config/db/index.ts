import mongoose from 'mongoose';
import * as bluebird from 'bluebird';
import { MONGO_DATABASE } from '../../constants';

export class Mongoose {
    private connected: boolean;
    private mongooseInstance;
    
    constructor() {
        this.connected = false;
        mongoose.Promise = bluebird;

        /**
         * initial connect
         */
        if (!this.connected) {
            this.connectMongo();
        }
    }

    /**
     * Connect to mongo db using the url
     * @returns
     */
    private async connectMongo() {
        let connectionString = MONGO_DATABASE.URL;
        if (!connectionString) {
            connectionString = `mongodb://${MONGO_DATABASE.USER}:${MONGO_DATABASE.PASSWORD}@${MONGO_DATABASE.HOST}:${MONGO_DATABASE.PORT}/${MONGO_DATABASE.DB_NAME}`;
        }

        console.log(connectionString);
        const connectionOption = {
            keepAlive: true
        }

        this.mongooseInstance = mongoose.connect(connectionString, connectionOption).then(() => {
            console.info('...mongodb connected');
            this.connected = true;
        }).catch((error) => {
            console.error(error);
            this.connected = false;
        });
        return this.mongooseInstance;
    }

    /**
     * To get the mongoose instance
     * @returns
     */
    public connection() {
        return this.mongooseInstance;
    }
}
