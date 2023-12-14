
import { CartsDao } from '../dao/carts.dao'
import Cart from '../models/cart.model'

export class CartsService {
    cartsDao: CartsDao
    constructor() {
        this.cartsDao = new CartsDao()
    }

    async Create() {
        const response = await this.cartsDao.CreateOne({ products: [] })
        return response
    }

    async Get(id: string) {
        try {
            const response = await this.cartsDao.GetOne(id, "products.product")
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
        const cart = await this.cartsDao.GetOne(cid);
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
            const cartExists = await this.cartsDao.GetOne(cid)
            if (cartExists) {
                const response = await this.cartsDao.UpdateOne(cid, { $pull: { products: { product: pid } } }, { new: true })
                return response;
            }
        }
        catch (error) {
            return error;
        }
    }

    async DeleteAll(cid: string) {
        try {
            const response = await this.cartsDao.UpdateOne(cid, { products: [] })
            return response;
        }
        catch (error) {
            console.log(error)
            return error;
        }
    }


}