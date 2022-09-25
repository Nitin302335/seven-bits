import * as express from 'express';
import * as _ from 'lodash';
import * as Debug from 'debug';
import { IRequest } from '../interfaces/IRequest';
import { formatAppSuccess } from '../config';
import { productService } from '../services/ProductService';

const debug = Debug('NT:ProductController');

export const getAllProducts: express.RequestHandler = async (req: IRequest, res: express.Response, next: express.NextFunction) => {
    try {
        const companies = await productService.findProductById("");
        req.data = formatAppSuccess(companies);
        return next();
    } catch (error) {
        return next(error);
    }
};

export const getProductByPage: express.RequestHandler = async (req: IRequest, res: express.Response, next: express.NextFunction) => {
    try {
        const params = _.merge(req.params, req.body);
        const products = await productService.getProductsByPage(params);
        req.data = formatAppSuccess(products);
        return next();
    } catch (error) {
        return next(error);
    }
};

export const findProductById: express.RequestHandler = async (req: IRequest, res: express.Response, next: express.NextFunction) => {
    try {
        const params = _.merge(req.params, req.body);
        const product = await productService.findProductById(params._id);
        req.data = formatAppSuccess(product);
        return next();
    }
    catch (error) {
        return next(error);
    }
};

export const validateProduct: express.RequestHandler = async (req: IRequest, res: express.Response, next: express.NextFunction) => {
    try {
        const params = _.merge(req.params, req.body);
        await productService.validateProduct(params);
        return next();
    }
    catch (error) {
        return next(error);
    }
};

export const insertProduct: express.RequestHandler = async (req: IRequest, res: express.Response, next: express.NextFunction) => {
    try {
        const params = _.merge(req.params, req.body);
        const product = await productService.insertProduct(req.currentUser, params);
        req.data = formatAppSuccess(product);
        return next();
    }
    catch (error) {
        return next(error);
    }
};

export const updateProduct: express.RequestHandler = async (req: IRequest, res: express.Response, next: express.NextFunction) => {
    try {
        const params = _.merge(req.params, req.body);
        debug(`Updating Product ID = ${params._id}`);
        const product = await productService.updateProduct(params._id, params);
        req.data = formatAppSuccess(product);
        return next();
    }
    catch (error) {
        return next(error);
    }
};

export const deleteCompany: express.RequestHandler = async (req: IRequest, res: express.Response, next: express.NextFunction) => {
    try {
        const params = _.merge(req.params, req.body);

        debug(`Deleting Product ID = ${params._id}`);
        const id = await productService.deleteProduct(params._id);
        req.data = formatAppSuccess({ id });
        return next();
    }
    catch (error) {
        return next(error);
    }
};
