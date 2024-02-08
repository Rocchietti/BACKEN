import express from 'express'
import { Producto } from './ProductManager.js'

const app = express()

app.use(express.urlencoded({extended:true}))
// req --> params, query, body
app.get('/api/productos', async (req,res) => {
    console.log(req.query);
    const products = await Producto.getProduct(req.query)
    res.json({message:'lista de productos',products})
}
)
app.get('/api/productos/:pid', async (req,res) => {
    console.log(req.params);
    const {pid} = req.params
    const idProducto = await Producto.getProductById(pid)
    res.json({message:'Producto por ID', idProducto})
}
)
app.get('/cellfone', (req,res) => {
    res.send('Probando Celular')
}
)
app.get('/direccion', (req,res) => {
    res.send('Probando Direcciones ')
}
)

app.listen(8080, () => {
    console.log('Escuchando al puerto 8080');
})