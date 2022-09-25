import * as _ from 'lodash';
import {genSalt, hash} from 'bcrypt';

export const url = (req: any) => {
    return req.protocol + '://' + req.get('host');
};

export const hashPassword = async (password: string) => {
    // generate salt to hash password
    const salt = await genSalt(10);

    // now we set user password to hashed password
    return hash(password, salt);
}

export const isEmail = (email: string) => {
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegexp.test(email);
}