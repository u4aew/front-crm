<template>
    <div class="cols"
         :class="[
         {'delimiter':delimiter},
         cols,
         jc,
         ai,
         offset]">
        <div class="cols__list">
            <slot></slot>
        </div>
    </div>
</template>

<script>
  /**
   * Базовый компонент колонок
   * @cols кол-во колонок
   * @jc (justify-content) расположение колонок
   * @ai (align-items) вертикально расположение колонок
   */

  import BaseComponent from '@/components/base/BaseComponent'

  const props = {
    cols: ['1x', '2x', '3x', '4x'],
    jc: ['space-between', 'space-around', 'flex-end', 'flex-start'],
    ai: ['ai-center', 'ai-baseline', 'ai-flex-end', 'ai-flex-start'],
    offset: ['offset-none']
  }

  export default {
    name: 'Cols',
    extends: {
      BaseComponent
    },
    props: {
      cols: {
        type: String,
        required: false,
        validator (value) {
          return props.cols.includes(value)
        }
      },
      jc: {
        type: String,
        required: false,
        validator (value) {
          return props.jc.includes(value)
        }
      },
      ai: {
        type: String,
        required: false,
        validator (value) {
          return props.ai.includes(value)
        }
      },
      offset: {
        type: String,
        required: false,
        validator (value) {
          return props.offset.includes(value)
        }
      },
      delimiter: {
          type: Boolean,
          required: false
      }
    }
  }
</script>
