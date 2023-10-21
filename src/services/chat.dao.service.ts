import Message, { IMessage } from "../models/message.model";

export class ChatDaoService {
    async GetMessages() {
        return await Message.find().lean();
    }

    async CreateMessage(message: IMessage) {
        return await Message.create(message);
    }
}

