import { IProduct } from "./product.model";
export interface ICartProduct {
    id: number,
    quantity: number
}
export interface ICart {
    id: number,
    products: ICartProduct[]
}