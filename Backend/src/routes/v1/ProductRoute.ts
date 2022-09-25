import * as express from 'express';
import * as productController from '../../controllers/ProductController';
import * as Debug from 'debug';

const productRoute: express.Router = express.Router();
const debug = Debug('NT:ProductRoute');

// http://localhost:3050/api/v1/product

/**
 * Add new product
 */
productRoute.post('/', [
    productController.validateProduct,
    productController.insertProduct
]);

/**
 * Get products by pages
 */
productRoute.post('/search', [
    productController.getProductByPage
]);

/**
 * Get the Product Detail by id
 */
productRoute.get('/:_id', [
    productController.findProductById
]);

/**
 * Update the product By Id
 */
productRoute.put('/:_id', [
    productController.findProductById,
    productController.updateProduct
]);

/**
 * Delete the product By Id
 */
productRoute.delete('/:_id', [
    productController.findProductById,
    productController.deleteCompany
]);

export { productRoute };