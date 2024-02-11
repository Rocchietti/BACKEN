import { Router, json } from 'express';
import { Carro } from '../Carrito.js';
import { Producto } from '../ProductManager.js';

const router = Router(); 

/* router.get('/', async (req, res) => {
    try {
        const productToCart = await Producto.getProductById
    } catch (error) {
        return res.status(404).json({message: 'No se pudo conectar con el servidor'})
    }
}) */ //PRUEBA
router.post('/', async(req,res)=> {
    try {
        const update = await Carro.writeCart()
        res.status(200).json({message: 'Carrito creado', products:update})
    } catch (error) {
        return res.status(500).json('Ha ocurrido un error')
    }
});
router.get('/:cid', async (req, res) => {
    const { cid } = req.params
    console.log(req.params);
    try {
        const carro= await Carro.getCartById(+cid)
        if(!carro){
            res.status(400).json({message: 'No hay lista de productos'})
        }
        res.status(200).json({message: 'Lista de productos', carro})
    } catch (error) {
        
    }
})
router.post('/:cartId/product/:productId', async (req,res) => {
    const {idProducto, idCart} = req.params;
    console.log(req.params);
    try {
        const response = await Carro.addProductToCart(+idProducto, +idCart)
        if(!response){
            res.status(404).json({message: 'Product not found with the id provided'})
        }
        res.status(200).json({message:'Producto agregado correctamente con la cantidad acumulada', response})
    } catch (error) {
        
    }
});
export default router;