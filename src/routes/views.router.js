import { Router } from "express";
import { ProduManager } from "../dao/manager/productmana.js";
import { cartManager } from "../dao/manager/cartsmana.js";
import { Users } from "../dao/manager/usermana.js";

const router = Router ();

router.get("/", async (req, res) => {
  try {
      const products = await ProduManager.findAll(req.query);
      console.log(products);
      res.render("home", {products: products, user: req.session.user, style: "product"} );
  } catch (error) {
      console.error(error);
      res.status(500).send("Error interno del servidor");
  }
});
router.get('/cookies', async (req,res) => {
    res.render('cookies')
})
router.get("/login", (req, res) => {
        if (req.session.user) {
        return res.redirect("/home", {user : req.session.user});
}
        res.render("login");
});

router.get("/signup", (req, res) => {
        if (req.session.user){ 
        return res.redirect("/home", {user : req.session.user});
}
        res.render("signup");
});
router.get("/carts/:cid", async(req,res)=>{
    try {
      const {cid} = req.params
      const cart = await cartManager.findCartById(cid)
      const products = cart.products
      res.render("cart",{products: products})
      console.log(products)
    } catch (error) {
      return error
    }
  });

export default router