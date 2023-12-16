import { BaseDao } from "./base.dao";

export class ProductsDao extends BaseDao {
    constructor() {
        super(process.env.PRODUCTS_LOCAL_PATH)
    }
}