import { Router, json } from 'express';
import { cartManager } from '../dao/manager/cartsmana.js';
import { Error } from 'mongoose';


const router = Router(); 

router.get("/", async (req, res) => {
    try {
        const carts = await cartManager.findAll();

        if (!carts || carts.length === 0) {
            return res.status(404).json({ message: "No carts found" });
        }
        res.status(200).json({ message: "Carts found", carts });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get('/:idCart', async (req, res) => {
    const {idCart} = req.params
    try {
        const productsToCart = await cartManager.findCartById(idCart)
        res.status(200).json({message: 'Carrito', productsToCart})
    } catch (error) {
        return res.status(404).json({message: 'No se pudo conectar con el servidor'})
    }
}) 
router.post('/', async(req,res)=> {
    try {
        const update = await cartManager.createCart()
        res.status(200).json({message: 'Carrito creado', carrito: update})
    } catch (error) {
        return res.status(500).json({message: error})
    }
});
router.put("/:cid", async (req,res) => {
    const { pid , quantity } = req.body;
    const { cid } = req.params;
    try {
        const response = await cartManager.updateQuantity(cid , pid , quantity);
        console.log(response);
        res.status(200).json({ message: "cart update", cart: response });
    } catch (error){
        res.status(500).json({ message: "Internal server error" });
    }
});
router.put('/:idCart/products/:idProduct', async (req,res) => {
    const {idCart, idProduct} = req.params
    const {quantity} = req.body 
    try {
        const response = await cartManager.updateQuantity(idCart, idProduct, quantity)
        res.status(200).json({message: `cantidad de productos actualizada with success ${response}`})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error });
    }
})
router.post('/:idCart/product/:idProduct', async (req,res) => {
    const {idCart, idProduct} = req.params;
    try {
        const cart = await cartManager.addProductToCart(idCart, idProduct)
        if(!cart){
            res.status(404).json({message: 'Product not found with the id provided'})
        }
        res.status(200).json({message:'Producto agregado correctamente con la cantidad correspondiente', cart})
    } catch (error) {
        return res.status(500).json({message:error})
    }
});
router.delete('/:idCart/products/:idProduct', async (req,res) => {
    const {idCart, idProduct} = req.params
    try {
        const response = await cartManager.deleteProductToCart(idCart, idProduct);
        res.status(200).json({message: `Se eliminó el producto ${idProduct} de su carrito ${idCart}` })
    } catch (error) {
        res.status(500).json({
        message: error
        })
    }
router.delete('/:idCart', async (req,res) => {
    const {idCart} = req.params
    try {
        const response = await cartManager.deleteCart(idCart)
        res.status(200).json({message: `Se eliminó el cart ${response} with success`})
    } catch (error) {
        res.status(500).json({message:error})
    }
})
})
export default router;