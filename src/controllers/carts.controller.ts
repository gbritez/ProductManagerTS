import { CartsService } from "../services/carts.dao.service";

export class CartsController {

    private cartsService: CartsService

    constructor() {

        this.cartsService = new CartsService();
    }

    Create = async (req, res) => {
        try {
            const response = await this.cartsService.Create()
            res.status(201).send(response)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    Get = async (req, res) => {
        const id: string = req.params.cid
        try {
            const response = await this.cartsService.Get(id)
            res.status(200).send(response)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    Update = async (req, res) => {
        const cid: string = req.params.cid
        const products: string[] = req.body.productIds

        try {
            const response = await this.cartsService.Update(cid, products)
            res.status(200).send(response)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    UpdateProduct = async (req, res) => {

        const pid: string = req.params.pid
        const cid: string = req.params.cid
        const quantity: number = +req.body.quantity
        try {
            const response = await this.cartsService.UpdateProduct(cid, pid, quantity)
            res.status(200).send(response)
        }
        catch (error) {
            res.status(500).send(error.message)
        }
    }

    DeleteOne = async (req, res) => {
        console.log('hit delete one')
        const cid: string = req.params.cid;
        const pid: string = req.params.pid;
        try {
            const response = await this.cartsService.DeleteOne(cid, pid)
            res.status(200).send(response)
        }
        catch (error) {
            res.status(500).send(error.message)
        }

    }

    DeleteAll = async (req, res) => {
        const cid: string = req.params.cid;
        try {
            const response = await this.cartsService.DeleteAll(cid)
            res.status(200).send(response)
        }
        catch (error) {
            res.status(500).send(error.message)
        }
    }
}