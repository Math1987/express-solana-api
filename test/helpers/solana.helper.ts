import * as web3 from "@solana/web3.js" ;
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import fs from "fs" ;
import path from "path" ;
import {connection} from "./../../../solana-api/src/engine/solana.engine" ;

export let keypair1 : web3.Keypair ;
export let keypair2 : web3.Keypair ;

export const createKeypair = async ( sols = 1 ) : Promise<web3.Keypair> => {
    const kp = new web3.Keypair() ;
    const signature = await connection.requestAirdrop(kp.publicKey, web3.LAMPORTS_PER_SOL*sols);
    await connection.confirmTransaction(signature);
    return kp ;
}
/**
 * Create 2 web3.Keypairs instances exported as keypair1 & keypair2 from key files in keypair folder.
 * If a keypair has less than 1 SOL, request 1 sol until it got at least 1 SOL.
 */
export const initKeypairs = async () : Promise<void> => {

    //@ts-ignore 
    const key1 = JSON.parse( fs.readFileSync(path.join(__dirname, 'keypairs/key1')) ) ;
    keypair1 = web3.Keypair.fromSecretKey( Uint8Array.from(key1));
    let sols = await connection.getBalance(keypair1.publicKey) ;
    while ( sols <= web3.LAMPORTS_PER_SOL  ){
        const signature = await connection.requestAirdrop(keypair1.publicKey, web3.LAMPORTS_PER_SOL);
        await connection.confirmTransaction(signature);
        sols = await connection.getBalance(keypair1.publicKey) ;
        console.log('new sol balance for keypair1', sols/web3.LAMPORTS_PER_SOL + " sol" );
    }
    console.log('kepair1 created', sols/web3.LAMPORTS_PER_SOL + " sol");
    //@ts-ignore 
    const key2 = JSON.parse( fs.readFileSync(path.join(__dirname, 'keypairs/key2')) ) ;
    keypair2 = web3.Keypair.fromSecretKey( Uint8Array.from(key2));
    let sols2 = await connection.getBalance(keypair2.publicKey) ;
    while ( sols2 <= web3.LAMPORTS_PER_SOL  ){
        const signature = await connection.requestAirdrop(keypair2.publicKey, web3.LAMPORTS_PER_SOL);
        await connection.confirmTransaction(signature);
        sols2 = await connection.getBalance(keypair2.publicKey) ;
        console.log('new sol balance for keypair2', sols2/web3.LAMPORTS_PER_SOL + " sol" );
    }
    console.log('kepair2 created',  sols2/web3.LAMPORTS_PER_SOL + " sol");

    // keypair1 = await createKeypair();
    // keypair2 = await createKeypair();
}
export const makeTransaction = async ( fromKeypair : web3.Keypair, toPublicKey : web3.PublicKey, solAmount : number ) : Promise<string> => {
    const transaction = new web3.Transaction();
    transaction.add(web3.SystemProgram.transfer({
        fromPubkey : fromKeypair.publicKey,
        toPubkey : toPublicKey,
        lamports : LAMPORTS_PER_SOL*solAmount
    }));
    const signature = await web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [fromKeypair]
    );
    return signature ;
}