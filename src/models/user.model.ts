import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    password: string;
    isGithub?: boolean;
    role: 'user' | 'admin';
    cart: any
}

export interface IUserCredentials {
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isGithub: { type: Boolean, default: false },
    role: { type: String, required: true, enum: ['user', 'admin'] },
    cart: { type: Schema.Types.ObjectId, ref: 'Cart' }
});

const User = model<IUser>("User", userSchema);

export default User;
