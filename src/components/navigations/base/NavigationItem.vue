<template>
    <div class="navigation-item" :class="[{'is-active':active}]">
        <slot></slot>
        <div v-if="hasSlot(slots.notify)" class="navigation-item__notify">
            <slot :name="slots.notify"></slot>
        </div>
    </div>
</template>

<script>

  import BaseComponent from '@/components/base/BaseComponent'

  const slots = {
    notify: 'notify'
  }
  export default {
    name: 'Navigation',
    extends: BaseComponent,
    props: {
      active: {
        type: Boolean,
        required: false
      }
    },
    data () {
      return {
        slots
      }
    }
  }
</script>
