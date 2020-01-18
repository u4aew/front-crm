<template>
    <div class="menu-item" :class="[icon, {'delimiter-bottom':delimiterBottom}, {'is-active': active}]">
        <div class="menu-item__caption">
            <slot></slot>
        </div>
        <div class="menu-item__icon"></div>
    </div>
</template>

<script>

  import BaseComponent from '@/components/base/BaseComponent'

  export default {
    name: 'MenuListItem',
    extends: BaseComponent,
    props: {
      icon: {
        type: String,
        required: false
      },
      active: {
        type: Boolean,
        required: false
      },
      delimiterBottom: {
        type: Boolean,
        required: false
      }
    }
  }
</script>
