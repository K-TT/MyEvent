let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../Server/Config/app');

// Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Events API', () => {
// Test the GET home page route
describe("GET Saved Events page", () => {
    it("It should NOT get Saved Events page", (done) => {
        chai.request(server)
            .get("/saved-events")
            .end((err, response) => {
                response.should.have.status(404);
                done();
            });
    });
});
});