const cloudinary =  require('cloudinary').v2
const fs = require('fs')
const path = require('path')
require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.CLOUND_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const assetsPath = './src/assets/imagens'
const jsonPath = './src/javascript/mappedImages.json'

// atualiza as imagens mapeadas
let mappedImages = {}
if(fs.existsSync(jsonPath)){
    mappedImages = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))
}
//função recursiva para varrer subpastas, retornando os arquivos e seus caminhos em um array
function catchFilesFromFolder(dir, base = ''){
    const files = []

    fs.readdirSync(dir).forEach((fName) => {
        const absolutPath = path.join(dir, fName)
        const relativePath = path.join(base, fName)
        const stats = fs.statSync(absolutPath)

        if(stats.isDirectory()){
            files.push(...catchFilesFromFolder(absolutPath, relativePath))
        } else if(stats.isFile()){
            files.push({ fName: fName, absolutePath: absolutPath, relativePath: relativePath.replace('/\\/g', '/') })
        }
    })
    return files
}

(async () => {
    const files = catchFilesFromFolder(assetsPath)

    for (const file of files){
        const fileName = file.fName
        const relativePath = file.relativePath

        if(mappedImages[fileName]){
            console.log(`⏩ - ${fileName} já foi enviado. Pulando...`)
            continue; // proxima interação
        }

        try{
            const replacedRelativePath = path.dirname(relativePath).replace(/\\/g, '/').replace(/\.$/, '')
            const result = await cloudinary.uploader.upload(file.absolutePath, {
                folder:`DGAS-Plataforma/${replacedRelativePath}`
            })

            const escope = replacedRelativePath.split('/').at(0)

            mappedImages[fileName] = {
                cloud_path: result.secure_url,
                fileName: fileName,
                escope: escope === "" ? "plataform" : escope,
                src_folder: replacedRelativePath.split('/').at(-1),
                relative_path: replacedRelativePath
            }
            console.log(`✅ ${relativePath} enviado com sucesso.`)
        } catch(error){
            console.error(`❌ Erro ao enviar ${relativePath}:`, error)
        }
    }
    fs.writeFileSync(jsonPath, JSON.stringify(mappedImages, null, 2))
    console.log('\n 📄 mapeamento salvo em mappedImages.json.')
})()
