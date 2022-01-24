import { init as initDatas } from "./datas/index.data" ;

initDatas();
import express from "express";

export const app = express();

import routeExample from "./routes/example.route" ;
app.use(routeExample);

