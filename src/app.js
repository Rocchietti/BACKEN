import express from 'express'
import cartRouter from './routes/carts.router.js';
import productsRouter from './routes/products.router.js'
import viewsRouter from './routes/views.router.js'
import {__dirname } from './utils.js'
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import { Producto } from './ProductManager.js';
const app = express()
app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.engine("handlebars", engine())
app.set("views",  __dirname+"/views");
app.set("view engine","handlebars");
app.use(express.static(__dirname+"/public"))
//req ---> params, query, body
app.use("/api/productos", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/api/views", viewsRouter);
const httpServer = app.listen(8080, () => {
    console.log('Escuchando al puerto 8080');
})
const socketServer = new Server (httpServer) 
socketServer.on('connection', async (socket) => {
/*      console.log('socket', socket); */
    console.log('cliente conectado');
/*     socket.on('disconnect', () => {
console.log('Cliente desconectado');
    }) */
    const products= await Producto.getProduct()
    socketServer.emit('products', products)

    socket.on('addProduct', async (producto) => {
        const product= await Producto.addproduct(producto);
        socketServer.emit('productUpdate', product)
    })
    socket.on('deleteProduct', async (productId) => {
            const producto = await Producto.deleteProduct(+productId);
            socketServer.emit('productDelete', producto);
    })})