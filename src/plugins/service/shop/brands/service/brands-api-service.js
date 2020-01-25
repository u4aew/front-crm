class BrandsApiService {
  constructor (http) {
    this.$http = http
  }

  getBrands () {
    return new Promise((resolve, reject) => {
      this.$http.get('brands')
        .then((data) => {
          resolve(data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }

  createBrand (data) {
    return new Promise((resolve, reject) => {
      this.$http.post('brands', data, {
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

  updateBrand (data) {
    return new Promise((resolve, reject) => {
      this.$http.put('brands', data, {
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

  getBrand (id) {
    return new Promise((resolve, reject) => {
      this.$http.get(`brands/${id}`)
        .then((data) => {
          resolve(data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }

  deleteBrand (id) {
    return new Promise((resolve, reject) => {
      this.$http.delete(`brands/${id}`)
        .then((data) => {
          resolve(data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }
}

export default BrandsApiService
