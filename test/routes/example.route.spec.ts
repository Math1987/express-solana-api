import { expect } from "chai" ;
import { app } from "../../src/index" ;
import request from "supertest" ;

describe('route example', () => {

    it("getExample: should return datas.", done => {
        request(app)
        .get('/example')
        .end( ( err, res) => {
            expect(res.statusCode).equal(200) ;
            expect(res.body.success).equal(true);
            done();
        });
    })

});