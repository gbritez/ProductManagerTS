import { CartsDaoService } from "../../services/carts.dao.service";

export class CartsViewController {
    private cartsDaoService: CartsDaoService

    constructor() {
        this.cartsDaoService = new CartsDaoService();
    }

    Get = async (req, res) => {
        const id: string = req.params.cid
        try {
            const response = await this.cartsDaoService.Get(id)
            res.render('cart', { response })
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
}