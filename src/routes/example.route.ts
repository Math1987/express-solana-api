import {Router} from "express";
import {get as getExample} from "../controller/example.controller" ;

const route = Router();

route.get('/example', getExample );

export default route ;