import mongoose, { Schema } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { IUser } from "../interfaces/IUser"

/**
 * Creates and exports UserSchema model
 */
const userSchema = new Schema({
    _id: { type: String, required: true, default: uuid },
    firstName: String ,
    lastName: String ,
    email: { type: String, required: true, unique: true },
    password: String,
    address: String,
    state: String,
    country: String,
    friends: Number,
    followers: Number,
    status: String,
    role: String
}, { collection: 'Users', timestamps: true });

const userModel = mongoose.model<IUser>('Users', userSchema);
export { userModel, userSchema };
