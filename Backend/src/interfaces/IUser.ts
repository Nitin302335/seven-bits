export interface IUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
    state: string;
    country: string;
    friends: number;
    followers: number;
    status: UserStatus;
    role: UserROle;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}

export interface IUserWithPage {
    items: IUser[],
    total: number
}

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    PENDING = 'PENDING',
    REJECTED = 'REJECTED'
}

export enum UserROle {
    ADMIN = 'ADMIN',
    CUSTOMER = 'CUSTOMER'
}