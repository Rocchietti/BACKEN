
import { cartModel } from "../models/carts.model.js";

class CartManager {
        async findAll() {
            const response = await cartModel.find().lean()
            return response 
        }
        async findById(id) {
            const response = await cartModel.findById(id);
            return response
        }
        async createOne(obj) {
            const response = await cartModel.create(obj)
            return response
        }
        async updateOne(id, obj) {
            const response = await cartModel.updateOne({_id:id}, obj)   
            return response
        }
        async deleteOne(id){
            const response = await cartModel.findOneAndDelete({_id:id})
            return response
        }
}



export const CartMana = new CartManager()