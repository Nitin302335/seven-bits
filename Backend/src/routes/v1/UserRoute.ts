import * as express from 'express';
import * as userController from '../../controllers/UserController';
import * as Debug from 'debug';

const UserRoute: express.Router = express.Router();
const debug = Debug('NT:UserRoute');

// http://localhost:3050/api/v1/user

/**
 * Get user profile
 */
UserRoute.get('/profile', [
    userController.getUserProfile
]);

/**
 * update user profile
 */
UserRoute.put('/profile', [
    userController.updateUserProfile
]);

/**
 * Get users with pagination, filter, sorting
 */
UserRoute.post('/', [
    userController.getUsers
]);

/**
 * Delete user
 */
UserRoute.delete('/:id', [
    userController.deleteUser
]);

export { UserRoute };