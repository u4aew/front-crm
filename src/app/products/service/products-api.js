class ProductsApi {
    constructor (http) {
        this.$http = http
    }
    async getProducts () {
         try {
             await this.$http('get')
             return [{
                 title:'Начинающий кондитер',
                 category:'Хобби',
                 date:'02.07.1998',
                 priceDay:99000,
                 priceDeal: 30000
             },{
                 title:'Начинающий кондитер',
                 category:'Хобби',
                 date:'02.07.1998',
                 priceDay:99000,
                 priceDeal: 30000
             },{
                 title:'Начинающий кондитер',
                 category:'Хобби',
                 date:'02.07.1998',
                 priceDay:99000,
                 priceDeal: 30000
             },{
                 title:'Начинающий кондитер',
                 category:'Хобби',
                 date:'02.07.1998',
                 priceDay:99000,
                 priceDeal: 30000
             },{
                 title:'Начинающий кондитер',
                 category:'Хобби',
                 date:'02.07.1998',
                 priceDay:99000,
                 priceDeal: 30000
             },{
                 title:'Начинающий кондитер',
                 category:'Хобби',
                 date:'02.07.1998',
                 priceDay:99000,
                 priceDeal: 30000
             },{
                 title:'Начинающий кондитер',
                 category:'Хобби',
                 date:'02.07.1998',
                 priceDay:99000,
                 priceDeal: 30000
             }]
         }
         catch (e) {
             throw new Error(e)
         }
    }
}
export default ProductsApi
