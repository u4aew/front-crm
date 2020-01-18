'use strict'

const responseInterceptor = () => response => {
  response.axios = true
  return response
}

export default responseInterceptor
