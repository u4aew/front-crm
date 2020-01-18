'use strict'

import Helper from '@/core/utils/helper'

const delayInterceptor = (axios, defaultOptions, serverHeader = null) => error => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    error.result = error.response.data
    error.serverResponded = Helper.isDefined(serverHeader) ? Helper.getCaseInsensitiveAttr(error.response.headers, serverHeader, false) : true
    error.axios = true
    return Promise.reject(error)
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    error.axios = true
    error.serverResponded = false
  } else {
    // Something happened in setting up the request that triggered an Error
    error.axios = true
    error.serverResponded = false
    return Promise.reject(error)
  }
  const config = error.config

  // If we have no information to retry the request
  if (!config) {
    return Promise.reject(error)
  }

  const currentState = getCurrentState(config)
  const shouldRetry = currentState.retryCount < defaultOptions.retries

  if (shouldRetry) {
    currentState.retryCount += 1
    return new Promise(resolve =>
      setTimeout(() =>
        resolve(
          axios(config)
        ), defaultOptions.delay, serverHeader)
    )
  }

  return Promise.reject(error)
}

function getCurrentState (config) {
  const NAMESPACE = 'axios-retry'

  const currentState = config[NAMESPACE] || {}
  currentState.retryCount = currentState.retryCount || 1
  config[NAMESPACE] = currentState
  return currentState
}

export default delayInterceptor
