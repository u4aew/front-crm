<template>
    <label class="field file"
           :class="[
           type,
           {'is-upload': upload},
           {'is-success': fieldSuccess}
           ]">
        <span class="field__file" :style="{ backgroundImage: 'url(' + fieldValue + ')' }"></span>
        <span class="field__title">
            <template v-if="upload"> Изображение загружено</template>
            <template v-else> {{label}}</template>
        </span>
        <input class="field__input"
               ref="file"
               @change="previewFiles"
               :name="name"
               autocomplete="off"
               type="file"
               :placeholder="placeholder"
               accept="image/jpeg,image/png,image/gif">
        <span v-if="hasErrorMessages" class="field__error">
            <template v-for="errorMessage in errorMessages">
                {{errorMessage}}
            </template>
        </span>
    </label>
</template>

<script>
  import Field from '@/components/fields/base/Field'
  import Helper from '@/core/utils/helper'

  const reader = new FileReader()
  export default {
    name: 'FieldFile',
    extends: Field,
    data () {
      return {
        file: null
      }
    },
    computed: {
      upload () {
        return Helper.isDefined(this.fieldValue)
      }
    },
    methods: {
      previewFiles () {
        this.file = this.$refs.file.files[0]
        reader.readAsDataURL(this.file)
      }
    },
    mounted () {
      reader.onloadend = () => {
        this.fieldValue = reader.result
        this._input()
        this._blur()
      }
    }
  }
</script>
