import express from 'express'
import cartRouter from './routes/carts.router.js';
import productsRouter from './routes/products.router.js'
import viewsRouter from './routes/views.router.js'
import sessionRouter from './routes/session.router.js'
import cookieRouter from './routes/cookies.router.js'
import {__dirname } from './utils.js'
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import { cartManager } from './dao/manager/cartsmana.js';
import { ProduManager } from './dao/manager/productmana.js';
import { chatMana } from './dao/manager/chatmana.js';
import usersRouter from './routes/users.router.js'
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import './public/js/passport.js'
import passport from 'passport';
//db
import './db/configDB.js'

const PORT = 8080;
//express
const app = express()
app.use(express.urlencoded({ extended:true }));
app.use(express.json());
//handlebars
app.engine("handlebars", engine())
app.set("views",  __dirname+"/views");
app.set("view engine","handlebars");
//carpeta public
app.use(express.static(__dirname+"/public"))
//cookie
app.use(cookieParser("SecretCookie"))
//session
const URI = "mongodb+srv://lucasrocchietti1:coderhouse@cluster0.wfh2e2r.mongodb.net/dbCoder?retryWrites=true&w=majority"
app.use(session({
    store: new MongoStore({
        mongoUrl: URI,
    }),
    secret: "secretSessions", 
    cookie: {maxAge: 60000}
}
)
)
//passport 
app.use(passport.initialize())
app.use(passport.session())

//req ---> params, query, body

app.use("/api/productos", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);
app.use("/api/session", sessionRouter);
app.use("/api/users", usersRouter)
app.use('/api/cookies', cookieRouter)
const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`);
})
const socketServer = new Server(httpServer);
socketServer.on("connection", (socket) => {
  socket.on("newMessage", async(message) => {
    await chatMana.createOne(message)
    const messages = await chatMana.findAll()
    socketServer.emit("sendMessage", messages);
  });
  socket.on("showProducts", async() => {
    const products = await ProduManager.findAll({limit:10, page:1, sort:{}, query:{} })
    socketServer.emit("sendProducts", products);
  });
  socket.on("newPrice", (value) => {
    socket.broadcast.emit("priceUpdated", value);
  });
  socket.on("showProducts", async(req,res) => {
    const products = await manager.getProducts({})
    socket.emit("sendProducts", products);
  });
  socket.on("addProduct", async(product) => {
    await ProduManager.addProduct(product.title,product.description,product.price,product.thumbnail,product.code,product.stock)
    const products = await ProduManager.getProducts({})
    socketServer.emit("productUpdated", products);
  });
  socket.on("deleteProduct", async(id) => {
    await ProduManager.deleteProduct(+id)
    const products = await ProduManager.getProducts({})
    socketServer.emit("productUpdated", products);
  });
});