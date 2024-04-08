import { Router } from "express";
import { Users } from "../dao/manager/usermana.js";
import { ProduManager } from "../dao/manager/productmana.js";
import { hashData, compareData } from "../utils.js";
import passport from "passport";

const router = Router();

/* router.post("/signup", async (req, res) => {
    const { name, last_name , email, password } = req.body;
    console.log(req.body);
    if (!name || !last_name || !email || !password) {
        return res.status(400).json({ message: "Some data is missing" });
    }
    try {
        const hashPassword= await hashData(password)
        const createdUser = await Users.createOne({...req.body, 
        password: hashPassword});
    /*     res.redirect("/login"); */
  /*       res.status(200).json({ message: "User created", user: createdUser });
    } catch (error) {
        res.status(500).json({ error });
    }
    }); */

/* router.post("/login", async(req,res)=>{
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
const isPasswordValid = await compareData(password, user.password)
    if(!isPasswordValid){
    return res.status(401).json({message:"Password is not valid"})
}
    const sessionInfo = email === "adminCoder@coder.com" && password === "adminCod3r123" ?
    {email, name:user.name, isAdmin: true}
    : {email, name:user.name, isAdmin: false} 
    req.session.user = sessionInfo
    console.log(sessionInfo);
    const products = await ProduManager.findAll(req.query)
    res.render("home" , {products: products, user:req.session.user, style:"product"});
} catch (error) {
    res.status(500).json({error:error})
}
    }) */

//SIGNUP - LOGIN - PASSPORT LOCAL

router.post('/signup', passport.authenticate('signup', {successRedirect: "/login", 
failureRedirect: '/error'}));

router.post('/login', passport.authenticate('login', {successRedirect: "/", 
failureRedirect: '/error'}), 
/* {successRedirect: '/home', 
failureRedirect: '/error'} */)

//SIGNUP -LOGIN - PASSPORT GITHUB

router.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/callback', passport.authenticate('github'), (req,res) => {
    res.send('probando')
})

router.get("/signout", async(req,res)=>{
    req.session.destroy(()=>{
    res.redirect("/login")
})
    });
router.post('/restore', async(req,res) => {
    const {email, password} = req.body
    try {
        const user = await Users.findByEmail(email)
        if (!user){
            return res.redirect("/login")
        }
        const hashedPassword = await hashData(password)
        user.password = hashedPassword
        await user.save()
        res.status(200).json({message: 'Update with success'})
    } catch (error) {
        res.status(500).json({message: 'IS not valid'})
    }
})

export default router;