let assert = require('chai').assert;
let index = require('../Server/Controllers/index');

const { event, interestedCounter } = require('../Server/Controllers/index');

/*
describe('Index', function(){
    it('App should navigate to home page', function(){
        assert.equal(index, 'hello');
    });
});*/

describe('the pop even function', () => {
      it('interestedCounter should be more than 5', () => {
          const result = Fo(1);
        expect(result).to.be.eq(5);
      });
});