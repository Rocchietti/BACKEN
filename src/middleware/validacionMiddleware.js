export const validacion =  (req, res, next) => {
    const { title, description, price, code, stock, category} = req.body
    if (!title || !description || !code  || !price || !stock || !category) {
        res.status(400).json({ message: 'faltan datos' })
        next()
    }
    }