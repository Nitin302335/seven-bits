import * as express from 'express';
import * as _ from 'lodash';
import * as Debug from 'debug';
import { IRequest } from '../interfaces/IRequest';
import { formatAppSuccess } from '../config';
import { authorizationService } from '../services/AuthenticateService';
import { userService } from '../services/UserService';

const debug = Debug('NT:UserController');

/**
 * Validate User
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const validateSignupUser: express.RequestHandler = async (req: IRequest, res: express.Response, next: express.NextFunction) => {
    try {
        const params = _.merge(req.params, req.body);
        await userService.validateSignupUser(params);
        return next();
    }
    catch (error) {
        return next(error);
    }
};

/**
 * Validate login User
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const validateLoginUser: express.RequestHandler = async (req: IRequest, res: express.Response, next: express.NextFunction) => {
    try {
        const params = _.merge(req.params, req.body);
        const user = await userService.validateLoginUser(params);
        req.currentUser = user;
        return next();
    }
    catch (error) {
        return next(error);
    }
};

export const insertUser: express.RequestHandler = async (req: IRequest, res: express.Response, next: express.NextFunction) => {
    try {
        const params = _.merge(req.params, req.body);
        const user = await userService.insertUser(params);
        req.data = formatAppSuccess(user);
        return next();
    }
    catch (error) {
        return next(error);
    }
};


export const login: express.RequestHandler = async (req: IRequest, res: express.Response, next: express.NextFunction) => {
    try {
        const token = authorizationService.generateAccessToken(req.currentUser);
        req.data = formatAppSuccess({ token });
        return next();
    } catch (error) {
        return next(error);
    }
};

export const getUserProfile: express.RequestHandler = async (req: IRequest, res: express.Response, next: express.NextFunction) => {
    try {
        console.log(`req.currentUser`, req.currentUser)
        req.data = formatAppSuccess(req.currentUser);
        return next();
    }
    catch (error) {
        return next(error);
    }
};

export const updateUserProfile: express.RequestHandler = async (req: IRequest, res: express.Response, next: express.NextFunction) => {
    try {
        const params = _.merge(req.params, req.body);
        const user = await userService.updateUser(req.currentUser._id, params);
        req.data = formatAppSuccess({...user, ...req.currentUser});
        return next();
    }
    catch (error) {
        return next(error);
    }
};

export const getUsers: express.RequestHandler = async (req: IRequest, res: express.Response, next: express.NextFunction) => {
    try {
        const params = _.merge(req.params, req.body);
        const users = await userService.getUsersByPage(req.currentUser, params);
        req.data = formatAppSuccess(users);
        return next();
    }
    catch (error) {
        return next(error);
    }
};

export const deleteUser: express.RequestHandler = async (req: IRequest, res: express.Response, next: express.NextFunction) => {
    try {
        const params = _.merge(req.params, req.body);
        await userService.deleteUser(params.id);
        req.data = formatAppSuccess();
        return next();
    }
    catch (error) {
        return next(error);
    }
};
