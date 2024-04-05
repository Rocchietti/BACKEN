import { cartModel } from "../models/carts.model.js";
class CartManager {
    async findAll() {
        const result = await cartModel.find();
        return result;
    }
        async createCart() {
            const newCart = {products: [] };
            const response = await cartModel.create(newCart)
            return response 
        }
        async findCartById(idCart) {
            const response = await cartModel.findById(idCart).populate('products.product', ["title", "description", "price", "code"]).lean();
            console.log(response);
            return response
        }
        async addProductToCart(idCart, idProduct) {
            const cart = await cartModel.findById(idCart)
                const productIndex = cart.products.findIndex((p)=>p.product===idProduct)
                console.log(productIndex);
            if(productIndex !== -1) {
                cart.products[productIndex].quantity+=1
            }else {
                cart.products.push({product: idProduct, quantity:1})
            }
            return cart.save()
        }
        async deleteProductToCart(idCart, idProduct){
            const cart = await cartModel.findById(idCart)
            const productIndex = cart.products.findIndex((p)=>p.product===idProduct)
            if(productIndex !== -1){
                if(cart.products[productIndex].quantity > 1){
                    cart.products[productIndex].quantity -= 1
                }
            }else {
                cart.products.splice(productIndex, 1)
            }
            return cart.save()
        }
        async deleteCart(idCart){
            const cart = await cartModel.findById(idCart);
            if (cart) {
                cart.products = [];
            } else {
                res.status(200).json({ message: "Cart not found"});
            }
            return cart.save();
        }
        async updateQuantity(idCart, idProduct, quantity) {
            const cart = await cartModel.findById(idCart);
            const productIndex = cart.products.findIndex((p)=>p.product===idProduct)
            if(productIndex !== -1) {
                cart.products[productIndex].quantity= quantity;
            }else {
                cart.products.push({product:idProduct,quantity: quantity });
            }
            return cart.save()
        }
}
export const cartManager = new CartManager()