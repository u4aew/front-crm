import Helper from '@/core/utils/helper'

import Product from './product'
class ProductList {
    constructor (products) {
        this.products = null
        if (Helper.isNotEmpty(products)) {
            try {
                this.setProducts(products)
            }
            catch (e) {
                throw new Error(e)
            }
        }
    }
    setProducts (products) {
        this.products = []
        try {
            products.forEach((data)=> {
                console.log(data)
                this.products.push(new Product(data))
            })
        }
        catch (e) {
            throw new Error(e)
        }

    }
    getProducts () {
        return this.products
    }
}
export default ProductList
