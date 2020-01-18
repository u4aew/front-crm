import ProductList from '../model/product-list'

class ProductsService {
    constructor (pageManager, api) {
        this.$pageManager = pageManager
        this.$api = api
    }
    async getProductList () {
        try {
           let data = await this.$api.getProducts()

            console.log(data)
            try {
                return new ProductList(data)
            }
            catch (e) {
                console.log(e)
            }
        }
        catch (e) {
            console.log(e)
        }
    }
}
export default ProductsService
