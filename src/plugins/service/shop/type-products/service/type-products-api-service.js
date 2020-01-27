class TypeProductsApiService {
  constructor (http) {
    this.$http = http
  }

  getTypeProducts () {
    return new Promise((resolve, reject) => {
      this.$http.get('type-products')
        .then((data) => {
          resolve(data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }

  createTypeProduct (data) {
    return new Promise((resolve, reject) => {
      this.$http.post('type-products', data)
        .then((data) => {
          resolve(data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }

  updateTypeProduct (data) {
    return new Promise((resolve, reject) => {
      this.$http.put('type-products', data)
        .then((data) => {
          resolve(data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }

  getTypeProduct (id) {
    return new Promise((resolve, reject) => {
      this.$http.get(`type-products/${id}`)
        .then((data) => {
          resolve(data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }

  deleteTypeProduct (id) {
    return new Promise((resolve, reject) => {
      this.$http.delete(`type-products/${id}`)
        .then((data) => {
          resolve(data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }
}

export default TypeProductsApiService
