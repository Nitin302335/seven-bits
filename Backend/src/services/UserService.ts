import * as Boom from 'boom';
import * as _ from 'lodash';
import * as Debug from 'debug';
import {compare} from 'bcrypt';
import { IUserWithPage, UserROle, UserStatus } from '../interfaces/IUser';
import { userRepository } from '../repositories/userRepository';
import { IUser } from '../interfaces/IUser';
import { hashPassword, isEmail } from '../utils';

const debug = Debug('NT:UserService');

class UserService {

    /**
     *
     * @returns users
     */
    public async getAllUsers(): Promise<IUser[]> {
        try {
            let users = await userRepository.findAll();
            if (_.isNull(users) || _.isEmpty(users)) {
                users = _.create(users, { message: 'No Users present' });
            }
            debug(`Search All Users`);
            return users;
        } catch (error) {
            throw error;
        }
    }

    /**
     * validate signup user payload
     * @param user
     * @returns
     */
    public async validateSignupUser(user: IUser): Promise<boolean> {
        try {
            if (_.isEmpty(user.firstName)) {
                throw Boom.badRequest('Please enter firstName');
            } else if (_.isEmpty(user.email)) {
                throw Boom.badRequest('Please enter email');
            } else if (!isEmail(user.email)) {
                throw Boom.badRequest('email is not valid');
            } else if (_.isEmpty(user.password)) {
                throw Boom.badRequest('Please enter password');
            } else if (user.role && !Object.values(UserROle).includes(user.role)) {
                throw Boom.badRequest('Invalid role');
            }

            /**
             * Check user already exist with same email or not
             */
            const existingUser = await userService.findUserByEmail(user.email);
            if (existingUser) {
                throw Boom.badRequest(`User alreay exist with ${user.email}`);
            }

            return true;
        } catch (error) {
            debug(`[validateSignupUser] ERROR : `, error);
            throw error;
        }
    }

    /**
     * validate login user payload
     * @param user
     * @returns
     */
    public async validateLoginUser(user: IUser): Promise<IUser> {
        try {
            if (_.isEmpty(user.email)) {
                throw Boom.badRequest('Please enter email');
            } else if (_.isEmpty(user.password)) {
                throw Boom.badRequest('Please enter password');
            }

            /**
             * Check user already exist with same email or not
             */
            const existingUser = await userService.findUserByEmail(user.email);
            console.log(`existingUser : `, existingUser);
            if (!existingUser) {
                throw Boom.unauthorized(`User not exist with ${user.email}`);
            }

            /**
             * password check
             */
            console.log(`password `, user.password, existingUser.password)
            const isPasswordMatch = await compare(user.password, existingUser.password);
            console.log(`isPasswordMatch : `, isPasswordMatch)
            if(!isPasswordMatch) {
                throw Boom.unauthorized(`Incorrect password`);
            }

            return user;
        } catch (error) {
            debug(`[validateLoginUser] ERROR : `, error);
            throw error;
        }
    }

    /**
     * Insert user
     * @param userPayload
     * @returns
     */
    public async insertUser(userPayload: IUser): Promise<IUser> {
        try {
            debug(`[insertUser] Adding new User`);
            const hashedPassword = await hashPassword(userPayload.password);

            userPayload = {
                ...userPayload,
                password: hashedPassword,
                status: UserStatus.ACTIVE,
                role: userPayload.role || UserROle.CUSTOMER
            }

            const user = await userRepository.create(userPayload);
            return user;
        } catch (error) {
            debug(`[insertUser] ERROR : `, error);
            throw error;
        }
    }

    /**
     * Get users with pagination, filter, sorting
     * @param params
     * @returns
     */
    public async getUsersByPage(user: IUser, params): Promise<IUserWithPage> {
        try {
            /**
             * ignoring current logged in user
             */
            params.filter = {
                ...params.filter,
                _id: { $ne: user._id }
            }

            const search = {
                $and: [
                    params.filter
                ]
            };
            const findOptions = {
                search,
                limit: params.pageSize,
                offset: (params.pageSize * params.page) - params.pageSize,
                ...((params.sorting) && { sorting: { [params.sorting.column]: ((params.sorting.direction.toLowerCase() === 'desc') ? -1 : 1) } })
            };
            console.log(`[getUsersByPage] findOptions : `, JSON.stringify(findOptions, null, 2));
            return userRepository.findByPage(findOptions);
        } catch (error) {
            debug(`[getUsersByPage] ERROR : `, error);
            throw error;
        }
    }

    /**
     * Find user by id
     * @param userId
     * @returns
     */
    public async findUserById(userId: string): Promise<IUser> {
        try {
            if (_.isEmpty(userId)) {
                throw Boom.badRequest('Invalid User ID');
            }
            const user = await userRepository.findById(userId);
            if (_.isNull(user)) {
                throw Boom.badRequest('User not found');
            }
            debug(`[findUserById] Search Company ID = ${userId}`);
            return user;
        } catch (error) {
            debug(`[findUserById] ERROR : `, error);
            throw error;
        }
    }


    public async findUserByEmail(email: string): Promise<IUser> {
        try {
            const user = await userRepository.find({ email });
            return user;
        } catch (error) {
            debug(`[findUserByEmail] ERROR : `, error);
            throw error;
        }
    }

    /**
     * update user by id
     * @param userId
     * @param userDetail
     * @returns
     */
    public async updateUser(userId: string, userDetail: Partial<IUser>): Promise<Partial<IUser>> {
        try {
            const { firstName, lastName, address, state, status, country} = userDetail;
            const condition = {
                _id: userId
            }
            const userPayload = {
                firstName,
                lastName,
                address,
                state,
                status,
                country
            }
            await userRepository.update(condition, userPayload)
            return userPayload;
        } catch (error) {
            debug(`[updateUser] ERROR : `, error);
            throw error;
        }
    }

    /**
     * Delete user by id
     * @param userId
     * @returns
     */
    public async deleteUser(userId: string): Promise<string> {
        try {
            const condition = {
                _id: userId
            }
            const user = await userRepository.delete(condition);

            if(!user) {
                throw Boom.badRequest('User not found');
            }
            return userId;
        } catch (error) {
            debug(`[deleteUser] ERROR : `, error);
            throw error;
        }
    }
};


export const userService = new UserService();
