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
});