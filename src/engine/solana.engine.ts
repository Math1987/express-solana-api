
import { Connection, clusterApiUrl, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js" ;
import environment from "../environment" ;

export let connection : Connection ;

export const connect = async () : Promise<Connection> => {
    return connection = await new Connection(clusterApiUrl("devnet"));
}

export type SimpleTransferTransaction = {
    ammount : number,
    payer : string,
    receiver : string,
    time : number
}

/**
 * Read and decode a simple transfer transaction
 * @param signature string 
 * @returns an object containing basic needed infos as ammount, paer, receiver and time
 */
export const readSimpleTransferTransaction = async ( signature : string ) : Promise<SimpleTransferTransaction> => {
    const transac = await connection.getTransaction(signature);
    return {
        ammount : (transac?.meta?.postBalances[1]! - transac?.meta?.preBalances[1]! )/LAMPORTS_PER_SOL,
        payer : transac?.transaction.message.accountKeys[0]!.toString()!,
        receiver : transac?.transaction.message.accountKeys[1]!.toString()!,
        time : transac?.blockTime!
    }
}

/**
 * Verify if the transaction respect the conditions of ammount, time and addresses
 * By default, the transaction shoul re
 * @param transaction SimpleTransferTransaction
 * @returns 
 */
export const readAndVerifySimpleTransferTransaction = async ( 
    signature: string , 
    ammount = environment.solana.transactions.default.ammount, 
    receiver = environment.solana.transactions.default.receiver, 
    time = environment.solana.transactions.default.time, 
    ) : Promise<SimpleTransferTransaction | null > => {
    const transac = await readSimpleTransferTransaction(signature) ;
    if ( transac.ammount === ammount && 
        transac.receiver === receiver && 
        (Math.floor( (Date.now()/1000) - transac.time )) <= time
        ){
            return transac ;
        }else{
            throw Error('The transaction is not valid.')
        }
}