import {Router} from "express";
import {
    connect,
    refreshToken,
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
//@ts-ignore
route.use(verifyAuthorization);

//@ts-ignore
route.get('/refreshToken', refreshToken );
//@ts-ignore
route.get('/get', get);
//@ts-ignore
route.post('/update', update);
//@ts-ignore
route.post('/remove', remove);


export default route ;