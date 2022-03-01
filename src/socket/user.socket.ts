import { verifyAuthorization } from "../controller/user.socket.controller" ;
export const use = ( client ) => {


        /** 
         * Verify Authorization fetch the user datas from token.
         * the datas as stored as socket.data
         * This function is called in the connection socket to get updated datas for each usage
         */
         verifyAuthorization(client) ;
         
         client.on('message', (text, callback) => {
            callback(client.data.address) ;
         });
 

}