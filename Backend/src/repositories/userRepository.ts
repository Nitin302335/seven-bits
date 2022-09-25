import * as _ from 'lodash';
import * as Debug from 'debug';
import { User } from '../models';
import { IUser, IUserWithPage } from '../interfaces/IUser';

const debug = Debug('NT:UserRepository');

class UserRepository {
    /**
     * Find users with sorting, filtering and pagination
     * @param options
     * @returns
     */
    public async findAll(options?): Promise<IUser[]> {
        try {
            return User.find(options);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Create user
     * @param userPayload
     * @returns
     */
    public async create(userPayload: Partial<IUser>): Promise<IUser> {
        try {
            return User.create(userPayload);
        } catch (error) {
            throw error;
        }
    }

    /**
     * find user with pagination
     * @param findOptions
     * @returns
     */
    public async findByPage(findOptions): Promise<IUserWithPage> {
        try {
            return {
                items: await User.find(findOptions.search).limit(findOptions.limit)
                    .skip(findOptions.offset).sort(findOptions.sorting),
                total: await User.countDocuments(findOptions.search)
            };
        } catch (error) {
            throw error;
        }
    }

    /**
     *
     * @param id
     * @returns
     */
    public async findById(id: string): Promise<IUser> {
        try {
            return User.findById(id);
        } catch (error) {
            throw error;
        }
    }

    /**
     *
     * @param params
     * @returns
     */
    public async find(options?): Promise<IUser> {
        try {
            return User.findOne(options).lean();
        } catch (error) {
            throw error;
        }
    }

    /**
     *
     * @param condition
     * @param userPayload
     * @returns
     */
    public async update(condition: Partial<IUser>, userPayload: Partial<IUser>): Promise<Boolean> {
        try {
            await User.updateMany(condition, userPayload, {new: true});
            return true;
        } catch (error) {
            throw error;
        }
    }

    /**
     *
     * @param condition
     * @returns
     */
    public async delete(condition: Partial<IUser>): Promise<IUser> {
        try {
            const result = await User.findOneAndDelete(condition);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

export const userRepository = new UserRepository();