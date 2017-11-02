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
if (typeof module !== 'undefined') {
    module.exports = _;
}