import { plataformData } from "../../../../constants/plataformData.js"

const gameData = {
    isPreloadComplete: false,
    intro: undefined, 
    score: undefined,
    isMute: false,
    isDarkMode: plataformData.isDarkMode,
    isScreenReaderActive: false,
    isLibrasActive: false,
    lastAccText: '',
    isPaused: false,
    lastLevel: 1,
    class: 'Preload'
}

export{
    gameData
}