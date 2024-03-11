import { Router } from "express";
import { Producto } from "../dao/ProductManager.js";
import { ProduManager } from "../dao/manager/productmana.js";

const router = Router ();

router.get('/', async (req, res) => {
    const productos = await ProduManager.findAll()
res.render("home", {
    productos: productos,
})
}
)
router.get('/realtimeproducts', async (req,res) => {
    res.render('realTimeProducts')
})
router.get('/chat', async (req,res) => {
    res.render("chat")
})
 



export default router