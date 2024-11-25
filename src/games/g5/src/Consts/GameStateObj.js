let gameState = {
    Running: 'running',
    Finished: 'finished',
    isPaused: false,
    isPlayerAbleToMove: false,
    timer: 0,
    player_point: 'init',
    accessibleMotionControls: undefined,
    defaultMotionControls: undefined,
    explore: false,
    isExploreAble: false,
    General_songs_volume: 1,
    isDevelopersSignAble: false,
    isDevelopersSignOn: false,
    isGuapimirimSignAble: false,
    isTopInformationAble: false,
    isGuapimirimSignVisible: false,
    isTopInformationVisible: false,
    topInformationType: '',
    counter_cityMap: 0,// manter em 0
    developerSign_step: 0 // manter em 0
}

let playerState = {
    life: 3,
    isMoving: false,
    floor: 'floor_2',
    point_id: 2,
    lastPoint_id: undefined,
    point_x: undefined,
    point_y: undefined,
    targetID: undefined,
    targetY: undefined,
    targetX: undefined,
    isOnTarget: false,
    direction: undefined,
}

const userIterfaceState = {
    text: ''
}

function updateStates(){
    if(localStorage.getItem('gameState')){
        gameState = JSON.parse(localStorage.getItem('gameState'))
        if(localStorage.getItem('playerState')){
            playerState = JSON.parse(localStorage.getItem('playerState'))
        }
    }
}
export{
    gameState,
    playerState,
    userIterfaceState,
    updateStates
}