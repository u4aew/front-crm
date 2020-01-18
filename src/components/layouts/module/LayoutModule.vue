<template>
    <div class="module">
        <div class="module__wrapper">
            <div class="module__side">
                <slot :name="slots.side"></slot>
            </div>
            <div class="module__main">
                <slot :name="slots.main"></slot>
            </div>
        </div>
    </div>
</template>

<script>
  import BaseComponent from '@/components/base/BaseComponent'

  const slots = {
    side: 'side',
    main: 'main'
  }
  export default {
    name: 'LayoutModule',
    extends: BaseComponent,
    data () {
      return {
        slots
      }
    }
  }
</script>
