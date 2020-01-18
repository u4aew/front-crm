<template>
    <div class="card-product"
         :class="[{'is-loading':loading}]"
         :style="{ backgroundImage: 'url(' + image + ')' }">
        <div class="card-product__wrapper">
            <div class="card-product__side">
                <slot :name="slots.side"></slot>
            </div>
            <div class="card-product__main">
                <slot :name="slots.main"></slot>
            </div>
        </div>
        <div v-if="hasSlot(slots.action)" class="card-product__action">
            <slot :name="slots.action"></slot>
        </div>
    </div>
</template>

<script>
  import BaseComponent from '@/components/base/BaseComponent'
  const slots = {
    side: 'side',
    main: 'main',
    action: 'action'
  }
  export default {
    name: 'CardProductBase',
    extends: BaseComponent,
    props: {
      image: {
        type: String,
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
