<template>
  <router-view/>
</template>

<script>

    export default {
        name: 'App',
        data () {
            return {
                init: false
            }
        },
        mounted () {
            this.init = true
        }
    }
</script>
<style>
  @import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
