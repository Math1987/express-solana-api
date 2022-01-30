import { Cluster } from "@solana/web3.js" ;

let clientURL = ['http://localhost:4200', 'http://localhost:17000'];


let environment : {
    mode : string, 
    db : string,
    clientURL : string[]
    port : number,
    solana : {
        cluster : Cluster,
        address : string,
        transactions : {
            default : {
                ammount : number,
                receiver : string,
                time : number,
            }
        }
    }
} = {
    mode : "dev",
    db : "mongodb://localhost:27017/mydbtest",
    port : 17000,
    clientURL : [...clientURL],
    solana : {
        cluster : "devnet",
        address : "FfYeVASAm2nDzcC5ckorecT1u8ybFwrCZnMi8sXrtf3P",
        transactions : {
            default : {
                ammount : 0.01,
                receiver : "FfYeVASAm2nDzcC5ckorecT1u8ybFwrCZnMi8sXrtf3P",
                time : 30000
            }
        }
    }
}
if ( process.env.MODE === "prod" ){
    environment.clientURL = ["http://mywebsite.com", "https://mywebsite.com"];
    environment.mode = "prod" ;
    environment.db = "mongodb+srv://User:Password@cluster.any.mongodb.net/mydb?retryWrites=true&w=majority"
    environment.solana.cluster = "mainnet-beta" ;
}


if ( process.env.CLIENT_URL ){
    environment.clientURL = JSON.parse(process.env.CLIENT_URL);
}


export default environment ;