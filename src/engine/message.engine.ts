import crypto from "crypto" ;
import { create as createMessage } from "../datas/message.data" ;

export const getMessageSample = async ( code? : number, address : string | null | undefined = null ) : Promise<string> => {
    let message = "I am the owner of this address." ;
    if ( code === 1 ){
        message = "I want to update my datas in this website.";
    }else if ( code === 2 ){
        message = "I want to delete my account on this website.";
    }
    if ( address ){
        let n = crypto.randomBytes(8).toString("base64") ;
        n = n.slice(0,n.length - 1 );
        message += `\nmessageId:${n}` ;
        await createMessage({ address, message });
    }
    return message;
}

export const getNonceFromMessage = ( message : string ) => {

    let n = "" ;
    if(message.includes('messageId:')){
        for ( let i = 0 ; i < message.length ; i ++ ){
            if ( message.slice(i- "messageId:".length, i ) === "messageId:" ){
                n = message.slice(i, message.length);
                break ;
            }
        }
    }
    return n ;

}