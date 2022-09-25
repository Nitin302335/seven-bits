import * as express from 'express';
import * as userController from '../../controllers/UserController';
import * as Debug from 'debug';

const AuthRoute: express.Router = express.Router();
const debug = Debug('NT:AuthRoute');

// http://localhost:3050/api/v1/auth

/**
 * signup user
 */
AuthRoute.post('/signup', [
    userController.validateSignupUser,
    userController.insertUser
]);

/**
 * login user
 */
AuthRoute.post('/login', [
    userController.validateLoginUser,
    userController.login
]);

export { AuthRoute };