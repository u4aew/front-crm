<template>
    <div class="badge" :title="title">
        <div class="badge__caption">
            <slot></slot>
        </div>
    </div>
</template>

<script>

  import BaseComponent from '@/components/base/BaseComponent'

  export default {
    name: 'Badge',
    extends: BaseComponent,
    props: {
        title: {
            type: String,
            required: false
        }
    }
  }
</script>
