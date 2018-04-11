<template lang="pug">
  v-container.gpu(v-once style="width: 100%; max-width: 100%")
    v-layout.ma-3-md
      v-spacer.hidden-xs-only
      v-flex(style="max-width: 80em")
        v-card.pa-4.mb-1
          .pt-3.hidden-xs-only
          img.dg-logo(src="@/assets/tmf-logo-2018.svg")
          h3.pb-3.ma-0.display-2 TMF API Specification Validator
      v-spacer.hidden-xs-only
</template>

<script>
  import Vue from 'vue'
  import { mapGetters } from 'vuex'
  import * as types from '../store/types'
  import dependencies from '../assets/data/dependencies.json'
  import appKeyboard from '../components/elements/misc/Keyboard'
  import keys from '../assets/data/keys.json'
  import * as directories from '../assets/scripts/services/directory'
  import services from '../assets/data/services.json'

  export default {
    components: {
      appKeyboard
    },
    mounted () {
      if (this.$route.hash) {
        Vue.nextTick(() => {
          document.querySelector(this.$route.hash).scrollIntoView()
        })
      }
    },
    data () {
      const editorKeys = {}
      Object.keys(keys.editor).forEach(k => Object.assign(editorKeys, keys.editor[k]))

      const editorActions = {}

      Object.keys(editorKeys)
        .forEach(k => (editorActions[k] = editorKeys[k].replace(/([a-z])([A-Z])/g, '$1 $2')
          .toLowerCase()
          .replace(/^del /, 'delete ')))

      return {
        keys,
        directories,
        services,
        appKeys: {...keys.app.Application, ...keys.app.API},
        editorKeys,
        editorActions,
        classes: {
          Alt: 'key-success',
          Ctrl: 'key-error',
          Shift: 'key-warning'
        },
        libs: Object.keys(dependencies).filter(i => i[0] !== '@').map(i => ({
          name: i,
          version: dependencies[i].indexOf('github:') === 0 ? '' : dependencies[i][0] === '^' ? dependencies[i].substr(
            1) : dependencies[i],
          href: dependencies[i].indexOf('github:') === 0
            ? 'https://github.com/' + dependencies[i].substr(7)
            : ('https://www.npmjs.com/package/' + i)
        }))
      }
    },
    computed: {
      ...mapGetters([
        types.APP_VERSION,
        types.APP_BUILD,
        types.UI_LOG,
        types.UI_LOADING
      ])
    },
    methods: {
      reload () {
        if (window.OAX && window.OAX.registration && window.OAX.registration.update) {
          window.OAX.registration.update()
        } else {
          location.reload(true)
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../assets/style/app/table-stripes.styl"

  .dg-logo
    margin-bottom 30px
    height 40px
    width auto
</style>
