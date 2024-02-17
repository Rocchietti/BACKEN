import { Router } from "express";
import { Producto } from "../ProductManager.js";
const router = Router ();
router.get('/', async (req, res) => {
    const productos = await Producto.getProduct(req.query)
res.render("home", {
    productos: productos,
    styles: 'productos'
})
}
)
router.get('/realtimeproducts', async (req,res) => {
    res.render('realTimeProducts')
})


export default router