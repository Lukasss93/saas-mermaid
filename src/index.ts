import express, {Express} from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import routes from "./routes";

dotenv.config();
const port: Number = Number(process.env.PORT) || 8087;

const app: Express = express();

app.use(morgan('combined'));
app.use(bodyParser.text());
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});