const _ = {};

_.identity = (val) => {
    return val;
  };

  if (typeof module !== 'undefined') {
    module.exports = _;
  }