import { CartsService } from "../services/carts.service";

export class CartsController {
    private cartsService: CartsService
    constructor() {
        this.cartsService = new CartsService();
    }

    Insert = async (req, res) => {
        try {
            const response = await this.cartsService.CreateCart()
            res.status(201).json({ response, status: 'success' });
        } catch (error) {
            res.status(500).json({ error: error.message, status: 'error' });
        }
    }

    GetCartProductsById = async (req, res) => {
        const id: number = +req.params.cid
        try {
            const response = await this.cartsService.GetCartProducts(id)
            res.status(200).json({ response, status: 'success' });
        } catch (error) {
            res.status(500).json({ error: error.message, status: 'error' });
        }
    }

    Update = async (req, res) => {
        const cid: number = +req.params.cid
        const pid: number = +req.params.pid
        try {
            const response = await this.cartsService.UpdateCart(cid, pid)
            res.status(200).json({ response, status: 'success' });
        } catch (error) {
            res.status(500).json({ error: error.message, status: 'error' });
        }
    }
}