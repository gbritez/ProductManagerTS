import { Schema, model, Model, Document } from "mongoose";
import { IProduct } from "./product.model";

interface ICart extends Document {
    products: IProduct[]
}

const cartSchema = new Schema<ICart>({
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
})

const Cart = model<ICart>("Cart", cartSchema);

export default Cart;