import { Request, Response } from "express" ;
import { getMessageSample as getMessageSampleE } from "../engine/message.engine" ;

export const getMessageSample = async (req: Request, res: Response) => {

    let code = 0 ;
    try{
        code = parseInt( req.query.code as string ) ;
    }catch(e){}
    const message = await getMessageSampleE( code ) ;
    res.status(200).send({ message });
}