<template>
    <div class="nprogress-container"></div>
</template>

<script>

  import NProgress from 'nprogress'

  export default {
    name: 'ProgressBar',
    mounted () {
      NProgress()
    }
  }
</script>
