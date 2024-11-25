const fs = require('fs-extra')

async function splitMap(inputFile, outputDir, chunkWidth, chunkHeight){
    const data = await fs.readFile(inputFile, 'utf-8')
    const mapData = JSON.parse(data)
    const mapWidth = mapData.width
    const mapHeight= mapData.height

    await fs.ensureDir(outputDir)

    for(let chunkX = 0; chunkX < mapWidth; chunkX += chunkWidth){
        for(let chunkY = 0; chunkY < mapHeight; chunkY += chunkHeight){
            const chunk = JSON.parse(JSON.stringify(mapData))
            chunk.width = chunkWidth
            chunk.height = chunkHeight

            chunk.layers.forEach(layer => {
                if(layer.data) {
                    const newLayerData = []
                    for(let y = 0; y < chunkHeight; y++){
                        for(let x = 0; x < chunkWidth; x++){
                            const globalX = chunkX + x
                            const globalY = chunkY + y
                            if(globalX < mapWidth && globalY < mapHeight){
                                const index = globalY * mapWidth + globalX
                                newLayerData.push(layer.data[index])
                            } else {
                                newLayerData.push(0)

                            }
                        }
                    }
                   layer.data = newLayerData 
                }
            })
            const chunkFileName = `${outputDir}/chunk_${chunkX / chunkWidth}_${chunkY / chunkHeight}.json`
            await fs.writeFile(chunkFileName, JSON.stringify(chunk))
            console.log(`Chunk Saved: ${chunkFileName}`)
        }
    }
}

const inputFile = 'dist/public/assets/map/fase_1_map_full.json'
const outputDir = 'dist/public/assets/map/chunk/level1'
const chunkWidth = 43
const chunkHeight = 63

splitMap(inputFile, outputDir, chunkWidth, chunkHeight)
    .then(() => console.log('Map splitting completed'))
    .catch( err => console.error(err))
