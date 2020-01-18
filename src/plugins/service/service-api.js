'use strict'

class ServiceApi {
  constructor (httpClient) {
    this.$http = httpClient
  }

  test () {
    this.$http.get(
      'test'
    ).then(response => {

    }).catch(() => {

    }).finally(() => {

    })
  }

  // _catchError (error, code) {
  // }

  // _getAuthHeaders () {
  // }
}

export default ServiceApi
