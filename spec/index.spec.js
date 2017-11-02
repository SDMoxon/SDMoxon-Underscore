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
        it('is a function', () => {
          expect(_.first).to.be.a('function');
        });
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
});