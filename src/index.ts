import express, {Express} from 'express';
import bodyParser from "body-parser";


const app: Express = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`[Server]: Server is running at http://localhost:${port}`);
});