import { Router } from 'express';
import { __dirname } from "../utils.js"
import { ProduManager } from '../dao/manager/productmana.js';

const router = Router();
router.get('/', async (req, res) => {
    try {
        const products = await ProduManager.findAll(req.query);
        res.status(200).json({ message: 'lista de productos', products })
    } catch (error) {
        res.status(500).json({ message: 'Error Server' })
    }
});
router.get('/:id', async (req, res) => {
    const { id } = req.params
    console.log(req.params);
    try {
        const idProducto = await ProduManager.findById(id)
        if (!idProducto) {
            res.status(404).json({ message: 'Product not found with the id provided' })
        }
        res.status(200).json({ message: 'Producto por ID', idProducto })
    } catch (error) {
        return res.status(500).json({message: error})
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
    const data = req.body
    try {
        const response = await ProduManager.updateOne(pid, data)
        const response = await ProduManager.updateOne(pid, req.body)
        if (!response) {
            res.status(404).json({ message: 'Product not found with the id provided' })
        }
        res.status(200).json({ message: 'Producto actualizado', response })
    } catch (error) {
        res.status(500).json(console.error('ha ocurrido un error'))
    }
});

router.post('/', async (req,res) => {
    const { title, description, price, code } = req.body;
    if (!title || !description || !price || !code) {
        return res.status(400).json({ message: "Some data is missing" });
    }
    try {
        const createdProduct = await ProduManager.createOne(req.body);
        res.status(200).json({
        message : 'Product created',  product: createdProduct
        })
        const response = await ProduManager.createOne(req.body);
        res.status(200).json({ message: "Producto created", response });
    } catch (error) {
        res.status(500).json({message: error.message})
        res.status(500).json({ message: error.message });
    }
})
router.post("/change", async (req, res) => {
    const accion = req.body.accion;
    const id = req.body.id;
    try {
        if (accion === "AGREGAR") {
            const productNew = ProduManager.createOne(req.body);
        } 
        else {
            ProduManager.deleteOne(+id);
        }
        res.status(200).send("Operación exitosa");

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Error");
    }
});
export default router;