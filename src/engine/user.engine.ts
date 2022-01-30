import { readOneByAddress, updateOne, removeOne, create } from "../datas/user.data";
import { verifyMessage, readAddressFromTransaction } from "./solana.engine" ;
import { getMessageSample } from "./message.engine" ;

export const connect = async ( address : string, signedMessage : string ) => {
    
    try {

        const messageSample = await getMessageSample() ;
        if ( await verifyMessage(address, signedMessage, messageSample ) ){
            return true ;
        }else{
            throw Error("Fail verifying message.");
        }
    }catch ( e ){
        throw Error("Fail connecting message.");
    }
    
}

export const udpateUser = async ( signature : string, datas : any ) => {
    const address = await readAddressFromTransaction(signature);
    const user = await readOneByAddress(address!);
    if ( !user ){
        return await create({ address, ...datas});
    }else{
        return await updateOne(user?._id, datas);
    }
}

export const removeUser = async ( signature : string ) : Promise<boolean> => {
    const address = await readAddressFromTransaction(signature);
    const user = await readOneByAddress(address!);
    const remove = await removeOne(user!._id);
    return true ;
}