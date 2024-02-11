import express from 'express'
import cartRouter from './routes/carts.router.js';
import productsRouter from './routes/products.router.js'
/* import {__dirname } from './utils.js' */

const app = express()

app.use(express.urlencoded({ extended:true }));

app.use(express.json());

/* app.use(express.static(__dirname + './public')) */
//req ---> params, query, body

app.use("/api/productos", productsRouter);
app.use("/api/carts", cartRouter);


app.listen(8080, () => {
    console.log('Escuchando al puerto 8080');
})