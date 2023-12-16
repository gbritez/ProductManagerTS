import { BaseDao } from "./base.dao";

export class CartsDao extends BaseDao {
    constructor() {
        super(process.env.CARTS_LOCAL_PATH)
    }
}