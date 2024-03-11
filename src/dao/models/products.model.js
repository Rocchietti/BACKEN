import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    code:{
        type:String,
        required:true,
    }
});  


export const productsModel = mongoose.model('productos', productSchema)