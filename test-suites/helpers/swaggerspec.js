import should from 'should/as-function'

function basePathVersion(spec) {
  var basePathVersion = spec.basePath.match(/.*\/v(\d)(\/)?/)
  return basePathVersion[1]
}

export { testSuite }
