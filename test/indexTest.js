let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../Server/Routes/index');

const { interestedCounter } = require('../Server/Controllers/index');
var expect = require('chai').expect;


// Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Index API', () => {
// Test the GET home page route
describe("GET home page", () => {
    it("It should get home page", (done) => {
        chai.request(server)
            .get("/")
            .end((err, response) => {
                response.should.have.status(200);
            });
            done();
    });
});

/* Unit test to check if popular events interest counter is more than 5 */
describe('the pop even function', () => {
    it('interestedCounter should be more than 5', () => {
        const result =interestedCounter > 5;
       expect(result);
    });
});

});


