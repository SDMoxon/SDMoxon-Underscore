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
});