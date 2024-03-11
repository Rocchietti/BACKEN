import { existsSync, promises } from 'fs'
const path = 'products.json'
class ProductManager {
    constructor () {
    }
    async getProduct(query){
        try {
            if(existsSync(path)){
                const productsFile = await promises.readFile(path,'utf-8')
                const productsData = JSON.parse(productsFile)
                return productsData
            }else {
                return []
            }
        } catch (error) {
            return []
        }
    }  
    async addproduct(product) {
        try {
            const productos = await this.getProduct()
            const { title, description, price, code, stock } = product
        if(!title || !description || !price || !code || !stock){
            console.log('Vuelva a intentar');
            return 
        }
        let status = true
        let id 
        if(!productos.length){
            id = 1
        }else {
            id = productos[productos.length-1].id + 1 
        }
        const newProduct = {id, ... product, ... status}
        productos.push(newProduct)
        await promises.writeFile(path, JSON.stringify(productos))
        } catch (error) {
            console.log('no se puede añadir un producto en este momento');
        }
    
    }
    async getProductById(idProducto){
        try {
            const productos= await this.getProduct()
            const producto= productos.find(p=>p.id===idProducto)
            return producto;
        } catch (error) {
            return 'lo sentimos, no pudimos continuar con su busqueda'
        }
    }
    async deleteProduct(idProducto) {
        try {
            const productos= await this.getProduct()
            const product = productos.find(p=> p.id==idProducto)
            if(product){
                const productActualizado= productos.filter(p=>p.id!=idProducto)
                await promises.writeFile(path, JSON.stringify(productActualizado))
            }
            return product;
        } catch (error) {
            return console.log(error.message);
        }
    }

    async updateProduct(idProducto, obj){
        try {
            const productos= await this.getProduct()
            const index = productos.findIndex(p => p.id === idProducto)
            if(index === -1 ){
                return null;
            }
            const updateProdu = {...productos[index], ...obj}
            productos.splice(index, 1, updateProdu)
            await promises.writeFile(path, JSON.stringify(productos))
            return updateProdu
        } catch (error) {
            return 'No se pudo actualizar el producto'
        }
    }
    }
const Producto1= {
    title: 'Tarjeta de video',
    description:'Este es un producto prueba',
    price:2030,
    thumbnail:'Sin imagen',
    code:'abc123',
    stock:25
}
const Producto2= {
    title: 'Memorias RAM',
    description:'Este es un producto prueba',
    price:2100,
    thumbnail:'Sin imagen',
    code:'abc123',
    stock:25
}
const Producto3= {
    title: 'Reloj',
    description:'Este es un producto prueba',
    price:900,
    thumbnail:'Sin imagen',
    code:'abc123',
    stock:25
}
const Producto4= {
    title: 'HDD/SDD',
    description:'Este es un producto prueba',
    price:700,
    thumbnail:'Sin imagen',
    code:'abc123',
    stock:25
}
const Producto5= {
    title: 'Mother',
    description:'Este es un producto prueba',
    price:500,
    thumbnail:'Sin imagen',
    code:'abc123',
    stock:25
}
const Producto6= {
    title: 'Ventilador',
    description:'Este es un producto prueba',
    price:400,
    thumbnail:'Sin imagen',
    code:'abc123',
    stock:25
}
const Producto7= {
    title: 'teclado',
    description:'Este es un producto prueba',
    price:365,
    thumbnail:'Sin imagen',
    code:'abc123',
    stock:25
}
const Producto8= {
    title: 'mouse',
    description:'Este es un producto prueba',
    price:245,
    thumbnail:'Sin imagen',
    code:'abc123',
    stock:25
}
const Producto9= {
    title: 'monitor',
    description:'Este es un producto prueba',
    price:2097,
    thumbnail:'Sin imagen',
    code:'abc123',
    stock:25
}
const Producto10= {
    title: 'auriculares',
    description:'Este es un producto prueba',
    price:208,
    thumbnail:'Sin imagen',
    code:'abc123',
    stock:25
}
const Producto11= {
    title: 'procesadores',
    description:'Este es un producto prueba',
    price:22,
    thumbnail:'Sin imagen',
    code:'abc123',
    stock:25
}
/* 
     async function test () { 
        const Producto =  new ProductManager('productos.json') 
        await Producto.addproduct(Producto1)
        await Producto.addproduct(Producto2)
        await Producto.addproduct(Producto3)
        await Producto.addproduct(Producto4)
        await Producto.addproduct(Producto5)
        await Producto.addproduct(Producto6)
        await Producto.addproduct(Producto7)
        await Producto.addproduct(Producto8)
        await Producto.addproduct(Producto9)
        await Producto.addproduct(Producto10)
        await Producto.addproduct(Producto11)
    }
test() */
 
export const Producto = new ProductManager()