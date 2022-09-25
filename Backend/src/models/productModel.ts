import mongoose, { Schema } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { IProduct } from "../interfaces/IProduct"

const productSchema = new Schema({
    _id: { type: String, required: true, default: uuid },
    productId: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    creationDate: Date,
    category: String,
    quantity: Number,
    price: Number,
    status: String,
    createdBy: String,
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
}, { collection: 'Products' });

const productModel = mongoose.model<IProduct>('Products', productSchema);
export { productModel, productSchema };
