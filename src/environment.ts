let environment : {
    mode : string, 
    db : string,
    solana : {
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
    solana : {
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
    environment.mode = "prod" ;
    environment.db = "mongodb+srv://User:Password@cluster.any.mongodb.net/mydb?retryWrites=true&w=majority"
}

export default environment ;