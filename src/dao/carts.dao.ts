
import Cart, { ICart } from "../models/cart.model";
import { BaseDao } from "./base.dao";

export class CartsDao extends BaseDao<ICart> {
    constructor() {
        super(Cart)
    }
}