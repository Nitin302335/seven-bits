import * as Boom from 'boom';
import * as _ from 'lodash';
import * as jwt from 'jsonwebtoken';
import * as Debug from 'debug';
import { JWT_TOKEN } from '../constants';

const debug = Debug('NT:AuthorizationService');

class AuthorizationService {

    /**
     *
     * @param token
     */
    public async parseJwtToken(token): Promise<any> {
        try {
            const response = jwt.verify(token, JWT_TOKEN.SECRET);
            console.log(`response : `, response);
            return response;
        } catch (error) {
            debug(`Error: parseJwtToken ${error}`);
            throw error;
        }
    }

    /**
     * Generate jwt token
     * @param payload
     * @returns
     */
    public generateAccessToken(payload): string {
        return jwt.sign(payload, JWT_TOKEN.SECRET, {
            algorithm: 'HS512',
            expiresIn: JWT_TOKEN.EXPIRATION_TIME.HOURS_10
        });
    }
};


export const authorizationService = new AuthorizationService();
