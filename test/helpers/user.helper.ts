import request from "supertest" ;
import app from "../../src/index" ;
import { create as createMessage } from "../../src/datas/message.data"


let fakeMessage = "I am the owner of this address.\nmessageId:uo8cfAuqZMc" ;
let fakeNonceSignature = "4E92SFyu9zeXFKs5nqaY4QDL4eU2zAQFfbDqJUUHEKaemdQhS7T7451u4qNTvQb34VK2CkAu2qFZm9re7N7kJHwu" ;

export const  connectUser = () => {
    return new Promise((resolve, reject) => {

        const req = request(app);
        createMessage({ message : fakeMessage, address: "9LwYEYG7Y5UT9jUCc18J6CfvymcJKDQuTUGsLvqRakyD"}).then( r => {

            req
                .post(`/user/connect`)
                .send({
                    address : "9LwYEYG7Y5UT9jUCc18J6CfvymcJKDQuTUGsLvqRakyD",
                    signedMessage : fakeNonceSignature
                })
                .end( ( err, res) => {
                console.log('user connected token', res.body.toke);
                resolve(res.body.token)
            });

        });
    });

};