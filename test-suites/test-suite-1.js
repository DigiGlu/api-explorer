import { basePathVersion,getResponseCodeByVerb } from './helpers/swaggerspec'
import { hasProperties,hasProperty,stringMatches,stringIsEqual,hasOneOfProperties,stringStartsWith } from './helpers/tester'

var testSuite = { "tests":
  [
    {
      "name": "The info node has 'title', 'description' and 'version' attributes and are not empty",
      "test": function(spec) { return hasProperties(spec.info, ['title','description','version'])}
    },
    {
      "name": "The info.version fits the number format of 'major.minor(.patch)' with no pre/post-fix text",
      "test": function(spec) { return stringMatches(spec.info.version, "/^(\d+).\d+(.\d+)*$/")}
    },
    {
      "name": "The 'host' attribute is set to 'serverRoot'",
      "test": function(spec) { return stringIsEqual(spec.host, 'serverRoot')}
    },
    {
      "name": "The 'basePath' starts with '/tmf-api/'",
      "test": function(spec) { return stringStartsWith(spec.basePath, '/tmf-api/')}
    },
    {
      "name": "If the 'basePath' has a major version in the URI, it must match the major version from 'info.version'",
      "test": function(spec) {
        if (basePathVersion(spec)) {
          return stringStartsWith(spec.info.version, basePathVersion(spec));
        }
      }
    },
    {
      "name": "Every API has a /hub resource",
      "test": function(spec) { return hasProperty(spec.paths, '/hub')}
    },
    {
      "name": "HTTP response codes'",
      "test": function(spec) {
        const responseArray = getResponseCodeByVerb(spec);
        var result = { overall: true, details: [] }

        responseArray.forEach( p => {
          p.verbs.forEach( v => {
            if ( v.verb === "post" ) {
              result.details.push(hasOneOfProperties(v.responses, ["201", "202"]));
              result.details.push(hasProperty(v.responses, "400"))
              result.details.push(hasProperty(v.responses, "405"))
              result.details.push(hasProperty(v.responses, "409"))
              result.details.push(hasProperty(v.responses, "500"))
            }
            if ( v.verb === "get" ) {
              result.details.push(hasOneOfProperties(v.responses, ["200", "206"]));
              result.details.push(hasProperty(v.responses, "400"))
              result.details.push(hasProperty(v.responses, "405"))
              result.details.push(hasProperty(v.responses, "404"))
              result.details.push(hasProperty(v.responses, "500"))
            }
            if ( v.verb === "patch" ) {
              result.details.push(hasOneOfProperties(v.responses, ["200", "206", "204"]));
              result.details.push(hasProperty(v.responses, "400"))
              result.details.push(hasProperty(v.responses, "405"))
              result.details.push(hasProperty(v.responses, "404"))
              result.details.push(hasProperty(v.responses, "409"))
              result.details.push(hasProperty(v.responses, "500"))
            }
            if ( v.verb === "get" ) {
              result.details.push(hasOneOfProperties(v.responses, ["200", "206", "204"]));
              result.details.push(hasProperty(v.responses, "400"))
              result.details.push(hasProperty(v.responses, "405"))
              result.details.push(hasProperty(v.responses, "404"))
              result.details.push(hasProperty(v.responses, "409"))
              result.details.push(hasProperty(v.responses, "500"))
            }
            if ( v.verb === "delete" ) {
              result.details.push(hasOneOfProperties(v.responses, ["200", "206", "204"]));
              result.details.push(hasProperty(v.responses, "400"))
              result.details.push(hasProperty(v.responses, "405"))
              result.details.push(hasProperty(v.responses, "404"))
              result.details.push(hasProperty(v.responses, "500"))
            }
          })
        })
        result.details.forEach( d => { if (d.overall===false) {result.overall=false}});
        return result;
      }
    }
  ]
}



export { testSuite }
