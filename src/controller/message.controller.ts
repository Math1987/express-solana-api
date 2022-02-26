import { Request, Response } from "express" ;
import { getMessageSample as getMessageSampleE } from "../engine/message.engine" ;
import { isSolanaAddress } from "./helper.controller";


export const getMessageSample = async (req: Request, res: Response) => {

    let code = 0 ;
    try{
        code = parseInt( req.query.code as string ) ;
    }catch(e){}
    let ad = null ;
    if ( req.query.address && isSolanaAddress(req.query.address) ) {
        ad = req.query.address as string ;
    }
    const message = await getMessageSampleE( code, ad ) ;
    res.status(200).send({ message });
}