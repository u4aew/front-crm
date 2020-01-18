<template>
  <span>
    {{result}}
  </span>
</template>

<script>
  import CurrencyFormat from '@/core/utils/currency-format'

  export default {
    name: 'Sum',
    props: {
      value: {
        Type: Number,
        required: true
      }
    },
    computed: {
      result () {
        return CurrencyFormat.format({
          locale: 'ru',
          currency: 'RUB',
          value: this.value
        })
      }
    }
  }
</script>
