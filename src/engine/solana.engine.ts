
import { Connection, clusterApiUrl } from "@solana/web3.js" ;

export let connection : Connection ;

export const connect = async () : Promise<Connection> => {
    return connection = await new Connection(clusterApiUrl("devnet"));
}

export const readTransaction = async ( signature : string ) => {
    return null ;
}
export const verifyTransaction = ( transaction: any ) => {
    return false ;
}