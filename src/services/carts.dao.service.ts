
import Cart from '../models/cart.model'

export class CartsDaoService {

    constructor() {
    }

    async CreateCart() {
        await Cart.create()
    }

    async GetCartProducts(id: string) {

    }

    async UpdateCart(cid: string, pid: string) {
        await Cart.findByIdAndUpdate(cid, { $push: { products: pid } }, { new: true })
    }


}