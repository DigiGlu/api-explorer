const R = require('ramda')

export { basePathVersion, getResponseCodeByVerb }

function basePathVersion(spec) {
  var basePathVersion = spec.basePath.match(/.*\/v(\d)(\/)?/)
  return basePathVersion[1]
}

function getResponseCodeByVerb(spec) {
  var pathArray = (R.compose(R.map(R.zipObj(['path', 'verbs'])), R.toPairs)(R.path(["paths"], spec)))

  pathArray.forEach( p => {
    p.verbs = (R.compose(R.map(R.zipObj(['verb', 'obj'])), R.toPairs)(p.verbs))
    p.verbs.forEach( v => {
      v.responses = v.obj.responses
      delete v.obj
    });
  })

  return pathArray
}
