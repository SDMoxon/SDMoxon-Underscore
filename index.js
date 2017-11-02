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
        const cb = (elem, i) => {
            if (elem === value) found = i;
        };
        _.each(list, cb);
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
_.uniq = (array, sorted, iteratee, context) => {
    const thisParam = context || this;
    const results = [];
    let cb;
    sorted ?
        cb = (value) => {
            iteratee ? value = iteratee.call(thisParam, value) : value;
            if (value !== results[results.length - 1]) {
                results.push(value);
            }
        }
        :
        cb = (value) => {
            iteratee ? value = iteratee.call(thisParam, value) : value;
            if (results.indexOf(value) === - 1) {
                results.push(value);
            }
        };
    _.each(array, cb);
    return results;
};

_.map = (list, iteratee, context) => {
    const thisParam = context || this;
    const results = [];
    const cb = (value) => {
        results.push(iteratee.call(thisParam, value));
    };
    _.each(list, cb);
    return results;
};
_.contains = (list, value, fromIndex) => {
    list = list.slice(fromIndex);
    let indexList = [];
    const cb = (value) => {
        indexList.push(value);
    };
    _.each(list, cb);
    return _.indexOf(indexList, value) >= 0;
};
_.pluck = (list, propertyName) => {
    const results = [];
    const cb = (value) => {
        results.push(value[propertyName]);
    };
    _.each(list, cb);
    return results;

};
_.reduce = (list, iteratee, memo, context) => {
    const thisParam = context || this;
    const cb = (value) => {
        memo = iteratee.call(thisParam, memo, value);

    };
    if (memo === undefined || null) {
        if (!Array.isArray(list) && typeof (list) !== 'string') {
            const key = [Object.keys(list)[0]];
            memo = list[key];
            delete list[key];
        }
        else {
            memo = list[0];
            list = list.slice(1);
        }
    }
    _.each(list, cb);
    return memo;

};
_.every = (list, predicate, context) => {
    const thisParam = context || this;
    let shortcircuit;
    let results;
    const truthCheck = (value) => {
        if (!predicate.call(thisParam, value)) {
            results = false;
            shortcircuit = true;
        }
        else {
            results = true;
        }
    };

    if (!Array.isArray(list) && typeof (list) !== 'string') {
        list = Object.values(list);
    }
    for (var i = 0; i < list.length; i++) {
        truthCheck(list[i]);
        if (shortcircuit) {
            return results;
        }
    }
    return results;

};
_.some = (list, predicate, context) => {
    const thisParam = context || this;
    let shortcircuit;
    let results;
    const truthCheck = (value) => {
        if (predicate.call(thisParam, value)) {
            results = true;
            shortcircuit = true;
        }
        else {
            results = false;
        }
    };

    if (!Array.isArray(list) && typeof (list) !== 'string') {
        list = Object.values(list);
    }
    for (var i = 0; i < list.length; i++) {
        truthCheck(list[i]);
        if (shortcircuit) {
            return results;
        }
    }
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
_.once = (fn) => {
    let called = false;
    return () => {
        if (!called) {
            called = true;
            return fn.apply(null, arguments);
        }
    };
};
_.memoize = (fn) => {
    const cache = {};
    return (n) => {
        return cache.hasOwnProperty(n) ? cache[n] : cache[n] = (fn(n));
    };
};
_.shuffle = (list) => {
    let container = [];
    const cb = (value) => {
        container.push(value);
    };
    _.each(list, cb);


    return () => {
        const permitation = [];
        const adjustableContainer = container.slice(0);

        do {
            let randomIndex = Math.floor(Math.random() * adjustableContainer.length);
            let randomElem = adjustableContainer[randomIndex];
            adjustableContainer.splice(randomIndex, 1);
            if (permitation.indexOf(randomElem)) {
                permitation.push(randomElem);
            }

        }
        while (permitation.length < container.length);
        return permitation;
    };
};
_.invoke = (list, methodName, ...args) => {
    const results = [];
    const cb = (value) => {
        results.push(value[methodName].apply(value, args));
    };
    _.each(list, cb);
    return results;
};
_.sortBy = (list, iteratee, context) => {
    const thisParam = context || this;
    const checkedList = [];
    const cb = (value) => {
        checkedList.push(value);
    };
    const sortCb = (a, b) => {
        if (typeof a === 'object') {
            if (a[iteratee] < b[iteratee]) return -1;
            if (a[iteratee] > b[iteratee]) return 1;
            return 0;
        }
        else {
            return iteratee.call(thisParam, a) - iteratee.call(thisParam, b);
        }
    };
    _.each(list, cb);
    return checkedList.sort(sortCb);
};
_.zip = (...args) => {
    const results = [];
    const cb = (array, i) => {
        results.push(_.pluck(args, i));
    };
    _.each(args, cb);
    return results;
};
_.sortedIndex = (list, value, iteratee, context) => {
    const thisParam = context || this;
    const processor = iteratee || function (item) { return item; };
    let low = 0;
    let high = list.length;
    const cb = (input) => {
        if (typeof input === 'object') {
            return input[processor];
        }
        else {
            return processor.call(thisParam, input);
        }
    };

    const processedValue = cb(value);

    while (low < high) {
        const mid = Math.floor((low + high) / 2);
        if (cb(list[mid]) < processedValue) {
            low = mid + 1;
        }
        else {
            high = mid;
        }
    }
    return low;
};
_.flatten = (array, shallow) => {
    let results = [];
    const cb = (value) => {
        Array.isArray(value) ? results = results.concat(_.flatten(value))
            :
            results = results.concat(value);
    };
    const shallowCb = (value) => {
        results = results.concat(value);
    };

    shallow ? _.each(array, shallowCb) : _.each(array, cb);
    return results;
};
_.intersection = (...args) => {
    const result = [];
    const arrays = args.sort((a, b) => {
        return a.length - b.length;
    });
    const checkArray = arrays.shift();
    
    const cb = (value) => {
        if (result.indexOf(value) === -1 && arrays.every((internalValue) => internalValue.indexOf(value) !== -1)) {
            result.push(value);
        }
    };
    _.each(checkArray,cb);
    return result;
};