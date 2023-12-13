import Product, { IProduct } from "../models/product.model";
import { BaseDao } from "./base.dao";

export class ProductsDao extends BaseDao<IProduct> {
    constructor() {
        super(Product)
    }
}