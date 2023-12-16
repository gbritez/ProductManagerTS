import { CartsService } from "../../services/carts.service";

export class CartsViewController {
    private cartsService: CartsService

    constructor() {
        this.cartsService = new CartsService();
    }

    Get = async (req, res) => {
        const id: string = req.params.cid
        try {
            const response = await this.cartsService.Get(id)
            res.render('cart', { response })
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
}