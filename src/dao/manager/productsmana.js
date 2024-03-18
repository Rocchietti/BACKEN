import { productsModel } from "../models/products.model.js";
class ProductManager {
    async findAll(obj) {
        const { limit = 20, page = 1, orders = 1, ...filter } = obj;
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: parseInt(orders) === 1 ? 'price' : '-price',
        };
        
        const response = await productsModel.paginate(filter, options);
        const info = {
            status: response.docs ? "success" : "error",
            results: response.docs,
            pages: response.totalPages,
            nextPage: response.page === response.totalPages ? null : response.page + 1,
            prevPage: response.page === 1 ? null : response.page - 1,
            next: response.hasNextPage
                ? `http://localhost:8080/api/products?page=${response.page + 1}`
                : null,
            prev: response.hasPrevPage
                ? `http://localhost:8080/api/products?page=${response.page - 1}`
                : null,
        };
        console.log(info);
        return {info};
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