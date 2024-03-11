import { Router, json } from 'express';
import { Carro } from '../dao/Carrito.js';
import { Producto } from '../dao/ProductManager.js';
import { CartMana } from '../dao/manager/cartsmana.js';


const router = Router(); 

router.get('/', async (req, res) => {
    try {
        const productsToCart = await CartMana.findAll()
        res.status(200).json({message: 'Carrito:', productsToCart})
    } catch (error) {
        return res.status(404).json({message: 'No se pudo conectar con el servidor'})
    }
}) 
router.post('/', async(req,res)=> {
    try {
        const update = await CartMana.createOne(req.body)
        res.status(200).json({message: 'Carrito creado', products:update})
    } catch (error) {
        return res.status(500).json('Ha ocurrido un error')
    }
});
router.get('/:cid', async (req, res) => {
    const { cid } = req.params
    try {
        const carro= await CartMana.findById(cid)
        if(!carro){
            res.status(400).json({message: 'No hay lista de productos'})
        }
        res.status(200).json({message: 'Carrito per ID', carro})
    } catch (error) {
        
    }
})
router.post('/:cartId/product/:productId', async (req,res) => {
    const {idProducto, idCart} = req.params;
    try {
        const response = await CartMana.updateOne(idProducto, idCart)
        if(!response){
            res.status(404).json({message: 'Product not found with the id provided'})
        }
        res.status(200).json({message:'Producto agregado correctamente con la cantidad acumulada', response})
    } catch (error) {
        
    }
});
export default router;