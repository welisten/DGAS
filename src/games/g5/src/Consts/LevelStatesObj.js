const level_data = {
    currentLevel: 0,
    hit: 0,
    lastLevel: undefined,
    nextLevel: 1,
    timer: 0,
    running: false,
    aux_controlDelay: 0,
    playerCollumn: 2,
    isPlayerOnChagingPosition: false
}

const levelStatesObj = {                                            // Antigo GameStatesObj
    currentLevel: level_data.currentLevel,
    Running: 'running',
    Finished: 'finished',
    Paused: 'paused',
    hasBegun: false,
    isRunning: level_data.running,
    isPaused: false,
    isFinished: false,
    isMapScrolling: false,
    hasMapScrolled: false
}

export {
    level_data,
    levelStatesObj
}