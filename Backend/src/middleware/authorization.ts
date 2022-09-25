import * as express from 'express';
import * as Debug from 'debug';
import { authorizationService } from '../services/AuthenticateService';
import { IRequest } from '../interfaces/IRequest';
import Boom = require('boom');
import { userService } from '../services/UserService';
import { IUser, UserStatus } from '../interfaces/IUser';

const debug = Debug('NT:Authorization');

const checkRoles = (roles: string[]) => async (req, res, next) => {
    if (req.user.roles) {
        if (roles) {
            if (!Array.isArray(roles)) {
                roles = [roles];
            }

            for (const availableRole of req.user.roles) {
                for (const authorizedRole of roles) {
                    if (availableRole === authorizedRole) {
                        return next();
                    }
                }
            }
        }
    }
    debug("unauthorized request", roles);

    return res.status(403).send({
        msg: "You don't have not enough permissions to access this resource."
    });
};

/**
 * Its a auth middleware which validates request by jwt token
 */
export const authenticate: express.RequestHandler = async (req: IRequest, res: express.Response, next: express.NextFunction) => {
    try {
        const authorization = req.headers.authorization || "";
        const [, token] = authorization?.split(" ");
        if(!token) {
            throw Boom.unauthorized(`Token is required`);
        }

        let response: IUser = await authorizationService.parseJwtToken(token);
        console.log(`response : `, response, response.email)
        const user = await userService.findUserByEmail(response.email);
        console.log(`user : `, user, user.status !== UserStatus.ACTIVE);
        if(!user || user.status !== UserStatus.ACTIVE) {
            throw Boom.unauthorized(`User is not authorized to perform the operation`);
        }
        req.currentUser = user;
        return next();
    } catch (error) {
        debug(`ERROR : ${error}`);
        return next(error);
    }
}
