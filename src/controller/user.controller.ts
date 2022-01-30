import { Request, Response } from "express" ;
import {
    requestWithUser,
    gotBody,
    isSolanaAddress,
    isSolanaTransactionSignature,
    preparBodyForSend,
    isPseudo,
    isMongoId
} from "./helper.controller" ;

import {
    readOneByAddress, 
} from "../datas/user.data" ;

import { connect as connectE, getUserFromToken, udpateUser, removeUser } from "../engine/user.engine" ;



export const connect = async (req : Request, res : Response, next : any ) => {
    if ( req.body && req.body.address && req.body.signedMessage ){
        try{
            const datas = await connectE( req.body.address, req.body.signedMessage );        
            res.status(200).send(datas);
        }catch( e ){
            res.status(401).send({
                error : "Authentification invalid."
            });
        }
    }else{
        res.status(401).send({
            error : "Authentification invalid."
        });
    }
}
export const verifyAuthorization = async (req : requestWithUser, res : Response, next : any ) => {
    try{
        const user = await getUserFromToken(req.headers.authorization!);
        if ( user ){
            req.user = user ;
            next();
        }else{
            res.status(401).send({ error : "No authorization."});
        }
    }catch(e){
        res.status(401).send({ error : "No authorization."});
    }
}

// export const createMessage = ( req: Request, res : Response ) => {
//     res.status(400).send('No message found');
// }
// export const signMessage  = ( req: Request, res : Response ) => {
//     res.status(400).send('No message found');
// }



export const get = async ( req : requestWithUser, res : Response ) => {

    if ( req.user ){
        res.status(200).send(req.user) ;
    }else{
        res.status(400).send();
    }

    // if ( req.query && req.query.address && isSolanaAddress(req.query.address) ){
    //     try{
    //         //@ts-ignore
    //         const user = await readOneByAddress(req.query?.address);
    //         if ( user && user['address'] ){
    //             //@ts-ignore
    //             res.status(200).send(preparBodyForSend(user));
    //         }else{
    //             res.status(400).send();
    //         }
    //     }catch(err){
    //         res.status(400).send();
    //     }
    // }else{
    //     res.status(400).send();
    // }
}
export const update = async ( req : Request, res : Response ) => {
    if ( gotBody(req) && req.body.signature && isSolanaTransactionSignature(req.body.signature) ){
        try{
            const user = await udpateUser(req.body.signature, req.body.datas);
            res.status(200).send(preparBodyForSend(user));
        }catch(err){
            res.status(401).send();
        }
    }else{
        res.status(400).send();
    }
}
export const remove = async ( req : Request, res : Response ) => {
    if ( gotBody(req) && req.body.signature && isSolanaTransactionSignature(req.body.signature) ){
        try{
            await removeUser(req.body.signature);
            res.status(200).send(preparBodyForSend({success : true}));
        }catch(err){
            res.status(401).send();
        }
    }else{
        res.status(400).send();
    }
}
export const play = ( req : Request, res : Response ) => {
    res.status(400).send();
}
export const gameOver = ( req : Request, res : Response ) => {
    res.status(400).send();
}