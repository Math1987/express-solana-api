let environment : {
    mode : string, 
    db : string
} = {
    mode : "dev",
    db : "mongodb://localhost:27017/mydbtest"
}
if ( process.env.MODE === "prod" ){
    environment.mode = "prod" ;
    environment.db = "mongodb+srv://User:Password@cluster.any.mongodb.net/mydb?retryWrites=true&w=majority"
}

export default environment ;