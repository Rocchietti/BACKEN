import { Router } from "express";
import { Users } from "../dao/manager/usermana.js";

const router = Router();

router.post("/signup", async (req, res) => {
    const { name, lastName , email, password } = req.body;
    if (!name || !lastName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const createdUser = await Users.createOne(req.body);
        res.redirect("/api/views/login");
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
    const user = await usersManager.findByEmail(email)
    console.log("user",user)
    if (!user){
    return res.redirect("/signup")
}

const isPasswordValid = password === user.password
    if(!isPasswordValid){
    return res.status(401).json({message:"Password is not valid"})
}
        const sessionInfo = email === "adminCoder@coder.com" && password === "adminCod3r123" ?
        {email, firstName:user.firstName, isAdmin: true}
        : {email, firstName:user.firstName, isAdmin: false} 
    req.session.user = sessionInfo
const products = await productsManager.findAll({limit:10, page:1, sort:{}, query:{} })
    const docs = products.payload.docs
    res.render("products",{products: docs,user:user.firstName});
} catch (error) {
    res.status(500).json({error:error})
}
    })
    router.get("/signout", async(req,res)=>{
req.session.destroy(()=>{
res.redirect("/login")
        })
    })
export default router;