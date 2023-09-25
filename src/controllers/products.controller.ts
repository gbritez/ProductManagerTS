import { IProduct } from "../models/product.model";
import { ProductsService } from "../services/products.service";


export class ProductsController {
    private productsService: ProductsService

    constructor() {
        this.productsService = new ProductsService()
    }

    GetAll = async (req, res) => {
        const { limit } = req.query;
        try {
            let response = await this.productsService.GetProducts();
            if (limit) {
                response = response.slice(0, limit as number)
            }
            res.status(200).json({ response, status: 'success' });
        }
        catch (error) {
            res.status(500).json({ error: error.message, status: 'error' });
        }
    }

    GetById = async (req, res) => {
        const id: number = +req.params.pid;
        try {
            const response = await this.productsService.GetProductById(id);
            res.status(200).json({ response, status: 'success' });
        }
        catch (error) {
            res.status(500).json({ error: error.message, status: 'error' });
        }
    }

    Insert = async (req, res) => {
        const product: IProduct = req.body;
        try {
            const response = await this.productsService.AddProduct(product)
            res.status(201).json({ response, status: 'success' })
        }
        catch (error) {
            res.status(500).json({ error: error.message, status: 'error' })
        }
    }

    Update = async (req, res) => {
        const product: IProduct = req.body;
        console.log(product)
        try {
            const response = await this.productsService.UpdateProduct(product)
            res.status(200).json({ response, status: 'success' })
        }
        catch (error) {
            res.status(500).json({ error: error.message, status: 'error' });
        }
    }

    Delete = async (req, res) => {
        const id: number = +req.params.pid;
        try {
            const response = await this.productsService.DeleteProduct(id)
            res.status(200).json({ status: 'success' });
        }
        catch (error) {
            res.status(500).json({ error: error.message, status: 'error' });
        }
    }
}