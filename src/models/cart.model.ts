import { Schema, model, Model, Document } from "mongoose";
import { IProduct } from "./product.model";

export interface ICart extends Document {
    products: [{
        product: any,
        quantity: number
    }]
}

const cartSchema = new Schema<ICart>({
    products: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number },
        _id: false
    }]
})

cartSchema.pre('findOne', function () {
    this.populate('products')
})

const Cart = model<ICart>("Cart", cartSchema);

export default Cart;