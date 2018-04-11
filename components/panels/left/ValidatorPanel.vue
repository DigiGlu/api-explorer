<template lang="pug">
  div
    v-toolbar.elevation-0(style="background-color: transparent")
      v-toolbar-title Validation suites
    v-list
      v-list-tile(ripple tag="a", :to="{path:'validator', hash:i[0]}" v-for="(i, k) in keys", :key="k")
        v-list-tile-action
          v-icon home
        v-list-tile-title {{i[1]}}
</template>

<script>
  import { mapMutations } from 'vuex'
  import * as types from '../../../store/types'

  export default {
    data () {
      return {
        keys: [
          ['suite1', 'Test suite 1'],
          ['suite2', 'Test suite 2'],
          ['suite3', 'Test suite 3']
        ]
      }
    },
    created () {
      this.UI_SET_LEFT_DRAWER_HALF(false)
    },
    methods: {
      ...mapMutations([
        types.UI_SET_LEFT_DRAWER,
        types.UI_SET_LEFT_DRAWER_HALF
      ])
    }
  }
</script>
