'use strict'

import AbstractHandler from '@/app/back/socket/handler/abstact-handler'
import * as types from '@/store/types'

/**
 * Обработчик системных запросов от демона
 */

class SystemHandler extends AbstractHandler {
  constructor (store) {
    super()
    this.$store = store
  }

  process (method, requestId, data) {
    switch (method) {
      case 'barcode':
        onBarcode(this, data)
        break
      case 'carduid':
        onCardId(this, data)
        break
      case 'state':
        onState(this, data)
        break
      case 'activity':
        onDeviceActivity(this, data)
        break
      default:
        super.onWrongRequest(method)
    }
  }

  getType () {
    return 'sys'
  }
}

function onBarcode (handler, data) {

}

function onCardId (handler, data) {

}

function onState (handler, data) {

}

function onDeviceActivity (handler, data) {

}

export default SystemHandler
