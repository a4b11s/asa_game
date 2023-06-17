import express, {Express} from 'express';
import bodyParser from "body-parser";
import {GameMap} from "./services/GameMap.js";
import morgan from 'morgan';

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(morgan(':method :url status - :status content-length - :res[content-length] time - :response-time ms'));
app.use(bodyParser.json());

const mapGenerator = ()=>{
    const grid: string[][] = []
    for (let i = 0; i < 15; i++) {
        grid[i] = []
        for (let j = 0; j < 15; j++) {
            const random = Math.round(Math.random()*100)
            const cell = random < 65?'1':random < 85?'2':'3'
            grid[i].push(cell)
        }
    }
    return grid
}
const imgMap = {
    '1':`${process.cwd()}/dist/mapCellImg/grass.png`,
    '2':`${process.cwd()}/dist/mapCellImg/forest.png`,
    '3':`${process.cwd()}/dist/mapCellImg/mountain.png`,
}

app.get('/', (req, res)=>{
    const gameMap = new GameMap(mapGenerator, imgMap)
    const buffer = gameMap.getMap(50)
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': buffer.length
    });
    res.end(buffer);
})

app.listen(port, () => {
    console.log(`[Server]: Server is running at http://localhost:${port}`);
});