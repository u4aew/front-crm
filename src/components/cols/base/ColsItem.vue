<template>
    <div class="cols-item">
        <slot></slot>
    </div>
</template>

<script>
  /**
   * Базовый компонент колонки
   */

  import BaseComponent from '@/components/base/BaseComponent'

  export default {
    name: 'ColsItem',
    extends: {
      BaseComponent
    }
  }
</script>
