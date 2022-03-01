import {Server, Socket} from "socket.io" ;
import https from "https" ;
import http from "http" ;
import { use as useUser } from "../socket/user.socket" ;
export let io : Server | null = null ;
export let serverSocket : Socket = null ;



export const runSocket = ( server : https.Server | http.Server ) => {

    io = new Server(server,  {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
          }
        }) ;

    io.on('connection', client => {

        useUser(client);
    
    });

    return io ;

}

