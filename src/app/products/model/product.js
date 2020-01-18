class Product {
    constructor ({title, category, date, priceDay, priceDeal}) {
        this.title = title
        this.category = category
        this.date = date
        this.priceDay = priceDay
        this.priceDeal = priceDeal
    }
    getTitle () {
        return this.title
    }
    getCategory () {
        return this.category
    }
    getDate () {
        return this.date
    }
    getPriceDay () {
        return this.priceDay
    }
    getPriceDeal () {
        return this.priceDeal
    }
}

export default Product
