async function loadMappedImagesByEscope( escope = "", src_folder = ""){
    if(!escope && !src_folder) return console.error('Essa função necessita de pelo menos um parâmetro')

    try{
        const resposta = await fetch("javascript/mappedImages.json")

        if(!resposta.ok){
            throw new Error(`Erro ao carregar o arquivo: ${resposta.status}`)
        }
        const imagesObj = await resposta.json();
        console.log(imagesObj)
        const imagesEscoped = []
        for (let key in imagesObj){
            if(!src_folder){
                if(imagesObj[key].escope === escope ){
                    imagesEscoped.push(imagesObj[key])
                }
            } else {
                if(imagesObj[key].escope === escope && imagesObj[key].src_folder === src_folder){
                    imagesEscoped.push(imagesObj[key])
                }
            }
        }
        return imagesEscoped
    } catch(error){
        console.error('Não foi possível consultar as imagens mapeadas', error)
    }
}


export{
    loadMappedImagesByEscope
}