import {Router} from "express"

const router = Router()

router.post('/', async (req,res) => {
    const {email} = req.body
    res.cookie('user', email, {maxAge:20000}).send('Cookie Created')
})

router.get('/view', async (req,res)=> {
    const {user} = req.cookies
    console.log({user})
    res.send("View Cookie");
}) 

export default router 