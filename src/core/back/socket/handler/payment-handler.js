'use strict'

import AbstractHandler from '@/app/back/socket/handler/abstact-handler'
import LoggerId from '@/app/logger/logger-id-adapter'
import { eventBus } from '@/app/event-bus'
import * as types from '@/store/types'

const log = LoggerId.PAY

/**
 * Обработчик запросов оплаты от демона
 */

class PaymentHandler extends AbstractHandler {
  constructor (store) {
    super()
    this.$store = store
  }

  process (method, requestId, data) {
    switch (method) {
      case 'card/result':
        onCardResult(data)
        break
      case 'cash/depositing':
        onCashDepositing(data)
        break
      case 'cash/payout/progress':
        onCashPayoutProgress(data)
        break
      case 'cash/payout/complete':
        onCashPayoutComplete()
        break
      case 'complete':
        onComplete(this)
        break
      default:
        super.onWrongRequest(method)
    }
  }

  getType () {
    return 'payment'
  }
}

function onCardResult (data) {
  log.info('    Payment card result: \'%s\'', data)
  eventBus.emitCardResult(data)
}

function onCashDepositing (data) {
  log.info('    Cash depositing: \'%s\'', JSON.stringify(data))
  eventBus.emitCashDepositing(data)
}

function onCashPayoutProgress (data) {
  log.info('    Cash payout process: \'%s\'', JSON.stringify(data))
  eventBus.emitCashPayoutProgress(data)
}

function onCashPayoutComplete () {
  log.info('    Cash payout complete!')
  eventBus.emitCashPayoutComplete()
}

function onComplete (handler) {
  log.info('    Print check complete!')
  handler.$store.dispatch(types.SESSION.complete)
}

export default PaymentHandler
