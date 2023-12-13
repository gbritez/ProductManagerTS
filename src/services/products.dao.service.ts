import { ProductsDao } from '../dao/products.dao';
import { ICustomResponse } from '../helpers/CustomResponse';
import Product, { IProduct } from '../models/product.model';

export class ProductsService {
    productsDao: ProductsDao
    constructor() {
        this.productsDao = new ProductsDao()
    }

    async AddProduct(product: IProduct) {
        await Product.create(product)
    }

    async GetProducts(query?: object, limit?: number, sort?: string, page?: number) {
        let sortOptions: object = {};

        if (sort) {
            if (sort === 'asc') {
                sortOptions = { price: 1 };
            } else if (sort === 'desc') {
                sortOptions = { price: -1 };
            }
        }

        const response = await this.productsDao.GetPaginated(query, limit, page, sort)

        const status = response ? "success" : "error"

        const result: ICustomResponse = {
            status: status,
            totalPages: response.totalPages,
            prevPage: response.prevPage,
            nextPage: response.nextPage,
            page: response.page,
            hasPrevPage: response.hasPrevPage,
            hasNextPage: response.hasNextPage,
            prevLink: response.hasPrevPage ? `http://localhost:8080/?page=${response.prevPage}` : null,
            nextLink: response.hasNextPage ? `http://localhost:8080/?page=${response.nextPage}` : null,
            payload: response.docs
        }

        return result;
    }

    async GetProductById(id: string) {
        const product = await this.productsDao.GetOne(id)
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