'use strict'

import LoggerId from '@/app/logger/logger-id-adapter'
import * as types from '@/store/types'
import Notifier from '@/plugins/notifier/notifier'
import { INITIATOR } from '@/app/stage/stage-initiator'
import SystemService from '@/plugins/service/system-service'

const electron = require('electron')
const errors = electron.remote.getGlobal('errors')

const log = LoggerId.SOCKET

class ConnectionStateListener {
  constructor (store, http, socket) {
    this.$store = store
    this.systemService = new SystemService(http, socket, store)
  }

  onConnectionState (state) {
    if (this.$store.state.network.socket.connected !== state) {
      log.info('Change connect with daemon: [connected = %s]', state)
    }
    this.$store.dispatch(types.NETWORK.socket.updateConnected, { connected: state })
    if (state) {
      this.systemService.sendBrowserInfo()
      this.systemService.updateNavigation(this.$store.state.page.stage.moduleType, INITIATOR.core)
      this.systemService.getTerminalState()
      if (!this.$store.state.network.socket.firstConnectFlag) {
        this.$store.dispatch(types.NETWORK.socket.markFirstConnectFlag)
        Notifier.notifyErrors(errors)
      }
    }
  }
}

export default ConnectionStateListener
