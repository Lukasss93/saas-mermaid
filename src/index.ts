import express, {Express} from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import routes from "./routes";
import * as Service from "./Service";
import config from "./config";

Service.cleanCache();
setInterval(Service.cleanCache, 1000 * 60 * 60);

const app: Express = express();
app.use(morgan('combined'));
app.use(bodyParser.text());
app.use('/', routes);
const server = app.listen(config.server.port, () => {
    console.log(`${config.app.name} v${config.app.version} server is running at http://localhost:${config.server.port}`);
});

const shutdown = () => {
    console.log('Shutting down...');
    server.close(() => {
        console.log('HTTP server closed.');
        process.exit(0);
    });
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);