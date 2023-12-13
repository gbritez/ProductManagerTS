import { ICustomResponse } from "../../helpers/CustomResponse";
import { IProduct } from "../../models/product.model";
import { ProductsService } from "../../services/products.dao.service";

import { Request, Response } from 'express'
export class ProductsViewController {

    private productsService: ProductsService

    constructor() {
        this.productsService = new ProductsService()
    }

    GetAll = async (req: Request, res: Response) => {
        const { limit = 10, sort, page = 1, ...query } = req.query;
        const user = req.session.user
        try {
            const response: ICustomResponse = await this.productsService.GetProducts(query, limit, sort, page);
            res.render('home', { products: response, user })
        }
        catch (error) {
            res.status(500).send(error.message)
        }
    }

    GetRealTimeProducts = async (req: Request, res: Response) => {
        const { limit } = req.query;
        try {
            let response = await this.productsService.GetProducts();
            res.render('real-time-products', { products: response.payload })
        }
        catch (error) {
            res.status(500).send(error.message)
        }
    }

    GetById = async (req: Request, res: Response) => {
        const id: string = req.params.pid;
        try {
            const response = await this.productsService.GetProductById(id);
            res.render('product', { product: response })
        }
        catch (error) {
            res.status(500).send(error.message)
        }
    }

    // Insert = async (req: Request, res: Response) => {
    //     const product: IProduct = req.body;
    //     try {
    //         const response = await this.productsDaoService.AddProduct(product)
    //         res.status(201).send(response)
    //     }
    //     catch (error) {
    //         res.status(500).send(error.message)
    //     }
    // }

    // Update = async (req: Request, res: Response) => {
    //     const product: IProduct = req.body;
    //     try {
    //         const response = await this.productsDaoService.UpdateProduct(product)
    //         res.status(200).send(response)
    //     }
    //     catch (error) {
    //         res.status(500).send(error.message)
    //     }
    // }

    // Delete = async (req: Request, res: Response) => {
    //     const id: string = req.params.pid;
    //     try {
    //         const response = await this.productsDaoService.DeleteProduct(id)
    //         res.status(200).send(response)
    //     }
    //     catch (error) {
    //         res.status(500).send(error.message)
    //     }
    // }
}