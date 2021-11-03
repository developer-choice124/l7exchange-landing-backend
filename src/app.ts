import express from "express";
import path from "path";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import { corsMiddlewareRouter } from "./middlewares/cors.middleware";
import { API_V1 } from "./config/global";
// Router
import { users_router } from "./routes/users.router";
import { banner_router} from "./routes/banner.router";
import { setting_router} from "./routes/setting.router";
// End

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(loggerMiddleware);
app.use(corsMiddlewareRouter);

app.use(API_V1, users_router);
app.use(API_V1,banner_router);
app.use(API_V1,setting_router);

app.use('/assets', express.static(path.join(__dirname, './../public')));
app.use('/', express.static(path.join(__dirname, './website')));
app.get('/hello', (request, response) => {
  response.send({   
    hostname: request.hostname,
    path: request.path,
    method: request.method,
  });
});

// export app
export { app };
