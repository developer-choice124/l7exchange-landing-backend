import { app } from "./app";
import http from "http";

import { config } from "./config/config";
import { MongoHelper } from "../src/helpers/mongo.helper";

const serverHttp = http.createServer(app);

serverHttp.listen(config.port);
serverHttp.on('error', (err) => {
    console.error(err);
    
});

serverHttp.on('listening', async () => {
    console.info(`Server is listening ${config.host}:${config.port}`);
    // connect to mongodb
    try{
        let connection = `mongodb://${config.database.host}:${config.database.port}/${config.database.dbname}`;
        await MongoHelper.connect(connection);
        console.info(`Connected to Mongo!`);
    }catch(err){
        console.error("Unable to connect mongo!", err);
    }
});
