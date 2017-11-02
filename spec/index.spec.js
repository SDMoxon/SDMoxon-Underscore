const path = require('path');
const expect = require('chai').expect;
// const sinon = require('sinon');

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
      
});