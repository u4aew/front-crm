class AttributesApiService {
  constructor (http) {
    this.$http = http
  }

  getAttributes () {
    return new Promise((resolve, reject) => {
      this.$http.get('attributes')
        .then((data) => {
          resolve(data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }

  createAttribute (data) {
    return new Promise((resolve, reject) => {
      this.$http.post('attributes', data)
        .then((data) => {
          resolve(data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }

  updateAttribute (data) {
    return new Promise((resolve, reject) => {
      this.$http.put('attributes', data)
        .then((data) => {
          resolve(data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }

  getAttribute (id) {
    return new Promise((resolve, reject) => {
      this.$http.get(`attributes/${id}`)
        .then((data) => {
          resolve(data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }

  deleteAttribute (id) {
    return new Promise((resolve, reject) => {
      this.$http.delete(`attributes/${id}`)
        .then((data) => {
          resolve(data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }
}

export default AttributesApiService
