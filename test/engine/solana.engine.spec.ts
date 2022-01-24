import { expect } from "chai" ;
import { keypair1, keypair2, makeTransaction } from "../helpers/solana.helper" ;
import { connection } from "./../../../solana-api/src/engine/solana.engine" ;
import * as web3 from "@solana/web3.js" ;

describe('solana.helper', () => {

    it("check keypairs: keypair1 & keypair2 should be instances of Keypair with at least 1 sol", async () => {
        expect(keypair1).instanceof(web3.Keypair);
        const lamports = await connection.getBalance(keypair1.publicKey);
        expect(lamports >= 1 ).equals(true);

        expect(keypair2).instanceof(web3.Keypair);
        const lamports2 = await connection.getBalance(keypair2.publicKey);
        expect(lamports2 >= 1 ).equals(true);
    });
    it("makeTransaction: should transfer 0.01 SOLS from keypair1 to keypair2", async () => {

        const sols = 0.01 ;
        const previuskey1Lamports = await connection.getBalance(keypair1.publicKey);
        const previuskey2Lamports = await connection.getBalance(keypair2.publicKey);
        await makeTransaction(keypair1, keypair2.publicKey, sols); 
        const postkey1Lamports = await connection.getBalance(keypair1.publicKey);
        const postkey2Lamports = await connection.getBalance(keypair2.publicKey);

        expect(previuskey1Lamports-postkey1Lamports >= sols).equals(true) ;
        expect(postkey2Lamports-previuskey2Lamports >= sols).equals(true) ;

    });

});

