import {createCanvas, Image} from "canvas";

export class GameMap {
    private readonly mapGenerator: () => string[][];
    private imgMap: { [key: string]: string }
    private readonly grid: string[][]

    constructor(mapGenerator: () => string[][], imgMap: { [key: string]: string }) {
        this.mapGenerator = mapGenerator;
        this.imgMap = imgMap;
        this.grid = this.mapGenerator()
    }

    public getMap(cellWidth: number): Buffer {
        const canvasWidth =( (cellWidth+5)*this.grid[0].length) - 10
        const canvasHeight =((cellWidth+5)*this.grid.length)-10

        const canvas = createCanvas(canvasWidth, canvasHeight)
        const ctx = canvas.getContext('2d')

        ctx.fillStyle = 'white'
        ctx.fillRect(0,0,canvas.width, canvas.height)

        this.grid.forEach((row, index)=>{
            for (let i = 0; i < row.length;i++){
                const img = new Image()
                img.onload = () => ctx.drawImage(img, (cellWidth+5)*i, (cellWidth+5)*index, cellWidth, cellWidth)
                img.onerror = err => { throw err }
                img.src = this.imgMap[row[i]]
                console.log((cellWidth+5)*index )
            }
        })

        return canvas.toBuffer('image/png', {compressionLevel: 3, filters: canvas.PNG_FILTER_NONE});
    }
}