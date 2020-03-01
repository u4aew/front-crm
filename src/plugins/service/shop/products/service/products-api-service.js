class ProductsApiService {
  constructor (http) {
    this.$http = http
  }

  getProducts () {
    return new Promise((resolve, reject) => {
      this.$http.get('products')
        .then((data) => {
          resolve(data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }

  createProduct (data) {
    return new Promise((resolve, reject) => {
      this.$http.post('products', data, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`
        }
      })
        .then((data) => {
          resolve(data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }

  createProductOption (data) {
    return new Promise((resolve, reject) => {
      this.$http.post('products/options', data)
        .then((data) => {
          resolve(data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }

  updateProductOption (form) {
    return new Promise((resolve, reject) => {
      this.$http.put('products/options', form)
        .then((data) => {
          resolve(data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }

  deleteProductOption (id) {
    return new Promise((resolve, reject) => {
      this.$http.delete(`products/options/${id}`)
        .then((data) => {
          resolve(data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }

  updateProduct (data) {
    return new Promise((resolve, reject) => {
      this.$http.put('products', data, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`
        }
      })
        .then((data) => {
          resolve(data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }

  getProduct (id) {
    return new Promise((resolve, reject) => {
      this.$http.get(`products/${id}`)
        .then((data) => {
          resolve(data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }

  deleteProduct (id) {
    return new Promise((resolve, reject) => {
      this.$http.delete(`products/${id}`)
        .then((data) => {
          resolve(data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }
}

export default ProductsApiService
