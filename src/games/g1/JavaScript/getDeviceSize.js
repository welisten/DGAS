const getDeviceSice = () => {
    let height = window.innerHeight
    let width = window.innerWidth
    let result

    switch(true){
        case (width < 600 && height < 800):
            console.log("small")                         // Dispositivos móveis em modo retrato
            break;
            
        case (width < 600 && height >= 800):
            console.log("small-landscape")               // Dispositivos móveis em modo paisagem
            break;

        case (width >= 600 && width <= 1440 && height < 1080):
            console.log("medium")                        // Tablets ou telas intermediárias
            result = Math.floor(width * 0.35)
            
            return(result) 

        case (width > 1440 && height >= 900):
            console.log("large")                         // Desktops e telas grandes
            result = Math.floor(width * 0.26)
            
            return(result)

        default:
            console.log(`screen size unknown : width = ${width} - height = ${height}`)                      
    }
}

export{
    getDeviceSice
}