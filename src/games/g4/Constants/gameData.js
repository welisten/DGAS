import { plataformData } from "../../../constants/plataformData.js"

const gameData = {
    app: undefined, 
    isMute: true,
    isDarkMode: plataformData.isDarkMode,
    isPaused: false,
    isAccess: true,
    isClickable: false,
    isPlayingSound: false,
    lastAccText: '',
    mainScene: 'Preload', // current scene
    wereVLibrasActived: false
} 

window.gameData = gameData // RETIRAR DEPOIS


export{
    gameData
}