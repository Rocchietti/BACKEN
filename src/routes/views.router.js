import { Router } from "express";
import { ProduManager } from "../dao/manager/productmana.js";
import { cartManager } from "../dao/manager/cartsmana.js";
import { Users } from "../dao/manager/usermana.js";


const router = Router ();

router.get("/products", async (req, res) => {
  try {
      const products = await ProduManager.findAll(req.query);
      const productsFinal = products.info.results;
      const clonedProducts = productsFinal.map(product => Object.assign({}, product._doc));
      const result = clonedProducts;
      const paginate = products.info.pages;
      const sort = req.query.orders;
      console.log(result);
      res.render("products", {products: result, paginate: paginate, sort: sort, style: "product"} );
  } catch (error) {
      console.error(error);
      res.status(500).send("Error interno del servidor");
  }
});
router.get("/login", (req, res) => {
    if (req.session) {
        if (req.session.user) return res.redirect("/home");
    }
    res.render("login");
});

router.get("/signup", (req, res) => {
    if (req.session) {
        if (req.session.user) return res.redirect("/login");
    }
    res.render("signup");
});
router.get("/carts/:cid", async(req,res)=>{
    try {
      const {cid} = req.params
      const cart = await cartManager.findCartById(cid)
      const products = cart.products
      res.render("cart",{products})
      console.log(products)
    } catch (error) {
      return error
    }
  })
router.get("/changeproducts", async (req, res) => {
    try {
    res.render("changeproducts");
    } catch {
        error
    }
});


export default router