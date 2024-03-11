import { chatModel } from "../models/chat.model.js";

class chatManager {
    async findAll() {
        const response = await chatModel.findAll().lean()
        return response
    }
    async findById(id) {
        const response = await chatModel.findById(id)
        return response
    }
    async createOne(obj){
        const response = await chatModel.create(obj)
        return response
    }
    async updateOne(id,obj) {
        const response = await chatModel.updateOne({_id:id}, obj)
        return response
    }
    async deleteOne(id){
        const response = await chatModel.findByIdAndDelete({_id:id})
        return response
    }
}


export const chatMana = new chatManager()