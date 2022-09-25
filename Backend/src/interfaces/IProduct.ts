export interface IProduct {
    _id: string;
    productId: number;
    name: string;
    category: string;
    price: number;
    creationDate: Date;
    quantity: number;
    status: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}

export interface IProductWithPage {
    items: IProduct[],
    total: number
}

export enum ProductStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}
