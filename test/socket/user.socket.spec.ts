// with { "type": "module" } in your package.json
import { createServer } from "http";
import { io as Client, Socket as SocketClient } from "socket.io-client";
import { Server, Socket } from "socket.io";
import { assert } from "chai";
import { use as useUser } from "../../src/socket/user.socket" ;
import { connectUser } from "../helpers/user.helper" ;

describe("socket.io", () => {

  let io, serverSocket : Socket, clientSocket : SocketClient ;

  before((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      //@ts-ignore
      const port = httpServer.address().port ;
      io.on("connection", client => {
        serverSocket = client;
        useUser(serverSocket);
      });
      //@ts-ignore
      connectUser().then( userToken => {
          //@ts-ignore
          clientSocket = new Client(`http://localhost:${port}`,{
              extraHeaders: {
                  //@ts-ignore
                Authorization: userToken
              }
            });
          clientSocket.on("connect", done);
          
      });
    });
  });

  after(() => {
    io.close();
    clientSocket.close();
  });

  it("Should send back user publickey read from the server after authentication.", (done) => {
    clientSocket.emit("message", "Hello what is my publickey?", res => {
      assert.equal(res, "9LwYEYG7Y5UT9jUCc18J6CfvymcJKDQuTUGsLvqRakyD");
      done();
    });
  });


});