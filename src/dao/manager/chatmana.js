import { chatModel } from "../models/chat.model.js";

class MessagesManager {
    async findAll() {
      const response = await chatModel.find().lean();
      return response;
    }
    async findById(id) {
        const response = await chatModel.findById(id);
        return response
    }
    async createOne(message) {
      const response = await chatModel.create(message);
      return response;
    }
    async deleteOne(id){
        const response = await chatModel.deleteOne({ _id: id });
        return response;
    }
  }
  export const chatMana = new MessagesManager();