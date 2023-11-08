import { Schema, model, Document } from "mongoose";

export interface IUser {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    password: string;
    role: 'user' | 'admin';
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
    role: { type: String, required: true, enum: ['user', 'admin'] }
});

const User = model<IUser>("User", userSchema);

export default User;
