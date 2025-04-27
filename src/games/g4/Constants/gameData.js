import { platformData } from "../../../Constants/platformData.js"

const gameData = {
    app: undefined, 
    isMute: false,
    isDarkMode: platformData.isDarkMode,
    isPaused: false,
    isAccess: false,
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