<template>
    <div class="list-base-item">
        <slot/>
    </div>
</template>

<script>
  /**
   * Базовый компонент элемента списка
   */
  import BaseComponent from '@/components/base/BaseComponent'

  export default {
    name: 'ListBaseItem',
    extends: BaseComponent
  }
</script>
