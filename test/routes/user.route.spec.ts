import { expect } from "chai" ;
import app from "../../src/index" ;
import request from "supertest" ;
import { keypair1, makeEmptyTransaction } from "../helpers/solana.helper" ;
import { getNonceFromMessage } from "../../src/engine/message.engine";
import { create as createMessage, readByAddress as readMessages, readOneByDatas as readMessage } from "../../src/datas/message.data" ;

describe('user route', () => {

    const req = request(app);
    let message = "" ;
    let token = "" ;

    it('getMessageSample message sample', done => {
        req
            .get(`/messageSample`)
            .end( ( err, res) => {
                expect(res.statusCode).equal(200) ;
                expect(res.body.message).equal("I am the owner of this address.");
                message = res.body.message ;
                done();
        });
    });

    let nonce = "" ;
    it('getMessageSample message sample with nonce', done => {
        req
            .get(`/messageSample?address=9LwYEYG7Y5UT9jUCc18J6CfvymcJKDQuTUGsLvqRakyD`)
            .end( ( err, res) => {
                expect(res.statusCode).equal(200) ;
                nonce = getNonceFromMessage(res.body.message) ;
                expect(getNonceFromMessage(res.body.message).length >= 4 ).equals(true) ;
                expect(res.body.message.includes("I am the owner of this address.")).equal(true) ;
                message = res.body.message ;
                done();
        });
    });
    it('readBounce should confirm that bounce is saved in db for a specific address.', async () => {
        
        //@ts-ignore 
        const nounceD = await readMessages("9LwYEYG7Y5UT9jUCc18J6CfvymcJKDQuTUGsLvqRakyD") ;
        expect(nounceD![0].message).equals("I am the owner of this address.\nmessageId:" + nonce);

    });


    let fakeMessage = "I am the owner of this address.\nmessageId:uo8cfAuqZMc" ;
    let fakeNonceSignature = "4E92SFyu9zeXFKs5nqaY4QDL4eU2zAQFfbDqJUUHEKaemdQhS7T7451u4qNTvQb34VK2CkAu2qFZm9re7N7kJHwu" ;

    it('create and read fake nonce', async () => {

        await createMessage({ message : fakeMessage, address: "9LwYEYG7Y5UT9jUCc18J6CfvymcJKDQuTUGsLvqRakyD"});
        const r = await readMessage({ address: "9LwYEYG7Y5UT9jUCc18J6CfvymcJKDQuTUGsLvqRakyD", message : fakeMessage });
        expect(r!.message).equals(fakeMessage);
        expect(r!.address).equals("9LwYEYG7Y5UT9jUCc18J6CfvymcJKDQuTUGsLvqRakyD");

    });


    it("connect : should return a token from a connection with nonce.", done => {
        req
            .post(`/user/connect`)
            .send({
                address : "9LwYEYG7Y5UT9jUCc18J6CfvymcJKDQuTUGsLvqRakyD",
                signedMessage : fakeNonceSignature
            })
            .end( ( err, res) => {
                expect(res.statusCode).equal(200) ;
                console.log('token', res.body.toke);
                token = res.body.token ;
                expect( typeof res.body.token).equal("string") ;
                done();
            });
    });



    it("connect : should fail and return statusCode 401.", done => {
        req
            .post(`/user/connect`)
            .send({
                address : "9LwYEYG7Y5UT9jUCc18J6CfvymcJKDQuTUGsLvqRakyD",
                signedMessage : "BONJOUR!"
            })
            .end( ( err, res) => {
                expect(res.statusCode).equal(401) ;
                done();
                });
    });



    it("connect : should return a token.", done => {
        req
            .post(`/user/connect`)
            .send({
                address : "9LwYEYG7Y5UT9jUCc18J6CfvymcJKDQuTUGsLvqRakyD",
                signedMessage : "sSFUSWMD4pswGDUQvkxoNf559tvDKNhwqXghZX3tjvhxHxvPwhCS3FgJNPJSgqGDNeq29tiRM6uzHzHknsxjgaQ"
            })
            .end( ( err, res) => {
                expect(res.statusCode).equal(200) ;
                console.log('token', res.body.toke);
                token = res.body.token ;
                expect( typeof res.body.token).equal("string") ;
                done();
                });
    });


    it("connect : should return a statusCode 401.", done => {
        req
            .get(`/user/get`)
            .end( ( err, res) => {
                expect(res.statusCode).equal(401) ;
                done();
                });
    });
    it("connect : should return a statusCode 401.", done => {
        req
            .get(`/user/get`)
            .set('authorization', "BONJOUR!Je suis gentil.")
            .end( ( err, res) => {
                expect(res.statusCode).equal(401) ;
                done();
                });
    });

    it("connect : should return a user.", done => {
        req
            .get(`/user/get`)
            .set('authorization', token)
            .end( ( err, res) => {
                expect(res.statusCode).equal(200) ;
                expect(res.body.address).equal("9LwYEYG7Y5UT9jUCc18J6CfvymcJKDQuTUGsLvqRakyD");
                done();
            });
    });

    it("update : should return the user updated", done => {
        request(app)
        .post('/user/update')
        .set('authorization', token)
        .send( {
            signedMessage : "m9xiePo8rEF7gcYDGgEurHLKG4Xpb18VUD8wJD7x1CQXuReaJTarWZEk6fkayxsf3Lwpj6JcnZ4qFSYYny31mgg",
            datas : {
                pseudo : "Hello World!"
            }
        })
        .end( ( err, res) => {
            expect(res.statusCode).equal(200) ;
            expect(res.body.address).equal('9LwYEYG7Y5UT9jUCc18J6CfvymcJKDQuTUGsLvqRakyD');
            expect(res.body.pseudo).equal("Hello World!") ;

            done();
        });
    });

    
    it("remove : should remove the user", done => {
        request(app)
        .post('/user/remove')
        .set('authorization', token)
        .send( {
            signedMessage : "43vwxzjoSL5CxEitZi1SgFBHu3jmHKHB3mvohCwLPjteCHDvsxPJcoyVCy5ABtAG2XbXbiuvKHKGfNsxJXiF3PEp"
        })
        .end( ( err, res) => {
            expect(res.statusCode).equal(200) ;
            done();
        });
    });

    it("connect : should return statuscode 401.", done => {
        req
            .get(`/user/get`)
            .set('authorization', token)
            .end( ( err, res) => {
                expect(res.statusCode).equal(401) ;
                done();
            });
    });

});


