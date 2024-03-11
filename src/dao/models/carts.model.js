import mongoose from "mongoose"
import { Schema } from "mongoose"

const cartSchema= new mongoose.Schema({
    productos: [{
        product: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Products",
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        _id:false
    }]
})

export const cartModel = mongoose.model("carts", cartSchema)