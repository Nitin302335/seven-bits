import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import {router} from './routes/v1';
import * as config from './config';
import * as Debug from 'debug';
import {IRequest} from './interfaces/IRequest';
import {APP} from './constants';
import { Mongoose } from './config/db';
import { MONGO_DATABASE } from './constants';
// import {companyModel} from './models/companyModel';

const debug = Debug('NT:server');
const app = express();

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// App Configs
app.use(config.trimParams);

app.use(cors({
    origin: "http://localhost:4200"
}))

app.get('/', (req: IRequest, res: express.Response) => {
    return res.json({message: 'REST API is working !'});
});

app.listen(APP.NODE_PORT, async () => {
    /**
     * Initialize the Tables Relation
     */
    // await relation.init();
    try {
        await new Mongoose().connection();
        debug(`${MONGO_DATABASE.DB_NAME} connected`);
    } catch (err) {
        debug(`Unable to connect to the database: ${err}`);
    }
    debug(`Express server listening on port ${APP.NODE_PORT}`);
});

// This is our route middleware
app.use('/api/v1', router); // router as a layer in app

// Error handling
app.use(config.handleError);

// Handle response
app.use(config.handleSuccess);

// Handle response
app.use(config.handle404);

// Catch uncaught exceptions
process.on('uncaughtException', (error: any) => {
    // handle the error safely
    console.log('Inside uncaughtException');
    console.log(error);
    return error;
});

export {app};