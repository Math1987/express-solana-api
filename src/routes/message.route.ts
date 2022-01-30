import {Router} from "express";
import {
    getMessageSample,
} from "../controller/message.controller" ;

const route = Router();

route.get('/messageSample', getMessageSample );

export default route ;