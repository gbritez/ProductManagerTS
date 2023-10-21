import { CartsDaoService } from "../services/carts.dao.service";
import { CartsService } from "../services/carts.service";
import { Request, Response } from 'express'

export class CartsController {
    private cartsService: CartsService
    private cartsDaoService: CartsDaoService

    constructor() {
        this.cartsService = new CartsService();
        this.cartsDaoService = new CartsDaoService();
    }

    Insert = async (req, res) => {
        try {
            const response = await this.cartsDaoService.CreateCart()
            res.status(201).send(response)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    GetCartProductsById = async (req, res) => {
        const id: string = req.params.cid
        try {
            const response = await this.cartsDaoService.GetCartProducts(id)
            res.status(200).send(response)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    Update = async (req, res) => {
        const cid: string = req.params.cid
        const pid: string = req.params.pid
        try {
            const response = await this.cartsDaoService.UpdateCart(cid, pid)
            res.status(200).send(response)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
}