import Product from "../models/product.model";
import { BaseDao } from "./base.dao";

export class ProductsDao extends BaseDao {
    constructor() {
        super(Product)
    }
}