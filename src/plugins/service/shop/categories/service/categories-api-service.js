class CategoriesApiService {
  constructor (http) {
    this.$http = http
  }

  getCategories () {
    return new Promise((resolve, reject) => {
      this.$http.get('categories')
        .then((data) => {
          resolve(data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }

  createCategory (data) {
    return new Promise((resolve, reject) => {
      this.$http.post('categories', data, {
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

  updateCategory (data) {
    return new Promise((resolve, reject) => {
      this.$http.put('categories', data, {
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

  getCategory (id) {
    return new Promise((resolve, reject) => {
      this.$http.get(`categories/${id}`)
        .then((data) => {
          resolve(data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }

  deleteCategory (id) {
    return new Promise((resolve, reject) => {
      this.$http.delete(`categories/${id}`)
        .then((data) => {
          resolve(data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }
}

export default CategoriesApiService
