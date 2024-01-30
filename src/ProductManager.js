import { existsSync, promises } from 'fs'

const path = 'products.json'
class ProductManager {
    constructor () {
    }
    async getProduct(queryLimit){
        const {limit} = queryLimit
        try {
            if(existsSync(path)){
                const productsFile = await promises.readFile(path,'utf-8')
                const productsData = JSON.parse(productsFile)
                return limit ? productsData.slice(0, +limit) : productsData
            }else {
                return []
            }
        } catch (error) {
            return []
        }
    }  
    async addproduct(product) {
        try {
            const productos = await this.getProduct({})
            const { title, description, price, thumbnail, code, stock } = product
        if(!title || !description || !price || !thumbnail || !code || !stock){
            console.log('Vuelva a intentar');
            return 
        }
        let id 
        if(!productos.length){
            id = 1
        }else {
            id = productos[productos.length-1].id + 1 
        }
        productos.push({id,...product})
        await promises.writeFile(path, JSON.stringify(productos))
        } catch (error) {
            console.log('no se puede añadir un producto en este momento');
        }
    
    }
    async getProductById(idProducto){
        try {
            const productos= await this.getProduct({})
            const producto= productos.find(u=>u.id===idProducto)
            if(!productos){
                return 'No se ha encontrado el producto'
            } else {
                return producto
            }
        } catch (error) {
            return 'lo sentimos, no pudimos continuar con su busqueda'
        }
    }
    async deleteProduct(idProducto) {
        try {
            const productos= await this.getProduct({})
            const productActualizado= productos.filter(u=>u.id===idProducto)
            await promises.readFile(path, JSON.stringify(productActualizado))
        } catch (error) {
            return error
        }
    }

    async updateProduct(idProducto, campo){
        try {
            const productos= await this.getProduct({})
            const elemento = productos.findIndex((p) => p.id === idProducto)
            if(elemento === -1){
                return -1
            }
            const product = productos[elemento]
            productos[elemento] = [{...product, ...campo}]
            await promises.writeFile(path, JSON.stringify(productos))
            return 1
        } catch (error) {
            return 'No se pudo actualizar el producto'
        }
    }

    }

const Producto1 = {
    title: 'producto prueba',
    description:'Este es un producto prueba',
    price:200,
    thumbnail:'Sin imagen',
    code:'abc123',
    stock:25
}
const Producto2 = {
    title: 'producto prueba',
    description:'Este es un producto prueba',
    price:200,
    thumbnail:'Sin imagen',
    code:'abc123',
    stock:25
}

const Producto3 = {
    title: 'producto prueba',
    description:'Este es un producto prueba',
    price:200,
    thumbnail:'Sin imagen',
    code:'abc123',
    stock:25
}
const Producto4 = {
    title: 'producto prueba',
    description:'Este es un producto prueba',
    price:200,
    thumbnail:'Sin imagen',
    code:'abc123',
    stock:25
}

/*     async function test () {
        const Producto =  new ProductManager('productos.json')
        await Producto.getProduct()
        await Producto.addproduct(Producto1, Producto2, Producto3, Producto4)
        await Producto.getProduct()
        await Producto.getProductById(2)
        await Producto.updateProduct(4)
        await Producto.deleteProduct(3)
    }
    await test() */

    console.log(null || 'string');