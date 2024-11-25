const gameData = {
    isPreloadComplete: false,
    app: undefined, 
    isMute: false,
    isDarkMode: true,
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