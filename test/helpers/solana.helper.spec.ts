import {connect} from "./../../../solana-api/src/engine/solana.engine" ;
import { initKeypairs } from "./solana.helper" ;

/**
 * Create keypair instances and connect to devnet Solana Cluster
 */
before( async ()=> {

    await connect();
    await initKeypairs();
    console.log('connected on solana cluster');

});