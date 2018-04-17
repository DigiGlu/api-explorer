import should from 'should/as-function'

var testSuite = { "tests":
  [
    {
      "name": "Info as title, description and version",
      "test": function(spec) { return should(spec.info).be.a.Object().and.have.properties(['title','description','version'])}
    },
    {
      "name": "The info.version fits the number format of 'major.minor(.patch)' with no pre/post-fix text",
      "test": function(spec) { return should(spec.info.version).be.a.String().and.match(/^(\d+).\d+(.\d+)*$/)}
    },
    {
      "name": "The 'host' attribute is set to 'serverRoot' (warning if not)",
      "test": function(spec) { return should(spec.host).be.a.String().and.be.exactly('serverRoot')}
    },
    {
      "name": "The 'basePath' starts with '/tmf-api/'",
      "test": function(spec) { return should(spec.basePath).be.a.String().and.startWith('/tmf-api/')}
    },
    {
      "name": "If the 'basePath' has a major version in the URI, it must match the major version from 'info.version'",
      "test": function(spec) {
        var basePathVersion = spec.basePath.match(/.*\/v(\d)(\/)?/);
        if (basePathVersion[1]) {
          console.log("BPV", basePathVersion[1])
          return should(spec.info.version).startWith(basePathVersion[1]);
        } else {
          return should(spec.basePath).be.a.String();
        }
      }
    }
  ]
}



export { testSuite }
