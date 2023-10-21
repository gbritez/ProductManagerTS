import Product, { IProduct } from '../models/product.model';

export class ProductsDaoService {
    constructor() {
    }

    async AddProduct(product: IProduct) {
        await Product.create(product)
    }

    async GetProducts() {
        const products = await Product.find()
        return products || [];
    }

    async GetProductById(id: string) {
        const product: Document | null = await Product.findById(id)
        if (!product) {
            throw new Error(`Could not find product with id : ${id}`)
        }
        return product;
    }

    async UpdateProduct(product: IProduct) {
        await Product.findByIdAndUpdate(product.id, product)
    }

    async DeleteProduct(id: string) {
        await Product.findByIdAndDelete(id)
    }


}