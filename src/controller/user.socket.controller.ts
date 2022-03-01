import {Server, Socket } from "socket.io" ;
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { type as User } from "../datas/user.data" ;
import { getUserFromToken } from "../engine/user.engine" ;


export const verifyAuthorization = async ( client : any ) => {

    client.use(  async (socket : Socket, next : (Error? : any | undefined )=>{} ) => {
        try{
            let user = await getUserFromToken(client.handshake.headers.authorization!);
            if ( user ){
                client.data = user ;
                next();
            }else{
                console.log("error fetching user");
                next( new Error("fail authentication"));
            }
        }catch( e ){
            console.log("error fetching user");
            next( new Error("fail authentication"));
        }

    });

}