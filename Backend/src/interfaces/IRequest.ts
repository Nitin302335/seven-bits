import {Request} from 'express';
import { IUser } from './IUser';

export interface ISucess {
    message: string
}

export interface IFindOptions {
    search: any,
    limit: number,
    offset: number,
    sorting: {
        column: string,
        direction: string
    }
}

export interface IRequest extends Request {
    data: object;
    success: ISucess;
    currentUser: IUser;
}
