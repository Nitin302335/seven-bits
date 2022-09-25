import * as express from 'express';
import * as Boom from 'boom';
import * as utils from '../utils/index';
import * as _ from 'lodash';
import * as Debug from 'debug';
import {IRequest} from '../interfaces/IRequest';

const debug = Debug('NT:AppConfig');

/**
 * Format success api response
 * @param data actual response of api
 * @returns
 */
export function formatAppSuccess(data?: any) {
    return {
        success: true,
        code: "Success",
        msg: "Operation completed successfully",
        data
    };
}

/**
 * Trim body and query params to avoid getting invalid data
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const trimParams: express.RequestHandler = (req: IRequest, res: express.Response, next: express.NextFunction) => {
    debug('Inside trimParams');
    debug('API : %o', utils.url(req) + req.url);
    debug('req.method : %o ', req.method);
    if (req.method === 'OPTIONS') {
        req.data = {message: true};
    }
    // Trim query and post parameters
    _.each(req.body, (value, key) => {
        if ((_.isString(value) && !_.isEmpty(value))) {
            req.body[key] = value.trim();
        }
    });

    _.each(req.query, (value, key) => {
        if ((_.isString(value) && !_.isEmpty(value))) {
            req.query[key] = value.trim();
        }
    });
    debug('req.body : %o ', req.body);
    debug('req.query : %o ', req.query);

    return next();
};

/**
 * Its a middleware used to handle the api success
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const handleSuccess: express.RequestHandler = (req: IRequest, res: express.Response, next: express.NextFunction) => {
    if (req.data === undefined) {
        debug('Return from undefined req.session.data ');
        return next();
    }
    const resObject: object = req.data || [];
    debug('Success response :: ');
    debug(resObject);
    debug('----------------------------------------------------------------------------------- ');
    return res.json(resObject);
};

/**
 * Its a middleware used to handle the 404 errors (when api endpoint not exist)
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const handle404 = (req: IRequest, res: express.Response, next: express.NextFunction) => {
    return next(Boom.notFound('' + req.method + ': Invalid request ' + utils.url(req) + req.url));
};

/**
 * Its a middleware used to handle errors and build the error response
 * @param err
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const handleError: express.ErrorRequestHandler = (err: any, req: IRequest, res: express.Response, next: express.NextFunction) => {
    if (!err) {
        return next();
    }

    let errorResponse = {};
    if (err.output && err.output.payload) {
        errorResponse = {
            stack: err.stack,
            error: err.output.payload.message,
            message: err.output.payload.error,
            statusCode: err.output.payload.statusCode || 404
        };
    } else {
        errorResponse = {
            stack: err.stack,
            error: err.error || err.type || err.message,
            message: err.message,
            statusCode: err.statusCode || 404
        };
    }


    debug('Error :: ');
    debug(errorResponse);
    res.status(err.statusCode ? err.statusCode : err.statusCode || 404).json(errorResponse);
    res.end();
};
