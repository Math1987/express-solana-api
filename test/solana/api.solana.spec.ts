import { expect } from "chai" ;
import { keypair1, keypair2, makeTransaction } from "../helpers/solana.helper" ;
import { connection, readSimpleTransferTransaction, readAndVerifySimpleTransferTransaction } from "../../src/engine/solana.engine" ;
import * as web3 from "@solana/web3.js" ;
import { describe } from "mocha";

//ADDRESS
//FfYeVASAm2nDzcC5ckorecT1u8ybFwrCZnMi8sXrtf3P

//ADRESS HK5qCeciMuzmXQAFnKjSiDQSHowvbRWEvrKPsW6SUxbA
//OLD TRANSACTION CySMuLj6MT2XUxrcYC1x6Z7AXWh3nUzaDLXRxRE6jYaZJZu15LQVqVhy52vbcggy8KakRkdD2Akt6RdAeSRzDoi
//OLD TRANSACTION WT4GpyoTmafPmEG51XHFYaPSZQhx2PtBphMcK7WSj2PYYaM3U5uiPuyBjF3Kh9CEkASBHaqq2QcTc5QSc2cWbWU
//OLD TRANSACTION  3yeHaFL8N5gXHCZ5o7ZEY3fQ5etBVQUW7embk8LLh3gL7dEwXLh2hFfnS9b8YmCEKD5byZ2m38B5afpPNdNpG6if

describe('solana.helper', () => {

    it("check keypairs: keypair1 & keypair2 should be instances of Keypair with at least 1 sol", async () => {
        expect(keypair1).instanceof(web3.Keypair);
        const lamports = await connection.getBalance(keypair1.publicKey);
        expect(lamports >= 1 ).equals(true);

        expect(keypair2).instanceof(web3.Keypair);
        const lamports2 = await connection.getBalance(keypair2.publicKey);
        expect(lamports2 >= 1 ).equals(true);
    });


});

describe('api.solana verify transaction', () => {

    let transaction1 : string ;
    const transaction1Sols = 0.01 ;

    it("makeTransaction: should transfer 0.01 SOLS from keypair1 to keypair2", async () => {

        const previuskey1Lamports = await connection.getBalance(keypair1.publicKey);
        const previuskey2Lamports = await connection.getBalance(keypair2.publicKey);
        transaction1 = await makeTransaction(keypair1, keypair2.publicKey, transaction1Sols); 
        const postkey1Lamports = await connection.getBalance(keypair1.publicKey);
        const postkey2Lamports = await connection.getBalance(keypair2.publicKey);

        expect(previuskey1Lamports-postkey1Lamports >= transaction1Sols).equals(true) ;
        expect(postkey2Lamports-previuskey2Lamports >= transaction1Sols).equals(true) ;

    });
    it("readSimpleTransferTransaction : from old transaction, should return an object with addresses and the ammount of 0.01 sol", async () => {
        const transaction = await readSimpleTransferTransaction("CySMuLj6MT2XUxrcYC1x6Z7AXWh3nUzaDLXRxRE6jYaZJZu15LQVqVhy52vbcggy8KakRkdD2Akt6RdAeSRzDoi");
        expect(transaction.ammount).equals(0.01);
        expect(transaction.payer).equals("HK5qCeciMuzmXQAFnKjSiDQSHowvbRWEvrKPsW6SUxbA");
        expect(transaction.receiver).equals("FfYeVASAm2nDzcC5ckorecT1u8ybFwrCZnMi8sXrtf3P");
        expect( (Math.floor(Date.now()/1000) - transaction.time) <= 30000 ).equals(false);
    });
    it("readSimpleTransferTransaction : should return an object with keypair1 and keypair2 publicKeys and the ammount of 0.01 sol and a recent time (less than 30 seconds)", async () => {
        const transaction = await readSimpleTransferTransaction(transaction1);
        expect(transaction.ammount).equals(transaction1Sols);
        expect(transaction.payer).equals(keypair1.publicKey.toString());
        expect(transaction.receiver).equals(keypair2.publicKey.toString());
        expect( (Math.floor(Date.now()/1000) - transaction.time) <= 30000 ).equals(true);
    });
    it("readAndVerifySimpleTransferTransaction : should return an object with keypair1 and keypair2 publicKeys and the ammount of 0.01 sol and a recent time (less than 30 seconds)", async () => {
        const transaction = await readAndVerifySimpleTransferTransaction(transaction1, transaction1Sols, keypair2.publicKey.toString() );
        expect(transaction!.ammount).equals(transaction1Sols);
        expect(transaction!.payer).equals(keypair1.publicKey.toString());
        expect(transaction!.receiver).equals(keypair2.publicKey.toString());
        expect( (Math.floor(Date.now()/1000) - transaction!.time) <= 30000 ).equals(true);
    });
    it("readAndVerifySimpleTransferTransaction : old transaction should return null ", async () => {
        try{
            await readAndVerifySimpleTransferTransaction("CySMuLj6MT2XUxrcYC1x6Z7AXWh3nUzaDLXRxRE6jYaZJZu15LQVqVhy52vbcggy8KakRkdD2Akt6RdAeSRzDoi");
        }catch (err){
            expect( (err as Error).message ).equals("The transaction is not valid.");
        }
    });
});
