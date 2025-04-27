const getDeviceWidth = () => {
    let height = window.innerHeight
    let width = window.innerWidth

    switch(true){
        case (width < 600 && height < 800):
            return "small"                         // Dispositivos móveis em modo retrato
            
        case (width < 600 && height >= 800):
            return "small-landscape"               // Dispositivos móveis em modo paisagem

        case (width >= 600 && width <= 1440 && height < 1080):
            return "medium"                        // Tablets ou telas intermediárias
            
        case (width > 1440 && height >= 900):
            return "large"                         // Desktops e telas grandes

        default:
            console.log(`screen size unknown : width = ${width} - height = ${height}`)                      
    }
}

export{
    getDeviceWidth
}