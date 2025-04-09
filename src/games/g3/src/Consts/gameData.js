// import { plataformData } from "../../../../constants/plataformData.js"

const plataformDarkMode = JSON.parse(localStorage.getItem('isDarkMode')) ?? false 
const gameData = {
    isPreloadComplete: false,
    intro: undefined, 
    score: undefined,
    isMute: false,
    isDarkMode: plataformDarkMode,
    isScreenReaderActive: false,
    isLibrasActive: false,
    isClickable: true,
    lastAccText: '',
    isPaused: false,
    lastLevel: 1,
    class: 'Preload',
    lastReadText: '',
    lastBtnTarget: undefined
}

export{
    gameData
}