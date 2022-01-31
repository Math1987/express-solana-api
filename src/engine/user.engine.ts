import { readOneByAddress, updateOne, removeOne, create, typeInDB as user } from "../datas/user.data";
import { verifyMessage, readAddressFromTransaction } from "./solana.engine" ;
import { getMessageSample } from "./message.engine" ;
import { createToken, readToken } from "../config/jwt.config" ;

export const connect = async ( address : string, signedMessage : string ) : Promise<{ user : any, token : string}> => {
    
    try {
        const messageSample = await getMessageSample() ;
        if ( await verifyMessage(address, signedMessage, messageSample ) ){
            const token = createToken({ address });
            let user = await readOneByAddress(address!);
            if ( !user ){
                user = await create({ address });
            }
            return {
                user,
                token
            };
        }else{
            throw Error("Fail verifying message.");
        }
    }catch ( e ){
        throw Error("Fail connecting message.");
    }
    
}
export const getUserFromToken = async ( token : string ) : Promise<user> => {

    const datas = await readToken(token) ;
    const user = await readOneByAddress( datas!.address! );
    return user! ;

}

export const udpateUser = async ( user : user, messageSignature : string, datas : any ) => {

    const message = await getMessageSample(1);
    const verified = await verifyMessage(user.address, messageSignature, message );
    if ( verified ) {
        const newUser = await updateOne(user?._id, datas);
        return newUser ;
    }else{
        return false ;
    }
}

export const removeUser = async ( user : user , messageSignature : string ) : Promise<boolean> => {
    const message = await getMessageSample(2);
    const verified = await verifyMessage(user.address, messageSignature, message );
    if ( verified ) {
        await removeOne(user._id);
        return true ;
    }
    return false ;
}