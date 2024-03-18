import express from 'express'
import cartRouter from './routes/carts.router.js';
import productsRouter from './routes/products.router.js'
import viewsRouter from './routes/views.router.js'
import sessionRouter from './routes/session.router.js'
import {__dirname } from './utils.js'
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import { cartManager } from './dao/manager/cartsmana.js';
import { ProduManager } from './dao/manager/productmana.js';
import { chatMana } from './dao/manager/chatmana.js';

//db
import './db/configDB.js'

const PORT = 8080;
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
app.use("/api/session", sessionRouter);



const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`);
})
const socketServer = new Server (httpServer) 

socketServer.on('connection', async (socket) => {
    console.log(`cliente conectado ${socket.id}`);
//CHAT
    socket.on("newUser", (usuario) => {
        socket.broadcast.emit("userConnect", usuario );
        socket.emit('connected')
    })
    socket.on("message", async (infoMessage) => {
        await chatMana.createOne(infoMessage);
        const allMessages = await chatMana.findAll();
        socketServer.emit("chat", allMessages);
    });

    try {
        const productosActualizados = await ProduManager.findAll(obj);
        console.log(productosActualizados);
        socketServer.emit('productosActualizados', productosActualizados);

        socket.on('agregado', async (nuevoProducto) => {
            try {
                const products = await ProduManager.createOne(nuevoProducto);
                const productosActualizados = await ProduManager.findAll();
                socketServer.emit('productosActualizados', productosActualizados);
            } catch (error) {
                console.error('Error al agregar el producto:', error);
            }
        });
        socket.on('eliminar', async (id) => {
            try {
                const products = await ProduManager.deleteOne(id);
                const productosActualizados = await ProduManager.findAll();
                socketServer.emit('productosActualizados', productosActualizados);
            } catch (error) {
                console.error('Error al eliminar el producto:', error);
            }
        })
    } catch (error) {
        console.error("Error de conexión");
    }
    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado.');
    });
})
    //PRODUCTOS