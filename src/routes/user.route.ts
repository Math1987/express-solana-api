import {Router} from "express";
import {
    connect,
    verifyAuthorization,
    get, 
    update,
    remove
} from "../controller/user.controller" ;

const route = Router();


/**
 * need a signature of a message and a publicKey to attest that the user is the owner of the account solana
 * if correct, send back a token, save it on db with associated values like address
 */
route.post('/connect', connect);

/**
 * read the authorization token in header and verify if this is a valid token in db
 * if yes, continue the routes, else sens codeStatus 401
 */
route.use('/verifyAuthorization', verifyAuthorization);


route.get('/get', get);
route.post('/update', update);
route.post('/remove', remove);


export default route ;