<template>
    <div class="navigation">
        <div class="navigation__list">
            <slot></slot>
        </div>
    </div>
</template>

<script>

  import BaseComponent from '@/components/base/BaseComponent'
  export default {
    name: 'Navigation',
    extends: BaseComponent
  }
</script>
