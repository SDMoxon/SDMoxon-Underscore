const path = require('path');
const expect = require('chai').expect;
const sinon = require('sinon');

const _ = require(path.join(__dirname, '../'));

describe('_', () => {
    'use strict';

    it('is an object', () => {
        expect(_).to.be.an('object');
    });
    describe('#identity', () => {
        it('returns the value given to it', () => {
            let val = [];
            expect(_.identity(val)).to.equal(val);
            val = {};
            expect(_.identity(val)).to.equal(val);
            expect(_.identity('')).to.equal('');
            expect(_.identity(1)).to.equal(1);
        });
    });
    describe('#first', () => {
        it('returns the first value of an array or string', () => {
            expect(_.first([1, 2, 3])).to.eql(1);
            expect(_.first('123')).to.eql('1');
        });
        it('returns undefined for all other data types', () => {
            expect(_.first(12)).to.be.undefined;
            expect(_.first(true)).to.be.undefined;
            expect(_.first({ 1: 1, 2: 2 })).to.be.undefined;
            expect(_.first(null)).to.be.undefined;
            expect(_.first(undefined)).to.be.undefined;
        });
    });
    describe('#last', () => {
        it('returns the last value of an array or string if n is not given', () => {
            expect(_.last([1, 2, 3])).to.eql(3);
            expect(_.last('123')).to.eql('3');
        });
        it('returns the last n elements if n is given', () => {
            expect(_.last('123456789', 2)).to.eql(['8', '9']);
            expect(_.last([1, 2, 3, 4, 5, 6, 7, 8, 9], 2)).to.eql([8, 9]);
        });
        it('returns undefined for all other data types', () => {
            expect(_.last(12)).to.be.undefined;
            expect(_.last(true)).to.be.undefined;
            expect(_.last({ 1: 1, 2: 2 })).to.be.undefined;
            expect(_.last(null)).to.be.undefined;
            expect(_.last(undefined)).to.be.undefined;
        });
    });
    describe('#each', () => {

        it('iterates over an array returning the original array', () => {
            let spy = sinon.spy();
            _.each([1, 2, 3, 4], spy);
            expect(spy.callCount).to.equal(4);
            expect(_.each([1, 2, 3, 4], spy)).to.eql([1, 2, 3, 4]);
            expect(spy.calledWithExactly(1, 0, [1, 2, 3, 4])).to.equal(true);
            expect(spy.calledWithExactly(2, 1, [1, 2, 3, 4])).to.equal(true);
            expect(spy.calledWithExactly(3, 2, [1, 2, 3, 4])).to.equal(true);
            expect(spy.calledWithExactly(4, 3, [1, 2, 3, 4])).to.equal(true);
        });
        it('iterates over a string returning the original string', () => {
            let spy = sinon.spy();
            _.each('abcd', spy);
            expect(spy.callCount).to.equal(4);
            expect(_.each('abcd', spy)).to.eql('abcd');
            expect(spy.calledWithExactly('a', 0, 'abcd')).to.equal(true);
            expect(spy.calledWithExactly('b', 1, 'abcd')).to.equal(true);
            expect(spy.calledWithExactly('c', 2, 'abcd')).to.equal(true);
            expect(spy.calledWithExactly('d', 3, 'abcd')).to.equal(true);
        });
        it('iterates over an object returning the original object', () => {
            let spy = sinon.spy();
            _.each({ a: 1, b: 2, c: 3 }, spy);
            expect(spy.callCount).to.equal(3);
            expect(_.each({ a: 1, b: 2, c: 3 }, spy)).to.eql({ a: 1, b: 2, c: 3 });
            expect(spy.calledWithExactly(1, 'a', { a: 1, b: 2, c: 3 })).to.equal(true);
            expect(spy.calledWithExactly(2, 'b', { a: 1, b: 2, c: 3 })).to.equal(true);
            expect(spy.calledWithExactly(3, 'c', { a: 1, b: 2, c: 3 })).to.equal(true);
        });
        it('binds the iteratee to the context object if passed', () => {
            function iteratee() {
                this.a = 500;
            }
            const context = { a: 1, b: 2, c: 3 };
            _.each([1, 2, 3], iteratee, context);
            expect(context.a).to.equal(500);

        });
    });
    describe('#indexOf', () => {
        it('returns the index for the value specified', () => {
            expect(_.indexOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 4)).to.equal(3);
        });
        it('returns the index for the value specified', () => {
            expect(_.indexOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1, true)).to.equal(0);
        });
    });
    describe('#filter', () => {

        it('if not given a context calls the predicate on an array returning passing values', () => {
            const predicate = (elem) => {
                return elem % 2 === 0;
            };
            expect(_.filter([1, 2, 3, 4, 5, 6], predicate, null)).to.eql([2, 4, 6]);
        });
        it('if not given a context calls the predicate on an object returning passing object values', () => {
            const predicate = (elem) => {
                return elem % 2 === 0;
            };
            expect(_.filter({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 }, predicate, null)).to.eql([2, 4, 6]);
        });
        it('if given a context it will call it', () => {
            const obj = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 };
            const predicate = function () {
                this.a = 80;
            };
            _.filter([7, 8, 23, 67, 34, 12], predicate, obj);
            expect(obj.a).to.equal(80);
        });
    });
    describe('#Reject', () => {

        it('if not given a context calls the predicate on an array returning passing values', () => {
            const predicate = (elem) => {
                return elem % 2 === 0;
            };
            expect(_.reject([1, 2, 3, 4, 5, 6], predicate, null)).to.eql([1, 3, 5]);
        });
        it('if not given a context calls the predicate on an object returning passing values', () => {
            const predicate = (elem) => {
                return elem % 2 === 0;
            };
            expect(_.reject({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 }, predicate, null)).to.eql([1, 3, 5]);
        });
        it('if given a context it will call it', () => {
            const obj = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 };
            const predicate = function () {
                this.a = 80;
            };
            _.reject([7, 8, 23, 67, 34, 12], predicate, obj);
            expect(obj.a).to.equal(80);
        });
    });
    describe('#uniq', () => {

        it('returns the unique values of an unsorted array', () => {
            expect(_.uniq([2, 1, 2, 5, 8, 9, 1], false)).to.eql([2, 1, 5, 8, 9]);
        });
        it('returns the unique values of a sorted array', () => {
            expect(_.uniq([1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 5, 5, 5, 5, 5, 5, 8, 9, 13], true)).to.eql([1, 2, 5, 8, 9, 13]);
        });
        it('returns the unique values of a sorted array and with iteratee', () => {
            expect(_.uniq([1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 5, 5, 5, 5, 5, 5, 8, 9, 13], true,
                function (value) {
                    return value === 1 ? value + 1 : value;
                })).to.eql([2, 5, 8, 9, 13]);
        });
        it('calls context ', () => {
            const obj = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 };
            const iteratee = function () {
                this.a = 80;
            };
            _.uniq([7, 8, 23, 67, 34, 12], false, iteratee, obj);
            expect(obj.a).to.equal(80);
        });
    });
    describe('#map', () => {
        it('calls the iteratee on all elements of an array', () => {
            const iteratee = (elem) => {
                return elem * 2;

            };
            expect(_.map([1, 2, 3, 4, 5], iteratee)).to.eql([2, 4, 6, 8, 10]);
        });
        it('calls the iteratee on all elements of an object', () => {
            const iteratee = (elem) => {
                return elem * 2;

            };
            expect(_.map({ a: 1, b: 2, c: 3, d: 4, e: 5 }, iteratee)).to.eql([2, 4, 6, 8, 10]);
        });
        it('calls the context', () => {
            const context = { a: 1 };
            const iteratee = function (elem) {
                this.a = 80;
                return elem * 2;

            };
            _.map({ a: 1, b: 2, c: 3, d: 4, e: 5 }, iteratee, context);
            expect(context.a).to.equal(80);
        });
    });
    describe('#contains', () => {
        it('returns true for a value pressent in an array', () => {
            expect(_.contains([1, 2, 3, 4, 5], 2)).to.be.true;
        });
        it('returns true for a value pressent in an object', () => {
            expect(_.contains([1, 2, 3, 4, 5], 2)).to.be.true;
        });
        it('returns true if value is present in slice begining with fromIndex', () => {
            expect(_.contains([1, 1, 1, 1, 1, 1, 2, 3, 4, 5], 1, 6)).to.be.false;
        });
    });
    describe('#pluck', () => {
        it('returns an array of values of keys matching the propertyName provided', () => {
            const nums = [{ a: 1, b: 2, c: 3, d: 4, e: 5 }, { a: 10, b: 20, c: 30, d: 40, e: 50 }, { a: 100, b: 200, c: 300, d: 400, e: 500 }];
            expect(_.pluck(nums, 'a')).to.eql([1, 10, 100]);
        });
    });
    describe('#reduce', () => {
        it('an array is reduced if memo is not provided', () => {
            let list = [1, 10, 100];
            let iteratee = (memo, value) => {
                return memo + value;
            };
            expect(_.reduce(list, iteratee)).to.equal(111);

            list = ['a', 'b', '100'];
            iteratee = (memo, value) => {
                return memo + value;
            };
            expect(_.reduce(list, iteratee)).to.equal('ab100');
        });
        it('an object is reduced if memo is not provided', () => {
            let list = { a: 1, b: 10, c: 100 };
            let iteratee = (memo, value) => {
                return memo + value;
            };
            expect(_.reduce(list, iteratee)).to.equal(111);

            list = { a: 'a', b: 'b', c: '100' };
            iteratee = (memo, value) => {

                return memo + value;
            };
            expect(_.reduce(list, iteratee)).to.equal('ab100');
        });
        it('an array is reduced if memo is provided', () => {
            let list = [1, 10, 100];
            let iteratee = (memo, value) => {
                return memo + value;
            };
            expect(_.reduce(list, iteratee)).to.equal(111);
            const memo = '';
            list = ['a', 'b', '100'];
            iteratee = (memo, value) => {
                return memo + value;
            };
            expect(_.reduce(list, iteratee, memo)).to.equal('ab100');
        });
        it('an object is reduced if memo is provided', () => {
            const memo = '';
            let list = { a: 1, b: 10, c: 100 };
            let iteratee = (memo, value) => {
                return memo + value;
            };
            expect(_.reduce(list, iteratee, memo)).to.equal('110100');

            list = { a: function () { return 100; }, b: 'b', c: '100' };
            iteratee = (memo, value) => {

                return memo + value;
            };
            expect(_.reduce(list, iteratee, memo)).to.equal('function () { return 100; }b100');
        });
        it('calls context if context is passed', () => {
            const memo = '';
            const context = { a: 100 };
            let list = { a: 1, b: 10, c: 100 };
            let iteratee = function () {
                this.a = 1000;
            };
            _.reduce(list, iteratee, null, context);
            expect(context.a).to.equal(1000);

            _.reduce(list, iteratee, memo, context);
            expect(context.a).to.equal(1000);
        });
    });
    describe('#every', () => {

        it('if an array value fails predicate it returns false imediately', () => {
            const predicate = (elem) => {
                return elem % 2 === 0;
            };
            expect(_.every([1, 2, 3, 4, 5, 6], predicate, null)).to.be.false;
        });
        it('if an object value fails predicate it returns false imediately', () => {
            const predicate = (elem) => {
                return elem % 2 === 0;
            };
            expect(_.every({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 }, predicate, null)).to.be.false;
        });
        it('if all array values pass predicate it returns true', () => {
            const predicate = (elem) => {
                return elem % 2 === 0;
            };
            expect(_.every([2, 4, 6], predicate, null)).to.be.true;
        });
        it('if all object values pass predicate it returns true', () => {
            const predicate = (elem) => {
                return elem % 2 === 0;
            };
            expect(_.every({ b: 2, d: 4, f: 6 }, predicate, null)).to.be.true;
        });
        it('if given a context it will call it', () => {
            const obj = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 };
            const predicate = function () {
                this.a = 80;
            };
            _.every([7, 8, 23, 67, 34, 12], predicate, obj);
            expect(obj.a).to.equal(80);
        });
    });
    describe('#some', () => {

        it('if an array value passes predicate it returns true imediately', () => {
            const predicate = (elem) => {
                return elem % 2 === 1;
            };
            expect(_.some([1, 2, 3, 4, 5, 6], predicate, null)).to.be.true;
        });
        it('if an object value passes predicate it returns true imediately', () => {
            const predicate = (elem) => {
                return elem % 2 === 1;
            };
            expect(_.some({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 }, predicate, null)).to.be.true;
        });
        it('if all array values fail predicate it returns false', () => {
            const predicate = (elem) => {
                return elem % 2 === 1;
            };
            expect(_.some([2, 4, 6], predicate, null)).to.be.false;
        });
        it('if all object values fail predicate it returns false', () => {
            const predicate = (elem) => {
                return elem % 2 === 1;
            };
            expect(_.some({ b: 2, d: 4, f: 6 }, predicate, null)).to.be.false;
        });
        it('if given a context it will call it', () => {
            const obj = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 };
            const predicate = function () {
                this.a = 80;
            };
            _.some([7, 8, 23, 67, 34, 12], predicate, obj);
            expect(obj.a).to.equal(80);
        });
    });
    describe('#once', () => {
        it('will call a function once', () => {
            const spy = sinon.spy();
            var onceSpied = _.once(spy);
            onceSpied();
            onceSpied();
            expect(spy.callCount).to.equal(1);
        });
    });
    describe('#memoize', () => {
        it('if Answer has already been encountered it will only run the function once', () => {
            const spy = sinon.spy();
            var memoizedSpy = _.memoize(spy);
            memoizedSpy();
            memoizedSpy();
            expect(spy.callCount).to.equal(1);
        });
    });
    describe('#shuffle', () => {
        it('will return a shuffled array of the same length', () => {
            const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            const output = _.shuffle(input);
            output();
            expect(input).to.not.eql(output());
            expect(input.length).to.equal(output().length);
            expect(input).to.be.eql(output().sort(function (a, b) {
                return a - b;
            }));
        });
        it('will return an array of shuffled object keys', () => {
            const input = { a: 1, b: 2, c: 3, d: 4, e: 5 };
            const output = _.shuffle(input);
            expect(output()).to.be.an('array');
            expect(output().sort(function (a, b) {
                return a - b;
            })).to.be.eql([1, 2, 3, 4, 5]);
        });
    });
    describe('#invoke', () => {
        it('takes a function name as an argument and applies it to each value an array', () => {
            let input = _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
            expect(input).to.be.eql([[1, 5, 7], [1, 2, 3]]);
            input = _.invoke([[5, 1, 7], [3, 2, 1]], 'slice', 1);
            expect(input).to.be.eql([[1, 7], [2, 1]]);
            input = _.invoke([[5, 1, 7], [3, 2, 1]], 'filter', function (elem) { return elem > 1; });
            expect(input).to.be.eql([[5, 7], [3, 2]]);
        });
        it('takes a function name as an argument and applies it to each value in an object', () => {
            let input = _.invoke({ 'A': 1, 'B': 2, 'C': 3 }, 'toString');
            expect(input).to.be.eql(['1', '2', '3']);
        });
    });
    describe('#sortBy', () => {

        it('sorts values of a list based on the function provided for an array', () => {
            expect(_.sortBy([1, 2, 3, 4, 5, 6], (num) => { return Math.sin(num); })).to.eql([5, 4, 6, 3, 1, 2]);

        });
        it('sorts values of a list based on the function provided for an object', () => {
            expect(_.sortBy({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 }, (num) => { return Math.sin(num); })).to.eql([5, 4, 6, 3, 1, 2]);
        });
        it('calls context when used', () => {
            const context = { a: 1 };
            _.sortBy([1, 2, 3, 4, 5, 6], function () { this.a = 100; }, context);
            expect(context.a).to.equal(100);
        });
        it('sorts values of a list based on the key provided for an object', () => {
            let stooges = [{ name: 'moe', age: 40 }, { name: 'larry', age: 50 }, { name: 'curly', age: 60 }];
            expect(_.sortBy(stooges, 'name')).to.eql([{ name: 'curly', age: 60 }, { name: 'larry', age: 50 }, { name: 'moe', age: 40 }]);
            stooges = [{ name: 'moe', age: 70 }, { name: 'larry', age: 60 }, { name: 'curly', age: 30 }];
            expect(_.sortBy(stooges, 'age')).to.eql([{ name: 'curly', age: 30 }, { name: 'larry', age: 60 }, { name: 'moe', age: 70 }]);
        });
    });
    describe('#zip', () => {
        it('builds a series of arrays assiging the first index of said array to the new first array', () => {
            expect(_.zip([1, 2], ['a', 'b'])).to.eql([[1, 'a'], [2, 'b']]);
        });
        it('works for any number of arrays', () => {
            expect(_.zip([1, 2, 3], ['a', 'b', 'c'], [{}, {}, {}])).to.eql([[1, 'a', {}], [2, 'b', {}], [3, 'c', {}]]);
            expect(_.zip([1, 2, 3, 4], ['a', 'b', 'c', 'd'], [{}, {}, {}, {}], [[], [], [], []])).to.eql([[1, 'a', {}, []], [2, 'b', {}, []], [3, 'c', {}, []], [4, 'd', {}, []]]);
        });
        it('when used with apply can be used for nested arrays', () => {
            expect(_.zip.apply(null, [[1, 2], ['a', 'b']])).to.eql([[1, 'a'], [2, 'b']]);
        });
    });
    describe('#sortedIndex', () => {
        it('Determines the index at which the value should be inserted into the list', () => {
            expect(_.sortedIndex([10, 20, 30, 40, 50], 35)).to.equal(3);
        });
        it('If a string iteratee is provided, it will be used to compute the sort ranking of each value', () => {
            var stooges = [{ name: 'moe', age: 40 }, { name: 'curly', age: 60 }];
            expect(_.sortedIndex(stooges, { name: 'larry', age: 50 }, 'age')).to.equal(1);
        });
        it('If an iteratee function is provided, it will be used to compute the sort ranking of each value', () => {
            const iteratee = (value) => {
                return value !== 35 ? value * 100 : value;
            };
            expect(_.sortedIndex([10, 20, 30, 40, 50], 35, iteratee)).to.equal(0);
        });
    });
});