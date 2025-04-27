import { getDeviceWidth } from "./../javascript/getDeviceWidth.js";

// Aqui serão colocadas as variaveis que controlaram tamanhos importantes e que
//  São usados constatementes no Jogo


const defineGameSize = (windowWidthStr) => {
    if(!windowWidthStr || typeof windowWidthStr !== 'string'){
        return
    }

    let containerGame_width, containerGame_height;
    switch(windowWidthStr){
        case 'small':
            return

        case 'medium':
            containerGame_width = window.innerWidth * .58
            containerGame_height = window.innerHeight * .6
            return {containerGame_width, containerGame_height}
            
        case 'large':
            containerGame_width = 1050
            containerGame_height = 540
            return {containerGame_width, containerGame_height}
                
        default:
            break
    }
}               
let {containerGame_width, containerGame_height} = defineGameSize(getDeviceWidth());
         
const defineTitleScales = (windowWidthStr) => {
    if(!windowWidthStr || typeof windowWidthStr !== 'string'){
        return
    }
    let bgScale, logoScale, recScale;
    switch(windowWidthStr){
        case 'small':
            return

        case 'medium':
            bgScale = 0.47
            logoScale = 0.5
            recScale = 0.6

            return {bgScale, logoScale, recScale}
            
        case 'large':
            bgScale = 0.54
            logoScale = 0.65
            recScale = 0.6

            return {bgScale, logoScale, recScale}
                
        default:
            break
    }
}
let titleScales = defineTitleScales(getDeviceWidth())

const mapMain_Width     = 1760
const mapMain_Height    = 800

const l1Map_width   = 688
const l1Map_height  = 12096
 
const screen_width  = window.innerWidth - 20
const screen_height =  window.innerHeight - 20

const mapMain_scale     = 1.3
const l1Map_scale       = containerGame_width / l1Map_width
const character_scale   = 2.3

const transitionFadeDuration = 1000



export {
    screen_width,
    screen_height,
    mapMain_Width,  
    mapMain_Height,  
    containerGame_width, 
    containerGame_height,
    mapMain_scale,
    character_scale,
    l1Map_width,
    l1Map_height,
    l1Map_scale,
    transitionFadeDuration,
    titleScales

    // mapF1Width  
    // mapF1height  
}