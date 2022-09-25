import * as Boom from 'boom';
import * as _ from 'lodash';
import * as Debug from 'debug';
import { productRepository } from '../repositories/productRepositoty';
import { IProduct, IProductWithPage, ProductStatus } from '../interfaces/IProduct';
import { IUser } from '../interfaces/IUser';
import { IFindOptions } from '../interfaces/IRequest';

const debug = Debug('NT:ProductService');

class ProductService {

    /**
     *
     * @param product
     * @returns
     */
    public async validateProduct(product: IProduct): Promise<boolean> {
        try {
            console.log(`Please enter price : `, product.price)
            if (_.isUndefined(product.productId)) {
                throw Boom.badRequest('Please enter productId');
            } else if (_.isUndefined(product.name)) {
                throw Boom.badRequest('Please enter product name');
            } else if (_.isUndefined(product.price)) {
                throw Boom.badRequest('Please enter price');
            } else if (_.isUndefined(product.quantity)) {
                throw Boom.badRequest('Please enter quantity');
            } else if (_.isUndefined(product.category)) {
                throw Boom.badRequest('Please enter category');
            }

            const existingProduct = await productService.findProductByProductId(product.productId);
            if(existingProduct) {
                throw Boom.badRequest(`Product is already exist with productId ${product.productId}`);
            }
            return true;
        } catch (error) {
            debug(`[validateProduct] ERROR : `, error);
            throw error;
        }
    }

    /**
     *
     * @param productPayload
     * @returns
     */
    public async insertProduct(currentUser: IUser, productPayload: IProduct): Promise<IProduct> {
        try {
            productPayload = {
                ...productPayload,
                status: ProductStatus.ACTIVE,
                createdBy: currentUser._id,
                creationDate: new Date()
            }
            const product = await productRepository.create(productPayload);
            return product;
        } catch (error) {
            debug(`[insertProduct] ERROR : `, error);
            throw error;
        }
    }

    /**
     *
     * @param params
     * @returns
     */
    public async getProductsByPage(params): Promise<IProductWithPage> {
        try {
            const search = params.filter ? {
                $and: [
                    params.filter
                ]
            } : {};
            const findOptions = {
                search,
                limit: params.pageSize,
                offset: (params.pageSize * params.page) - params.pageSize,
                ...((params.sorting) && { sorting: { [params.sorting.column]: ((params.sorting.direction.toLowerCase() === 'desc') ? -1 : 1) } })
            };
            console.log(`findOptions : `, findOptions);
            return productRepository.findByPage(findOptions as IFindOptions);
        } catch (error) {
            debug(`[getProductsByPage] ERROR : `, error);
            throw error;
        }
    }

    /**
     *
     * @param productId
     * @returns
     */
    public async findProductById(productId: string): Promise<IProduct> {
        try {
            if (_.isEmpty(productId)) {
                throw Boom.badRequest('Invalid Product ID');
            }
            const product = await productRepository.findById(productId);
            if (_.isNull(product)) {
                throw Boom.badRequest('Product not found');
            }
            debug(`Search Product ID = ${productId}`);
            return product;
        } catch (error) {
            debug(`[findProductById] ERROR : `, error);
            throw error;
        }
    }

    /**
     *
     * @param productId
     * @returns
     */
    public async findProductByProductId(productId: number): Promise<IProduct> {
        try {
            if (_.isUndefined(productId)) {
                throw Boom.badRequest('ProductId is required');
            }
            const product = await productRepository.find({ productId });
            return product;
        } catch (error) {
            debug(`[findProductById] ERROR : `, error);
            throw error;
        }
    }

    /**
     * Update product by id
     * @param _id
     * @param product
     * @returns
     */
    public async updateProduct(_id: string, product: Partial<IProduct>): Promise<IProduct> {
        try {
            const { name, price, quantity, category, createdBy, status } = product;
            const condition = {
                _id
            }
            const productPayload = {
                name,
                price,
                quantity,
                category,
                status,
                createdBy
            }
            const updateProduct = await productRepository.update(condition, productPayload)
            return updateProduct;
        } catch (error) {
            debug(`[updateProduct] ERROR : `, error);
            throw error;
        }
    }

    /**
     * Delete product by id
     * @param productId
     * @returns
     */
    public async deleteProduct(productId: string): Promise<string> {
        try {
            const condition = {
                _id: productId
            }
            const product = await productRepository.delete(condition)
            if(!product) {
                throw Boom.badRequest('Product not found');
            }
            return productId;
        } catch (error) {
            debug(`ERROR : `, error);
            throw error;
        }
    }
};


export const productService = new ProductService();
