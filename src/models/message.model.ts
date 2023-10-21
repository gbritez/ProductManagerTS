import { Schema, model, Model, Document } from "mongoose";

export interface IMessage extends Document {
    user: string;
    message: string;
}

const messageSchema = new Schema<IMessage>({
    user: String,
    message: String,
});

const Message: Model<IMessage> = model("Message", messageSchema);

export default Message;