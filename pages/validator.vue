<template lang="pug">
  v-container.gpu(v-once style="width: 100%; max-width: 100%")
    v-layout.ma-3-md
      v-spacer.hidden-xs-only
      v-flex(style="max-width: 80em")
        v-card.pa-4.mb-1
          .pt-3.hidden-xs-only
          img.dg-logo(src="@/assets/tmf-logo-2018.svg")
          h3.pb-3.ma-0.display-2 Open API Specification Validator
          p.my-5 THIS IS WHERE THE REPORTS APPEAR!
          v-btn Download PDF
      v-spacer.hidden-xs-only
</template>

<script>
  import Vue from 'vue'

  export default {
    components: {
          },
    mounted () {
      if (this.$route.hash) {
        Vue.nextTick(() => {
          document.querySelector(this.$route.hash).scrollIntoView()
        })
      }
    },
    data () {
      return {
      }
    },
    computed: {
    },
    methods: {
    }
  }
</script>

<style scoped lang="stylus">
  .dg-logo
    margin-bottom 30px
    height 40px
    width auto
</style>
