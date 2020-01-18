<template>
    <div class="list-base">
        <slot/>
    </div>
</template>

<script>
  /**
   * Базовый компонент списка
   */
  import BaseComponent from '@/components/base/BaseComponent'

  export default {
    name: 'ListBase',
    extends: BaseComponent
  }
</script>
