<template>
    <div class="system-message" :class="type">
        <div class="system-message__content">
            <slot/>
        </div>
    </div>
</template>

<script>
  import BaseComponent from '@/components/base/BaseComponent'

  const props = {
    type: ['info', 'alert', 'warning', 'success']
  }
  export default {
    name: 'SystemMessage',
    extends: BaseComponent,
    props: {
      type: {
        type: String,
        required: false,
        default: 'info',
        validator (value) {
            return props.type.includes(value)
        }
      }
    }
  }
</script>
