import fs from 'fs'
import { ICart, ICartProduct } from '../models/cart.model'

export class CartsService {
    path: string;
    constructor() {
        this.path = 'src/carrito.json'
        const fileExists = fs.existsSync(this.path)
        if (!fileExists) {
            fs.writeFileSync(this.path, '')
        }
    }

    async CreateCart() {
        let cart: ICart = { id: 1, products: [] };
        let carts: ICart[] = await this.Get()

        if (carts.length > 0) {
            cart.id = carts[carts.length - 1].id + 1
        }

        carts = [...carts, cart];
        await fs.promises.writeFile(this.path, JSON.stringify(carts))
    }

    async GetCartProducts(id: number) {
        let db = await this.Get()

        let products: ICartProduct[]

        try {
            const cart: ICart = db.find(x => x.id === id)
            if (cart) {
                products = cart.products
            }
            else {
                throw new Error(`No cart found for id: ${id}`)
            }
        }
        catch (error) {
            throw new Error(error)
        }

        return products;
    }

    async UpdateCart(cid: number, pid: number) {
        let db = await this.Get()

        try {
            const cart: ICart = db.find(x => x.id === cid)
            if (cart) {
                let product = cart.products.find(x => x.id === pid)
                if (product) {
                    cart.products[cart.products.indexOf(product)].quantity++;
                }
                else {
                    cart.products.push({ id: pid, quantity: 1 })
                }
                await fs.promises.writeFile(this.path, JSON.stringify([...db, cart]))
            }
            else {
                throw new Error(`Cart with id ${cid} does not exist.`)
            }
        }
        catch (error) {
            throw new Error(error)
        }
    }

    private async Get() {
        let db = await fs.promises.readFile(this.path, 'utf-8');
        if (db) {
            return JSON.parse(db)
        }
        else {
            return []
        }
    }
}