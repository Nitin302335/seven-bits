import * as _ from 'lodash';
import * as Debug from 'debug';
import { Product } from '../models';
import { IProduct, IProductWithPage } from '../interfaces/IProduct';
import { IFindOptions } from '../interfaces/IRequest';

const debug = Debug('NT:ProductRepository');

class ProductRepository {
    /**
     * @param options
     * @returns
     */
    public async findAll(options?): Promise<IProduct[]> {
        try {
            return Product.find(options);
        } catch (error) {
            throw error;
        }
    }

    /**
     * find one by condition
     * @param options
     * @returns
     */
    public async find(options?: Partial<IProduct>): Promise<IProduct> {
        try {
            return Product.findOne(options).lean();
        } catch (error) {
            throw error;
        }
    }

    /**
     *
     * @param productPayload
     * @returns
     */
    public async create(productPayload: Partial<IProduct>): Promise<IProduct> {
        try {
            return Product.create(productPayload);
        } catch (error) {
            throw error;
        }
    }

    /**
     *
     * @param findOptions
     * @returns
     */
    public async findByPage(findOptions: IFindOptions): Promise<IProductWithPage> {
        try {
            return {
                items: await Product.find(findOptions.search).limit(findOptions.limit)
                    .skip(findOptions.offset).sort(findOptions.sorting),
                total: await Product.countDocuments(findOptions.search)
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
    public async findById(id: string): Promise<IProduct> {
        try {
            return Product.findById(id);
        } catch (error) {
            throw error;
        }
    }

    /**
     *
     * @param condition
     * @param companyPayload
     * @returns
     */
    public async update(condition: Partial<IProduct>, companyPayload: Partial<IProduct>): Promise<IProduct> {
        try {
             const product = await Product.findOneAndUpdate(condition, companyPayload, {new: true});
             return product as IProduct;
        } catch (error) {
            throw error;
        }
    }

    /**
     *
     * @param condition
     * @returns
     */
    public async delete(condition: Partial<IProduct>): Promise<IProduct> {
        try {
            const product = await Product.findOneAndDelete(condition);
            return product;
        } catch (error) {
            throw error;
        }
    }
}

export const productRepository = new ProductRepository();