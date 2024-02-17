const socketClient = io();

const formAdd = document.getElementById("formAdd");
const addTitle = document.getElementById("title");
const addDescription= document.getElementById("description");   
const addPrice= document.getElementById("price");
const addCode= document.getElementById("code");
const addStock= document.getElementById("stock");
const addCategory= document.getElementById("category");
const formDelete = document.getElementById("formDelete");
const IdDelete = document.getElementById("idDelete");
const RealTime = document.getElementById("divRealTimeProduct")
const listaDeProductosActualizados = (producto) => {
    let divRealTimeProduct = RealTime;
    let html = "";
    producto.forEach((product) => {
      html += ` 
        <p>id: ${product.id}</p>
        <h3>titulo: ${product.title}</h3>
        <p>descripcion: ${product.description}</p>
        <p>precio: ${product.price}</p>
        <p>codigo: ${product.code}</p>
        <p>stock: ${product.stock}</p>
        <hr>
        `;
    divRealTimeProduct.innerHTML = html;
})};
socketClient.on("products", (products) => {
  listaDeProductosActualizados(products);
});
  formAdd.onsubmit = (e) => {
    e.preventDefault();
    const product = {
    title:addTitle.value,
    description: addDescription.value,
    price: addPrice.value,
    code:addCode.value,
    stock:addStock.value,
    category:addCategory.value,
  }
    socketClient.emit("addProduct", product)
}

socketClient.on("productUpdate", (productosAds) => {
  listaDeProductosActualizados(productosAds)
 })
formDelete.onsubmit = (e)=>{
    e.preventDefault();
    const idDelete = IdDelete.value;
    socketClient.emit("deleteProduct", idDelete);
  };
  socketClient.on("productDelete", (products) => {
    listaDeProductosActualizados(products)
  });