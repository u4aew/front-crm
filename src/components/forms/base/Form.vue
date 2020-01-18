<template>
    <form novalidate @submit.prevent="_emitAction" v-on="$listeners" action="#" :id="id" method="POST"
          class="form-base">
        <div class="form-base__main">
            <template v-for="(field, key) in formFields">
                <component class="form-base__field"
                           :class="[{'form-base__field_delimiter-bottom':field.delimiterBottom}]"
                           @input="_updateValueFields"
                           @blur="_validateValueFields"
                           :errorMessages="field.errorMessages"
                           :value="field.value"
                           :type="field.inputType"
                           :required="field.required"
                           :name="field.name"
                           :placeholder="field.placeholder"
                           :label="field.label"
                           :key="`${id}-field-${key}`"
                           v-bind:is="_getField(field.inputType)"/>
            </template>
            <div v-if="hasSlot(slots.addition)" class="form-base__addition">
                <slot :name="slots.addition"></slot>
            </div>
        </div>
        <div class="form-base__side">
            <div class="form-base__actions">
                <div class="form-base__actions">
                    <slot :name="slots.action"></slot>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
  /** Базовая форма
   * @method свойство для определения метода отрпавки данных
   * @url свойство для определения URL отправки данных
   */
  import Helper from '@/core/utils/helper'
  import BaseComponent from '@/components/base/BaseComponent'
  //  components
  import Field from '@/components/fields/base/Field'
  import FieldFile from '@/components/fields/file/FieldImage'
  import validate from 'validate.js'

  const slots = {
    fields: 'fields',
    action: 'action',
    addition: 'addition'
  }
  export default {
    name: 'BaseForm',
    extends: BaseComponent,
    components: {
      Field,
      FieldFile
    },
    props: {
      id: {
        type: String,
        required: false
      },
      options: {
        type: Object,
        required: false
      },
      fields: {
        type: Array,
        required: false
      }
    },
    data () {
      return {
        slots,
        formFields: this.fields.map(field => {
          return {
            ...field,
            errorMessages: []
          }
        }),
        disabledAction: false,
        fieldType: null
      }
    },
    computed: {
      errorMessages () {
        let errorMessages = []
        this.formFields.forEach((field) => {
          if (Helper.isNotEmpty(field.errorMessages)) {
            errorMessages.push({ name: field.name, errors: field.errorMessages })
          }
        })
        return errorMessages
      }
    },
    methods: {
      _getField (type) {
        if (type === 'image') {
          return FieldFile
        }
        return Field
      },
      _validateValueFields (field) {
        let { value, name } = field
        const constraints = _buildConstraints(this._getFieldByName(name))

        let msg = validate.single(value, constraints)
        if (!Helper.isDefined(msg)) {
          msg = []
        }
        this._getFieldByName(name).errorMessages = msg
      },
      _updateValueFields ({ name, value }) {
        this._getFieldByName(name).value = value
      },
      _getFieldByName (name) {
        return this.formFields.find(field => field.name === name)
      },
      _emitAction () {
        // Проверка валидации
        this.formFields.forEach(field => {
          this._validateValueFields(field)
        })

        // Проверка на совпадение
        let fieldMatches = this.formFields.find(field => Helper.isDefined(field.matchesName))

        if (Helper.isDefined(fieldMatches)) {
          if (!(this._getFieldByName(fieldMatches.matchesName).value === fieldMatches.value)) {
            this._getFieldByName(fieldMatches.matchesName).errorMessages = ['Значения не совпадают']
            fieldMatches.errorMessages = ['Значения не совпадают']
          }
        }

        if (!Helper.isNotEmpty(this.errorMessages)) {
          this.$emit('action', { fields: _createObjFields(this.formFields) })
        } else {
          console.log('Ошибки')
        }
      }
    }
  }

  const _buildConstraints = ({ inputType, required }) => {
    let constraints = {}

    if (Helper.isDefined(required) && required) {
      constraints = {
        ...constraints,
        ...{
          presence: {
            message: 'Поле обязательное'
          }
        }
      }
    }

    switch (inputType) {
      case 'email':
        constraints = {
          ...constraints,
          ...{
            email: {
              message: 'Email введен не правильно'
            }
          }
        }
        break
      case 'phone':
        constraints = {
          ...constraints,
          ...{
            length: {
              is: 11,
              message: 'Телефон введен не верно'
            }
          }
        }
        break
    }
    return constraints
  }
  const _createObjFields = (fields) => {
    let obj = {}
    fields.forEach((field) => {
      obj[field.name] = field.value
    })

    return obj
  }
</script>
