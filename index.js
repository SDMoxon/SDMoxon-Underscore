const _ = {};

_.identity = (val) => {
    return val;
};
_.first = (list) => {
    if (Array.isArray(list) || typeof (list) === 'string') {
        return list[0];
    }
    else {
        return undefined;
    }
};
_.last = (list, n) => {
    if (Array.isArray(list)) {
      if (!n) {
        return list[list.length - 1];
      }
      return list.slice(-n);
    }
  
    if (typeof (list) === 'string') {
      if (!n) {
        return list[list.length - 1];
      }
      return list.split('').slice(-n);
    }
  };
  _.each = (list, iteratee, context) => {
    const thisParam = context || this;
  
    if (!Array.isArray(list) && typeof (list) !== 'string') {
      for (var key in list) {
        iteratee.call(thisParam, list[key], key, list);
      }
      return list;
    }
    else {
  
      for (var i = 0; i < list.length; i++) {
        iteratee.call(thisParam, list[i], i, list);
      }
      return list;
    }
  };

  _.indexOf = (list, value, sorted) => {
    if (!sorted) {
      let found = -1;
      list.forEach((elem, i) => {
        if (elem === value) found = i;
      });
      return found;
    }
    else {
      return binaryIndexOf(list, value);
    }
  };
  _.filter = (list, predicate, context) => {
    const thisParam = context || this;
    const results = [];
    const cb = (value) => {
      if (predicate.call(thisParam, value)) {
        results.push(value);
      }
    };
    _.each(list, cb);
    return results;
  
  };
  _.reject = (list, predicate, context) => {
    const thisParam = context || this;
    const results = [];
    const cb = (value) => {
      if (!predicate.call(thisParam, value)) {
        results.push(value);
      }
    };
    _.each(list, cb);
    return results;
  };
if (typeof module !== 'undefined') {
    module.exports = _;
}
function binaryIndexOf(array, searchElement) {
    let start = 0;
    let stop = array.length - 1;
    let mid;
    let element;
  
    while (start <= stop) {
      mid = Math.floor((start + stop) / 2, 10);
      element = array[mid];
      if (element < searchElement) {
        start = mid + 1;
      } else if (element > searchElement) {
        stop = mid - 1;
      } else {
        return mid;
      }
    }
    return -1;
  }


