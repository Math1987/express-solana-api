import mongoose from "mongoose" ; 
import environment from "../environment" ;
import { init as initExample } from "./example.data" ;

export let db : mongoose.Connection ;
/**
 * Create a mongodb connection.
 * Load all the collections.
 * 
 * @returns the mongoose connection
 */
export const init = async (): Promise<mongoose.Connection> => {

    db = await mongoose.createConnection(environment.db) ;
    //load your collections 
    //exemple db.model("user", userSchema)
    initExample(db)
    return db ;

}

/**
 * Drop the database with all collections, disconnect and reload.
 * Note: disconnecting and reloading is important to assure correct indexation.
 * (usfull for testing)
 * 
 * @returns true
 */
export const reset = async (): Promise<boolean> => {

    if( !db ){
        await init();
    }
    await db.dropDatabase() ;
    await mongoose.disconnect();
    await init();

    return true ;
}