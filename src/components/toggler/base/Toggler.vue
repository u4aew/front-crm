<template>
    <label class="toggle">
        <input @change="_change" :disabled="disabled" :cheked="checked" class="toggle__input" type="checkbox"
               :name="name" value="on">
        <span class="toggle__fake"></span>
        <span class="toggle__main">
            <span class="toggle__title">
            <slot></slot>
            </span>
        </span>
    </label>
</template>

<script>
  /** Базовый компонент чекбокса
   */
  import BaseComponent from '@/components/base/BaseComponent'

  export default {
    extends: BaseComponent,
    name: 'Toggle',
    props: {
      name: {
        type: String,
        required: true
      },
      checked: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    methods: {
      _change () {
        this.$emit('change')
      }
    }
  }
</script>
