let assert = require('chai').assert;
let index = require('../Server/Controllers/index');

const { interestedCounter } = require('../Server/Controllers/index');

/*
describe('Index', function(){
    it('App should navigate to home page', function(){
        assert.equal(index, 'hello');
    });
});*/

// Unit test to check if popular events interst counter is more than 5
describe('the pop even function', () => {
      it('interestedCounter should be more than 5', () => {
          const result =interestedCounter >5;
      });
});