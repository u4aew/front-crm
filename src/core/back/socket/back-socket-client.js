'use strict'

import Dispatcher from './handler/handler-dispatcher'

const REC_DELAY = 1000
let recTimeoutId = 0

export default class {
  constructor (address, store, opts = {}) {
    this.address = address
    this.$store = store
    this.opts = opts
  }

  addListener (listener) {
    this.connectionStateListener = listener
  }

  start () {
    this.connect(this.address)
    this.onEvent()
  }

  connect (address) {
    this.WebSocket = new WebSocket(address)
    this.WebSocket.say = (module, method, data) => {
      let message = {
        module: module,
        method: method,
        data: data
      }

      let messageJson = JSON.stringify(message)
      if (this.$store.state.network.socket.connected) {
        this.WebSocket.send(messageJson)
      }
    }
  }

  reconnect () {
    recTimeoutId = setTimeout(() => {
      this.connect(this.address)
      this.onEvent()
    }, REC_DELAY)
  }

  onEvent () {
    this.WebSocket.onopen = (event) => {
      this.opts.$setInstance(event.currentTarget)
      clearTimeout(recTimeoutId)
      this.connectionStateListener.onConnectionState(true)
    }

    this.WebSocket.onclose = (event) => {
      if (!event.wasClean) {
        this.connectionStateListener.onConnectionState(false)
        this.reconnect()
      }
    }

    this.WebSocket.onerror = () => {
      // бесполезное простое событие, в нем ничего нет :(
    }

    this.WebSocket.onmessage = (event) => {
      Dispatcher.process(event)
    }
  }
}

function getReason (code) {
  switch (code) {
    case 1006:
      return 'Connection refused'
    default:
      return 'Unknown reason'
  }
}
