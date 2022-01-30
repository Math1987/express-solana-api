// import { PublicKey, Transaction } from "@solana/web3.js" ;
import { Request } from "express";
import { ObjectId } from "mongodb" ;
import { typeInDB as user } from "datas/user.data";

/**
 * NOTE : THOSES HELPERS SHOULD BE UPGRATED !
 */

export type requestWithUser = Request & { user : user } ;


export const gotBody = ( object : any ) : boolean => {
    return (typeof object === "object" && object.body ) ? true : false ;
}
//WAIT UPDATE FOR MORE PRECISIONS
export const isSolanaAddress = ( value : any ) : boolean => {
    return (typeof value === "string" && value.length >= 32 &&  value.length <= 44) ? true : false ;
}
//WAIT UPDATE FOR MORE PRECISIONS
export const isSolanaTransactionSignature = ( value : any ) : boolean => {
    return (typeof value === "string"  && value.length >= 64 && value.length <= 512 ) ? true : false ;
}
export const isPseudo = ( value : any ) : boolean => {
    return (typeof value === "string" && value.length <= 56 ) ? true : false ;
}
export const isMongoId = ( value : any ) : boolean => {
    return ObjectId.isValid(value) ;
}
export const preparBodyForSend = (object : any ) : Object => {
    if ( object['_id'] && object['_id'] instanceof ObjectId ) {
        object['_id'] = object['_id'].toString();
    }
    return object ;
}