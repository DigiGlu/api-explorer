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
            th(align="left") 6
            th(align="left") 7
          tbody
            tr(v-for="(r,i) in testResults")
              td {{r.id}}
              td {{r.name}}
              td(v-for="t in r.results")
                p(v-if="t.obj && t.obj.overall===true" style="color: green; margin-top: 14px;") PASSED
                p(v-else style="color: red; margin-top: 14px;") FAIL
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
            self.testResults.push( { spec: response.data, results: [], name: spec.title, id: spec.key } )
            resolve();
        }).catch(function (error) {
            console.log("ERROR", error)
            reject();
        })
      });
    },
    runTests: function(suiteIdx) {
      let self=this;
      this.testResults.forEach( a => {
          if (testSuite.tests) {
          testSuite.tests.forEach( t => {
            let result = {
              "test": t.name,
            }
            try {
              result.obj = t.test(a.spec);
            } catch(e) {
              console.log("ASSERTION ERROR", t.name, e)
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
