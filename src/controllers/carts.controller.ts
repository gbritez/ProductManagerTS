import { CartsService } from "../services/carts.service";

export class CartsController {
    private cartsService: CartsService
    constructor() {
        this.cartsService = new CartsService();
    }

    Insert = async (req, res) => {
        try {
            const response = await this.cartsService.CreateCart()
            res.status(201).send(response)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    GetCartProductsById = async (req, res) => {
        const id: number = +req.params.cid
        try {
            const response = await this.cartsService.GetCartProducts(id)
            res.status(200).send(response)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    Update = async (req, res) => {
        const cid: number = +req.params.cid
        const pid: number = +req.params.pid
        try {
            const response = await this.cartsService.UpdateCart(cid, pid)
            res.status(200).send(response)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
}