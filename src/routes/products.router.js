import { Router } from 'express';
import { Producto } from '../dao/ProductManager.js';
import { validacion } from '../middleware/validacionMiddleware.js';
import { ProduManager } from '../dao/manager/productmana.js';

const router = Router();

router.get('/:pid', async (req, res) => {
    const { pid } = req.params
    console.log(req.params);
    try {
        const idProducto = await ProduManager.findById(+pid)
        if (!idProducto) {
            res.status(404).json({ message: 'Product not found with the id provided' })
        }
        res.status(200).json({ message: 'Producto por ID', idProducto })
    } catch (error) {
        return res.status(500).json(message.error)
    }
});

router.delete('/:pid', async (req, res) => {
    const { pid } = req.params
    try {
        const response = await ProduManager.deleteOne(pid)
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
        const response = await ProduManager.updateOne(pid, req.body)
        if (!response) {
            res.status(404).json({ message: 'Product not found with the id provided' })
        }
        res.status(200).json({ message: 'Producto actualizado', response })
    } catch (error) {
        res.status(500).json(console.error('ha ocurrido un error'))
    }
});
router.get('/', async (req, res) => {
    try {
        const products = await ProduManager.findAll()
        res.status(200).json({ message: 'lista de productos', products })
    } catch (error) {
        res.status(500).json({ message: 'Error Server' })
    }
});
router.post('/', async (req,res) => {
    try {
        const createdProduct = await ProduManager.createOne(req.body);
        res.status(200).json({
        message : 'Product created',  product: createdProduct
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
export default router;