import { productsModel } from "../models/products.model.js";
class ProductManager {
    async findAll(obj) {
        const { limit = 20, page = 1, orders = 1, ...filter } = obj;
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: parseInt(orders) === 1 ? 'price' : '-price',
            lean:true
        };

        const response = await productsModel.paginate(filter, options);
        const info = {
            status: response.docs ? "success" : "error",
            results: response.docs,
            pages: response.totalPages,
            next: response.hasNextPage
                ? `http://localhost:8080/?page=${response.nextPage}`
                : null,
            prev: response.hasPrevPage
                ? `http://localhost:8080/?page=${response.prevPage}`
                : null,
        };
        console.log(response);
        return response;
    }
        async findById(id) {
            const response = await productsModel.findById(id);
            return response
        }
        async createOne(obj) {
            const response = await productsModel.create(obj)
            return response
        }
        async updateOne(id, obj) {
            const response = await productsModel.updateOne({_id:id}, obj)   
            return response
        }
        async deleteOne(id){
            const response = await productsModel.findOneAndDelete({_id:id})
            return response
        }
}
export const ProduManager = new ProductManager()