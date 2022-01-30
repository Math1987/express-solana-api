import { MongoServerError } from "mongodb"; 
import { expect } from "chai" ;
import { ObjectId } from "mongoose";
import { type as User, typeInDB as UserDB, create, readOne, readOneByAddress, updateOne, removeOne } from "../../src/datas/user.data" ;


describe('user data', () => {

    let user1_id : ObjectId ;
    let user1 : any ;
    it("create and read: should return a user.", async () => {
        const u = await create({address : "12345"}) ;
        expect(u.address).equal("12345");
        expect(u._id).exist ;
        user1_id = u._id ;
        const user1Readed = await readOne(u._id) as UserDB ;
        expect(user1Readed._id.toString()).equal(u._id.toString());
        expect(user1Readed.address).equal("12345");
        expect(user1Readed.pseudo).equal(undefined);
        user1 = user1Readed ;
    });
    it("update: should return the user with new pseudo.", async () => {
        const user1Readed = await updateOne( user1_id, { pseudo : "Albert Premier"}) as UserDB ;
        expect(user1Readed._id.toString()).equal(user1_id.toString());
        expect(user1Readed.address).equal("12345");
        expect(user1Readed.pseudo).equal("Albert Premier");
    });
    it("readOneByAddress: should return empty object.", async () => {
        const user1Readed = await readOneByAddress(user1.address) as UserDB ;
        expect(user1Readed._id.toString()).equal(user1_id.toString());
        expect(user1Readed.address).equal("12345");
        expect(user1Readed.pseudo).equal("Albert Premier");
    });
    it("create doublon: should fail with code 11000", async () => {
        try{
            await create({address : "12345"});
        }catch( e ){
            expect((e as MongoServerError).code).equal(11000);
        }
    });
    it("remove: should return true", async () => {
        const result = await removeOne( user1_id);
        expect(result).equal(true);
    });
    it("readOne: should return empty object.", async () => {
        const user1Readed = await readOne(user1_id) as UserDB ;
        expect(user1Readed).equal(null);
    });
    it("create and read: should return a user.", async () => {
        const user1 = await create({address : "12345", pseudo : "Jesus Christ"}) ;
        expect(user1.address).equal("12345");
        expect(user1._id).exist ;
        const user1Readed = await readOne(user1._id) as UserDB ;
        expect(user1Readed._id.toString()).equal(user1._id.toString());
        expect(user1Readed.address).equal("12345");
        expect(user1Readed.pseudo).equal("Jesus Christ");
        user1_id = user1Readed._id ;
    });
    it("create and read: should return a user.", async () => {
        const user2 = await create({address : "23456", pseudo : "Dark Vador"}) ;
        expect(user2.address).equal("23456");
        expect(user2._id).exist ;
        const user2Readed = await readOne(user2._id) as UserDB ;
        expect(user2Readed._id.toString()).equal(user2._id.toString());
        expect(user2Readed.address).equal("23456");
        expect(user2Readed.pseudo).equal("Dark Vador");
        user1_id = user2Readed._id ;
    });

});