// describe('user route', () => {
    

//     it("get : should return statuscode 400 with no datas.", done => {
//         request(app)
//         .get(`/user/get?address=${keypair1.publicKey.toString()}`)
//         .set('authorization', 'abc123')
//         .end( ( err, res) => {
//             expect(res.statusCode).equal(400) ;
//             expect(res.body.address).equal(undefined) ;
//             done();
//         });
//     });
//     it("update : should return statuscode 401", done => {
//         request(app)
//         .post('/user/update')
//         .send( {
//             signature : "CySMuLj6MT2XUxrcYC1x6Z7AXWh3nUzaDLXRxRE6jYaZJZu15LQVqVhy52vbcggy8KakRkdD2Akt6RdAeSRzDoi",
//             datas : {
//                 pseudo : "Hello World!"
//             }
//         })
//         .end( ( err, res) => {
//             expect(res.statusCode).equal(401) ;
//             done();
//         });
//     });
//     it("remove : should return statuscode 401", done => {
//         request(app)
//         .post(`/user/remove`)
//         .send({
//             signature : "CySMuLj6MT2XUxrcYC1x6Z7AXWh3nUzaDLXRxRE6jYaZJZu15LQVqVhy52vbcggy8KakRkdD2Akt6RdAeSRzDoi"
//         })
//         .end( ( err, res) => {
//             expect(res.statusCode).equal(401) ;
//             done();
//         });
//     });

//     let emptyTransactionSignature1 = "" ;
//     it("makeEmptyTransaction : should return a signature.", async () => {
//         emptyTransactionSignature1 = await makeEmptyTransaction(keypair1);
//         expect( (typeof emptyTransactionSignature1)  ).equal("string");
//     });
//     let user1_id = "" ;
//     it("update : should return an user with an address, a pseudo and an _id", done => {

//         request(app)
//         .post('/user/update')
//         .send( {
//             signature : emptyTransactionSignature1,
//             datas : {
//                 pseudo : "Hello World!"
//             }
//         })
//         .end( ( err, res) => {
//             expect(res.statusCode).equal(200) ;
//             expect(res.body.address).equal(keypair1.publicKey.toString()) ;
//             expect(res.body.pseudo).equal("Hello World!") ;
//             expect( (typeof res.body._id )  ).equal("string");
//             user1_id = res.body._id ;
//             done();
//         });
//     });
//     it("get : should return an user with the address, pseudo and id", done => {
//         request(app)
//         .get(`/user/get?address=${keypair1.publicKey.toString()}`)
//         .set('Auth', '1234')
//         .end( ( err, res) => {
//             expect(res.statusCode).equal(200) ;
//             expect(res.body.address).equal(keypair1.publicKey.toString()) ;
//             expect(res.body.pseudo).equal("Hello World!") ;
//             expect( res.body._id ).equal(user1_id);
//             done();
//         });
//     });


//     // const agent = request.agent(app) ;

//     // it("get : testCookies should return id",  done => {
        
//     //     request(app)
//     //     .get(`/user/get?address=${keypair1.publicKey.toString()}`)
//     //     .set('Cookie', ['3AzD6HC3vu6CykjEUFXKkwE_o9tys6_Ea2', 'myApp-other=blah'])
//     //     .end( ( err, res) => {
//     //         expect(res.statusCode).equal(200) ;
//     //         // console.log("res header", res.headers);
//     //         // console.log("res cookies", res.headers );
//     //         // expect(res.body.address).equal(keypair1.publicKey.toString()) ;
//     //         // expect(res.body.pseudo).equal("Hello World!") ;
//     //         // expect( res.body._id ).equal(user1_id);
//     //         done();
//     //     });

//     //     // agent
//     //     // .get(`/user/get?address=${keypair1.publicKey.toString()}`)
//     //     // .expect("set-cookie", "cookie=hey; Path=/get", done);

//     // })

//     let emptyTransactionSignature2 = "" ;
//     it("makeEmptyTransaction : should return a signature", async () => {
//         emptyTransactionSignature2 = await makeEmptyTransaction(keypair1);
//         expect( (typeof emptyTransactionSignature2)  ).equal("string");
//     });
//     it("remove : should return statuscode 200", done => {
//         request(app)
//         .post(`/user/remove`)
//         .send({
//             signature : emptyTransactionSignature2
//         })
//         .end( ( err, res) => {
//             expect(res.statusCode).equal(200) ;
//             done();
//         });
//     });
//     it("get : should return statuscode 400", done => {
//         request(app)
//         .get(`/user/get?address=${keypair1.publicKey.toString()}`)
//         .end( ( err, res) => {
//             expect(res.statusCode).equal(400) ;
//             done();
//         });
//     });


// });
