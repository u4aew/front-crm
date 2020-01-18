'use strict'

/**
 * Преобразует сумму к нужной локали
 */

import Helper from '@/core/utils/helper'

const DEFAULT_LOCALE = 'ru'
const DEFAULT_OPTIONS = {
  style: 'currency'
}

const FractionDigitsInteger = {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
}
const FractionDigitsFloat = {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2
}

class CurrencyFormat {
  static format ({ locale = null, currency = null, value = null, round = false }) {
    if (Helper.isDefined(locale) && Helper.isDefined(currency) && Helper.isDefined(value)) {
      value /= 100
      value = round ? Math.round(value) : value

      let additionalOption = Helper.isInteger(value) ? FractionDigitsInteger : FractionDigitsFloat
      additionalOption = Object.assign({}, additionalOption, { currency })

      let settings = Object.assign({}, DEFAULT_OPTIONS, additionalOption)

      try {
        return new Intl.NumberFormat(locale, settings).format(value)
      } catch (e) {
        return new Intl.NumberFormat(DEFAULT_LOCALE).format(value) + ' ' + (settings.currency || '')
      }
    }
    return ''
  }
}

export default CurrencyFormat
