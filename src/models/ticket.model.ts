import { Schema, model } from "mongoose";

export interface ITicket extends Document {
    code: string;
    purchase_datetime: Date;
    amount: number;
    purchaser: string;
}

const ticketSchema = new Schema<ITicket>({
    code: { type: String, unique: true, auto: true },
    purchase_datetime: { type: Date },
    amount: { type: Number },
    purchaser: { type: String }
})

export const Ticket = model<ITicket>("Ticket", ticketSchema);

export default Ticket