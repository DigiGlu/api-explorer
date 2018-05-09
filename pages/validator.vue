<template lang="pug">
v-container.gpu(fluid)
  v-layout.ma-3-md
    v-spacer.hidden-xs-only
    v-flex(style="max-width: 80em")
      v-card.pa-4.mb-1
        .pt-3.hidden-xs-only
        img.dg-logo(src="@/assets/tmf-logo-2018.svg")
        h3.pb-3.ma-0.display-2 Open API Specification Validator
        v-btn.primary(@click="loadSpecs") Run tests
        v-btn.secondary Download PDF
        table.table.mt-5(align="left")
          thead
            th(align="left") Id
            th(align="left") API
            th(align="left") 1
            th(align="left") 2
            th(align="left") 3
            th(align="left") 4
            th(align="left") 5
          tbody
            tr(v-for="(t,i) in testResults")
              td {{t.id}}
              td {{t.name}}
              td(style="color: green" v-if="t.results[0].obj") {{'PASS'}}
              td(style="color: red" v-if="!t.results[0].obj") {{'FAIL'}}
              td(style="color: green" v-if="t.results[1].obj") {{'PASS'}}
              td(style="color: red" v-if="!t.results[1].obj") {{'FAIL'}}
              td(style="color: green" v-if="t.results[2].obj") {{'PASS'}}
              td(style="color: red" v-if="!t.results[2].obj") {{'FAIL'}}
              td(style="color: green" v-if="t.results[3].obj") {{'PASS'}}
              td(style="color: red" v-if="!t.results[3].obj") {{'FAIL'}}
              td(style="color: green" v-if="t.results[4].obj") {{'PASS'}}
              td(style="color: red" v-if="!t.results[4].obj") {{'FAIL'}}
    v-spacer.hidden-xs-only
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import should from 'should/as-function'

import { testSuite } from '@/test-suites/test-suite-1'

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
      testResults: [],
      loaded: false
    }
  },
  methods: {
    loadSpecs: function() {
      let self=this;
      var specPromises = []
      self.testResults = [];
      // Create array of promises to get spec

      if (this.$store.state.apis.apis) {
        this.$store.state.apis.apis.forEach( spec => {
            specPromises.push( self.getSpec(spec) );
        })
        // Request instances
        Promise.all( specPromises ).then( () => { self.loaded = true; self.runTests();});
      }
    },
    getSpec: function ( spec ) {
      let self = this;
      return new Promise( function(resolve) {
        axios.get( spec.url, {
          dataType: 'json'
        }).then(function (response) {
            console.log("PUSH", spec.title)
            self.testResults.push( { spec: response.data, results: [], name: spec.title, id: spec.key } )
            resolve();
        }).catch(function (error) {
            console.log(error)
            reject();
        })
      });
    },
    runTests: function(suiteIdx) {
      let self=this;
      this.testResults.forEach( a => {
          console.log("Go")
          if (testSuite.tests) {
          testSuite.tests.forEach( t => {
            let result = {
              "test": t.name,
            }
            try {
              //console.log("SPEC", JSON.stringify(a.spec))
              result.obj = t.test(a.spec);
            } catch(e) {
              console.log("ASSERTION ERROR")
            }
            a.results.push(result);
          })
        } else {
          console.error("NO SUITE ERROR:", JSON.stringify(testSuite))
        }
      }) // end forEach
    }
  }
}
</script>

<style scoped lang="stylus">
  .dg-logo
    margin-bottom 30px
    height 40px
    width auto
</style>
