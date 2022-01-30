import { Request, Response } from "express" ;
import { getMessageSample as getMessageSampleE } from "../engine/message.engine" ;

export const getMessageSample = async (req: Request, res: Response) => {
    const message = await getMessageSampleE() ;
    res.status(200).send({ message });
}