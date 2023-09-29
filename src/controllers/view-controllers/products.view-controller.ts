import { IProduct } from "../../models/product.model";
import { ProductsService } from "../../services/products.service";


export class ProductsViewController {
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
            res.render('home', { products: response })
        }
        catch (error) {
            res.status(500).send(error.message)
        }
    }

    GetById = async (req, res) => {
        const id: number = +req.params.pid;
        try {
            const response = await this.productsService.GetProductById(id);
            res.status(200).send(response)
        }
        catch (error) {
            res.status(500).send(error.message)
        }
    }

    Insert = async (req, res) => {
        const product: IProduct = req.body;
        try {
            const response = await this.productsService.AddProduct(product)
            res.status(201).send()
        }
        catch (error) {
            res.status(500).send(error.message)
        }
    }

    Update = async (req, res) => {
        const product: IProduct = req.body;
        try {
            const response = await this.productsService.UpdateProduct(product)
            res.status(200).send(response)
        }
        catch (error) {
            res.status(500).send(error.message)
        }
    }

    Delete = async (req, res) => {
        const id: number = +req.params.pid;
        try {
            const response = await this.productsService.DeleteProduct(id)
            res.status(200).send(response)
        }
        catch (error) {
            res.status(500).send(error.message)
        }
    }
}