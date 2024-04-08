import { Router } from "express";
import { ProduManager } from "../dao/manager/productmana.js";
import { cartManager } from "../dao/manager/cartsmana.js";
import { Users } from "../dao/manager/usermana.js";
const router = Router ();
router.get("/", async (req, res) => {
  try {
      const products = await ProduManager.findAll(req.query);
      console.log(products);
      const {name, last_name, email} = req.user;
      console.log(name, last_name, email);
      res.render("home", {products: products, user: {name, last_name, email}, style: "product"} );
  } catch (error) {
      console.error(error);
      res.status(500).send("Error interno del servidor");
  }
});
router.get('/cookies', async (req,res) => {
    res.render('cookies')
})
router.get("/login", (req, res) => {
    if (!req.session.passport) {
    return res.redirect("/signup");
}    
res.render("login"); 
});
router.get("/signup", (req, res) => {
 if (req.session.user){ 
        return res.redirect("/login");
} 
        res.render("signup");
});
router.get('/carts/:cid', async (req, res) => {
  const { cid } = req.params;
  try {
      const cart = await cartManager.findCartById(cid);
      const cartProducts = cart.products.map(product => Object.assign({}, product._doc))
      if (!cart) {
          return res.status(404).send('Carrito no encontrado');
      }
      res.render('cart', { cart:cartProducts, style:"product" });
  } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
  }
});
router.get('/restore', async (req,res) => {
    res.render('restore')
})
router.get('/error', async (req,res) => {
    res.render('error')
})


export default router