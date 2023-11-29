
import Cart from '../models/cart.model'

export class CartsDaoService {

    constructor() {
    }

    async Create() {
        const response = await Cart.create({ products: [] })
        return response
    }

    async Get(id: string) {
        console.log(id)
        try {
            const response = await Cart.findById(id).populate("products.product");
            return response
        }
        catch (error) {
            console.log(error)
            return error
        }
    }

    async Update(cid: string, products: string[]) {
        try {
            const cart = await this.Get(cid);

            for (const product of products) {
                const productInCart = cart.products.find(p => p.product._id.equals(product));
                if (productInCart) {
                    productInCart.quantity++;
                } else {
                    cart.products.push({ product, quantity: 1 });
                }
            }

            return await cart.save();
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async UpdateProduct(cid: string, pid: string, quantity: number) {
        const cart = await Cart.findById(cid);
        try {
            if (cart) {
                const productIndex = cart.products.findIndex(x => x.product.toString() === pid);

                if (productIndex !== -1) {
                    cart.products[productIndex].quantity = quantity;
                } else {
                    cart.products.push({ product: pid, quantity: quantity });
                }

                const response = await cart.save();
                return response;
            } else {
                throw new Error('Cart not found')
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async DeleteOne(cid: string, pid: string) {
        try {
            if (await Cart.exists({ _id: cid })) {
                const response = await Cart.findByIdAndUpdate(cid, { products: { product: pid } }, { new: true })
                return response;
            }
        }
        catch (error) {
            console.log(error)
            return error;
        }
    }

    async DeleteAll(cid: string) {
        try {
            const response = await Cart.findByIdAndUpdate(cid, { products: [] })
            return response;
        }
        catch (error) {
            console.log(error)
            return error;
        }
    }


}