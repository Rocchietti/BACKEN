import { Router } from 'express';
import { Producto } from '../ProductManager.js';
import { validacion } from '../middleware/validacionMiddleware.js';
const router = Router();
router.get('/', async (req, res) => {
    try {
        const products = await Producto.getProduct(req.query)
        res.status(200).json({ message: 'lista de productos', products })
    } catch (error) {
        res.status(500).json({ message: 'Error Server' })
    }
});
router.get('/:pid', async (req, res) => {
    const { pid } = req.params
    console.log(req.params);
    try {
        const idProducto = await Producto.getProductById(+pid)
        if (!idProducto) {
            res.status(404).json({ message: 'Product not found with the id provided' })
        }
        res.status(200).json({ message: 'Producto por ID', idProducto })
    } catch (error) {
        return res.status(500).json(message.error)
    }
});
router.post('/', validacion, async (req, res) => {
    console.log(req.body);
    try {
        const update = await Producto.addproduct(req.body)
        res.status(200).json({ message: 'Producto añadido', products: update })
    } catch (error) {
        return res.status(500).json('Ha ocurrido un error')
    }
});
router.delete('/:pid', async (req, res) => {
    const { pid } = req.params
    try {
        const response = await Producto.deleteProduct(+pid)
        if (!response) {
            res.status(404).json({ message: 'Product not found with the id provided' })
        }
        res.status(200).json({ message: 'Producto eliminado', response })
    } catch (error) {
        app.status(500).json({ message: 'No se pudo comunicar con el servidor' })
    }
});
router.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const response = await Producto.updateProduct(+pid, req.body)
        if (!response) {
            res.status(404).json({ message: 'Product not found with the id provided' })
        }
        res.status(200).json({ message: 'Producto actualizado', response })
    } catch (error) {
        res.status(500).json(console.error('ha ocurrido un error'))
    }
});

export default router;