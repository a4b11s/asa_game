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
        const gridPadding = cellWidth/15
        const canvasWidth = ((cellWidth + gridPadding) * this.grid[0].length) - gridPadding
        const canvasHeight = ((cellWidth + gridPadding) * this.grid.length) - gridPadding

        const canvas = createCanvas(canvasWidth, canvasHeight)
        const ctx = canvas.getContext('2d')

        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        this.grid.forEach((row, index) => {
            for (let i = 0; i < row.length; i++) {
                const imgX = (cellWidth + gridPadding) * i
                const imgY = (cellWidth + gridPadding) * index

                const img = new Image()
                img.onload = () => ctx.drawImage(img, imgX, imgY, cellWidth, cellWidth)
                img.onerror = err => {
                    throw err
                }
                img.src = this.imgMap[row[i]]
            }
        })

        return canvas.toBuffer('image/png', {compressionLevel: 3, filters: canvas.PNG_FILTER_NONE});
    }
}