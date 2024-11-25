const titleSongs = {
    titleTheme: {
        key: 'title song',
        url: 'Assets/songs/musicG1.mp3',
        config:{
            volume: 1,
            rate: 1,
            loop: true
        }
    }
}
const mapMainSongs = {
    mapaMain_theme:{
        key: 'MapaMain_theme',
        url: 'Assets/songs/Protótipo 1.2 Audio 80Bpm Gmajor.mp3',
        config:{
            volume: 1,
            rate: 1,
            loop: true
        }

    }
}
const level1Songs = {
    footstepsOnWater:{
        key: 'footsteps on water',
        url: 'Assets/songs/footstepsOnWaterFast.mp3',
        config: {
            volume: 0.5,
            rate: 1.5,
            loop: true 
        }
    },
    waterfallSong:{
        key: 'waterfall 1',
        url: 'Assets/songs/waterfall2.ogg',
        config: {
            volume: 0.2,
            rate: 1,
            loop: true
        }
    },
    gameOver:{
        key: 'game over',
        url: 'Assets/songs/gameOver.mp3',
        config: {
            volume: 1,
            loop: false
        }
    },
    lifeAffected:{
        key: 'life affected',
        url: 'Assets/songs/lifeAffected.mp3',
        config: {
            volume: 0.4,
            loop: false
        }
    }
}


const KeyFootstepsOnWater = 'footsteps_on_water'
const URLFootstepsOnWater = 'Assets/songs/footstepsOnWaterFast.mp3'
const Config_footstepOnWater = {
    volume: 0,
    rate: 1.5,
    loop: true
}

const WaterfallKey = 'waterfall_1'
const WaterfallURL = 'Assets/songs/waterfall2.ogg'
const WaterfallConfig = {
    volume: 0.3,
    rate: 1,
    loop: true
}

const MusicG1Key = 'music_game1'
const MusicG1URL = 'Assets/songs/musicG1.mp3'
const MusicG1Config = {
    volume: 1,
    rate: 1,
    loop: true
}
const MMMusicKey = 'MapaMain_music'
const MMMusicURL = 'Assets/songs/Protótipo 1.2 Audio 80Bpm Gmajor.mp3'
const MMMusicConfig = {
    volume: 1,
    rate: 1,
    loop: true
}

export {

    titleSongs,
    mapMainSongs,
    level1Songs, 

    KeyFootstepsOnWater,
    URLFootstepsOnWater,
    Config_footstepOnWater,

    WaterfallKey,
    WaterfallURL,
    WaterfallConfig,
    
    MusicG1Key,
    MusicG1URL,
    MusicG1Config,

    MMMusicKey,
    MMMusicURL,
    MMMusicConfig,
}