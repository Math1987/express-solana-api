import { MongoServerError } from "mongodb"; 
import { expect } from "chai" ;
import { ObjectId } from "mongoose";
import { type as typeExample, typeInDB as typeInDbExample, create as createExample, readOne as readOneExample } from "../../src/datas/example.data" ;


describe('example data', () => {

    let id_ : ObjectId ;
    it("createExample and readOneExample: should return example datas.", async () => {

        const example = await createExample({address : "12345"}) ;
        expect(example.address).equal("12345");
        expect(example._id).exist ;
        const exampleReaded = await readOneExample(example._id) as typeInDbExample ;
        expect(exampleReaded._id.toString()).equal(example._id.toString());
        expect(exampleReaded.address).equal("12345");

    });
    it("createExample and readOneExample: should return example 2 datas.", async () => {

        const example = await createExample({address : "abcdefg"}) ;
        expect(example.address).equal("abcdefg");
        expect(example._id).exist ;
        const exampleReaded = await readOneExample(example._id) as typeInDbExample ;
        expect(exampleReaded._id.toString()).equal(example._id.toString());
        expect(exampleReaded.address).equal("abcdefg");

    });
    it("createExample doublon: should fail with code 11000", async () => {
        try{
            await createExample({address : "12345"});
        }catch( e ){
            expect((e as MongoServerError).code).equal(11000);
        }
    });

});