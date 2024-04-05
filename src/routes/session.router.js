import { Router } from "express";
import { Users } from "../dao/manager/usermana.js";
import { ProduManager } from "../dao/manager/productmana.js";

const router = Router();

router.post("/signup", async (req, res) => {
    const { name, last_name , email, password } = req.body;
    console.log(req.body);
    if (!name || !last_name || !email || !password) {
        return res.status(400).json({ message: "Some data is missing" });
    }
    try {
        const createdUser = await Users.createOne(req.body);
    /*     res.redirect("/login"); */
        res.status(200).json({ message: "User created", user: createdUser });
    } catch (error) {
        res.status(500).json({ error });
    }
    });
router.post("/login", async(req,res)=>{
    const { email, password } = req.body;
    if ( !email || !password) {
    return res.status(400).json({ message: "Some data is missing" });
}
    try {
    const user = await Users.findByEmail(email)
    console.log("user",user)
    if (!user){
    return res.redirect("/signup")
}
const isPasswordValid = password === user.password
    if(!isPasswordValid){
    return res.status(401).json({message:"Password is not valid"})
}
    const sessionInfo = email === "adminCoder@coder.com" && password === "adminCod3r123" ?
    {email, name:user.name, isAdmin: true}
    : {email, name:user.name, isAdmin: false} 
    req.session.user = sessionInfo
    const products = await ProduManager.findAll(req.query)
    res.render("home" , {products: products, user:req.session.user, style:"product"});
} catch (error) {
    res.status(500).json({error:error})
}
    })
    router.get("/signout", async(req,res)=>{
    req.session.destroy(()=>{
    res.redirect("/login")
})
})
    ;
export default router;