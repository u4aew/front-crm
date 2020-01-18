<template>
    <div class="profile">
        <div class="profile__side">
            <slot :name="slots.side"/>
        </div>
        <div class="profile__main">
            <slot :name="slots.main"/>
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
    name: 'LayoutProfile',
    extends: BaseComponent,
    data () {
      return {
        slots
      }
    }
  }
</script>
