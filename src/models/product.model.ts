import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
    title: string;
    description: string;
    price: number;
    code: number;
    stock: number;
    thumbnail: string;
}

const productSchema = new Schema<IProduct>({
    title: { type: String, required: true },
    code: { type: Number, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    thumbnail: { type: String, required: true },
});

const Product = model<IProduct>("Product", productSchema);

export default Product;