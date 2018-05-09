const R = require('ramda')

export { hasProperty, hasProperties, stringMatches,stringIsEqual,stringStartsWith,hasOneOfProperties}

function stringStartsWith(J, S) {
  var result = { overall: true, details: []};
  if (!J.startsWith(S)) {
    // FAILED
    result.details.push( { msg: "String does not start with " + S + "."})
    result.overall = false;
  } else {
    // PASSED
  }
  return result;
}

function stringIsEqual(J, S) {
  var result = { overall: true, details: []};
  if (J !== S) {
    // FAILED
    result.details.push( { msg: "String " + S + " is not equal."})
    result.overall = false;
  } else {
    // PASSED
  }
  return result;
}

function hasProperty(J, P) {
  var result = { overall: true, details: []};
  if (R.pick([P], J) === {}) {
    // FAILED
    result.details.push( { msg: "Property " + P + " not contained."})
    result.overall = false;
  } else {
    // PASSED
  }
  return result;
}

function hasProperties(J, A) {
  var result = { overall: true, details: []};
  A.forEach( p => {
    if (R.pick([p], J) === {}) {
      // FAILED
      result.details.push( { msg: "Property " + p + " not contained."})
      result.overall = false;
    } else {
      // PASSED
    }
  });
  return result;
}

function hasOneOfProperties(J, A) {
  var result = { overall: true, details: []};
  var i=false;
  A.forEach( p => {
    if (R.pick([p], J) !== {}) {
      i=true;
    }
  });
  if (!i) {
   // FAILED
    result.details.push( { msg: "None of the properties is contained."})
    result.overall = false;
  } else {
    // PASSED
  }
  return result;
}

function stringMatches(J, R) {
  var result = { overall: true, details: []};

  var regexp1 = RegExp(R);

  if (regexp1.exec(J)===null) {
    // FAILED
    result.details.push( { msg: "String " + J + " does not match."})
    result.overall = false;
  } else {
    // PASSED
  }

  return result;
}
