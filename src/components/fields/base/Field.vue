<template>
    <label class="field"
           :class="[
           type,
           {'is-success': fieldSuccess}]">
        <span class="field__title">
            {{label}}
        </span>
        <input class="field__input"
               ref="field"
               @input="_input"
               @blur="_blur"
               :name="name"
               autocomplete="off"
               type="text"
               :placeholder="placeholder"
               v-model.trim="fieldValue">
        <span v-if="hasErrorMessages" class="field__error">
            <template v-for="errorMessage in errorMessages">
                {{errorMessage}}
            </template>
        </span>
    </label>
</template>

<script>
  /** Базовый компонент инпута
   * @type свойство для типа инпута
   * @value свойство для значения инпута
   * @title свойство для заголовка инпута
   * @placeholder свойство для placeholder инпута
   * @errorMessage свойство для отображения сообщения ошибки
   */
  import BaseComponent from '@/components/base/BaseComponent'
  import Inputmask from 'inputmask'
  import Helper from '@/core/utils/helper'

  const props = {
    type: ['text', 'phone', 'email', 'number', 'password', 'image']
  }
  export default {
    name: 'Field',
    extends: BaseComponent,
    props: {
      value: {
        required: true,
        default: ''
      },
      label: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      placeholder: {
        type: String,
        required: false
      },
      required: {
        type: Boolean,
        default: false,
        required: false
      },
      mask: {
        type: String,
        required: false,
        default: null
      },
      type: {
        type: String,
        required: true,
        default: 'text',
        validator (value) {
          return props.type.includes(value)
        }
      },
      errorMessages: {
        type: Array,
        required: false
      }
    },
    data () {
      return {
        fieldValue: this.value,
        fieldMask: this.mask,
        fieldSuccess: null
      }
    },
    computed: {
      hasErrorMessages () {
        return Helper.isNotEmpty(this.errorMessages)
      }
    },
    methods: {
      _input () {
        _emitData(this, 'input')
      },
      _blur () {
        _emitData(this, 'blur')
      }
    },
    mounted () {
      _setInputMask(this)
    }
  }
  const _emitData = (_this, event) => {
    let value = _this.fieldValue

    if (Helper.isDefined(value)) {
      if (_this.type === 'phone') {
        value = value.replace(/[_\-()+]/g, '')
      }
    }
    _this.$emit(event, {
      value: value,
      name: _this.name
    })
  }
  const _setInputMask = (_this) => {
    let { mask, type } = _this

    if (!Helper.isDefined(mask)) {
      switch (type) {
        case 'phone':
          mask = '+7(999)-999-99-99'
      }
      const im = new Inputmask({
        mask
      })
      im.mask(_this.$el.querySelector('input'))
    }
  }
</script>
