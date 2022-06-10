import express, {Express} from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import routes from "./routes";
import * as Service from "./Service";

dotenv.config();
const port: Number = Number(process.env.PORT) || 8087;

Service.cleanCache();
setInterval(Service.cleanCache, 1000 * 60 * 60);

const app: Express = express();
app.use(morgan('combined'));
app.use(bodyParser.text());
app.use('/', routes);
const server = app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
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