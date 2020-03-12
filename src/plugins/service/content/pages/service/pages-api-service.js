class PagesApiService {
  constructor (http) {
    this.$http = http
  }

  getPages () {
    return new Promise((resolve, reject) => {
      this.$http.get('pages')
        .then((data) => {
          resolve(data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }

  createPage (data) {
    return new Promise((resolve, reject) => {
      this.$http.post('pages', data, {
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

  updatePage (data) {
    return new Promise((resolve, reject) => {
      this.$http.put('pages', data, {
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

  getPage (id) {
    return new Promise((resolve, reject) => {
      this.$http.get(`pages/${id}`)
        .then((data) => {
          resolve(data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }

  deletePage (id) {
    return new Promise((resolve, reject) => {
      this.$http.delete(`pages/${id}`)
        .then((data) => {
          resolve(data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }
}

export default PagesApiService
