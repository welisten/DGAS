// Scene (Cena) principal do Jogo

// import Phaser from "phaser";

// Scenes
import {mainUserInterface, level1} from '../Consts/SceneKeys.js'                                                // ATENCION

// Constants
import { mapMain_key, mapMain_URL, mapMain_tilesetObjConfig, mapMainLayers_ID, objectsLayers_keys}from '../Consts/MapKeys.js'
import { userCharacter_objConfig } from '../Consts/CharacterKeys.js'
import { mapMainSongs } from '../Consts/SongsKey.js'
import { mapMain_scale, character_scale, containerGame_height, containerGame_width } from '../Consts/Sizes.js'
import { character_velocity, character_AnimationFrameRate } from '../Consts/Difficulty.js'
import { userCharacter_animationsKey, lifeBart_animationsKey } from '../Consts/Animations.js'
import { lifeBar } from "../Consts/SpriteSheets.js";
import { colors } from '../Consts/Colors.js'

import { addToUIQueue } from "../Scenes/UI.js";

import { gameState, playerState, userIterfaceState, updateStates } from "../Consts/GameStateObj.js";
import { level_data } from "../Consts/LevelStatesObj.js";


export default class MapaMain extends Phaser.Scene
{
    constructor() {
        super({ key: 'mapaMain' });
        // this.score = 0; // Pontuação do jogo
    }

    preload(){
    //  Map
        this.load.tilemapTiledJSON(mapMain_key, mapMain_URL, null, Phaser.Tilemaps.TILLED_JSON)
        
        this.load.image(mapMain_tilesetObjConfig[0].key, mapMain_tilesetObjConfig[0].url, { frameWidth: 16 })
        this.load.image(mapMain_tilesetObjConfig[1].key, mapMain_tilesetObjConfig[1].url, { frameWidth: 16 })
        this.load.image(mapMain_tilesetObjConfig[2].key, mapMain_tilesetObjConfig[2].url, { frameWidth: 16 })
        this.load.image(mapMain_tilesetObjConfig[3].key, mapMain_tilesetObjConfig[3].url, { frameWidth: 16 })
        this.load.image(mapMain_tilesetObjConfig[4].key, mapMain_tilesetObjConfig[4].url, { frameWidth: 16 })
        this.load.image(mapMain_tilesetObjConfig[5].key, mapMain_tilesetObjConfig[5].url, { frameWidth: 16 })
        this.load.image(mapMain_tilesetObjConfig[6].key, mapMain_tilesetObjConfig[6].url, { frameWidth: 16 })
        this.load.image(mapMain_tilesetObjConfig[7].key, mapMain_tilesetObjConfig[7].url, { frameWidth: 16 })        
        this.load.image(mapMain_tilesetObjConfig[8].key, mapMain_tilesetObjConfig[8].url, { frameWidth: 16 })
    }
   
    init(){
        const gameCanvas = this.sys.game.canvas
        gameCanvas.id = 'jogo5_canvas'
        gameCanvas.style.border = `5px solid ${colors.main_color}`;
        gameCanvas.style.borderRadius = "20px"

        this.timerUi = 0
    }

    create()
    { 

        const initStrLength = 204
        this.sound.play(mapMainSongs.mapaMain_theme.key, {volume: gameState.General_songs_volume})


        const timeline_1 = this.add.timeline(
        [      // Compartimentalizar
            {
                at:0,
                run: () => this.cameras.main.fadeIn(1500, 0, 0, 0)
            },
            {
                at: 1500,
                run: () =>{
                    //203
                    let text_1 ='...Ola, seja Bemvindo ao Encantos da Floresta ! Essa é a cidade de Guapimirim, e será nela que nós teremos nossas aventuras\n'
                    addToUIQueue(text_1, 'justify')
                } 
            },
            {
                from: initStrLength * 50 + 500, // cada letra tem 50 milisegundos + 500 de gap
                run: () =>{ gameState.isPlayerAbleToMove = true } 
            }
        ])
        const map = this.make.tilemap({key: mapMain_key})
        
        const tile_1 = map.addTilesetImage(mapMain_tilesetObjConfig[0].name, mapMain_tilesetObjConfig[0].key, 16, 16)
        const tile_2 = map.addTilesetImage(mapMain_tilesetObjConfig[1].name, mapMain_tilesetObjConfig[1].key, 16, 16)
        const tile_3 = map.addTilesetImage(mapMain_tilesetObjConfig[2].name, mapMain_tilesetObjConfig[2].key, 16, 16)
        const tile_4 = map.addTilesetImage(mapMain_tilesetObjConfig[3].name, mapMain_tilesetObjConfig[3].key, 16, 16)
        const tile_5 = map.addTilesetImage(mapMain_tilesetObjConfig[4].name, mapMain_tilesetObjConfig[4].key, 16, 16)
        const tile_6 = map.addTilesetImage(mapMain_tilesetObjConfig[5].name, mapMain_tilesetObjConfig[5].key, 16, 16)
        const tile_7 = map.addTilesetImage(mapMain_tilesetObjConfig[6].name, mapMain_tilesetObjConfig[6].key, 16, 16)
        const tile_8 = map.addTilesetImage(mapMain_tilesetObjConfig[7].name, mapMain_tilesetObjConfig[7].key, 16, 16)
        const tile_9 = map.addTilesetImage(mapMain_tilesetObjConfig[8].name, mapMain_tilesetObjConfig[8].key, 16, 16)
        
        const tilesArray = [tile_1, tile_2, tile_3, tile_4, tile_5, tile_6, tile_7, tile_8, tile_9]
        
        this.layer_ground       =  map.createLayer(mapMainLayers_ID.layer1, tilesArray, 0, 0).setScale(mapMain_scale)
        this.layer_levels       =  map.createLayer(mapMainLayers_ID.layer2, tilesArray, 0, 0).setScale(mapMain_scale)
        this.layer_trunksRoots  =  map.createLayer(mapMainLayers_ID.layer3, tilesArray, 0, 0).setScale(mapMain_scale)
        this.layer_train        =  map.createLayer(mapMainLayers_ID.layer4, tilesArray, 0, 0).setScale(mapMain_scale)
        this.layer_floor1       =  map.createLayer(mapMainLayers_ID.layer5, tilesArray, 0, 0).setScale(mapMain_scale)
        this.layer_fence        =  map.createLayer(mapMainLayers_ID.layer6, tilesArray, 0, 0).setScale(mapMain_scale)
        this.layer_vegetationf1 =  map.createLayer(mapMainLayers_ID.layer7, tilesArray, 0, 0).setScale(mapMain_scale)
        this.layer_floor2       =  map.createLayer(mapMainLayers_ID.layer8, tilesArray, 0, 0).setScale(mapMain_scale)
        this.layer_treetops1    =  map.createLayer(mapMainLayers_ID.layer9, tilesArray, 0, 0).setScale(mapMain_scale)
        this.layer_shadowsf2    =  map.createLayer(mapMainLayers_ID.layer10, tilesArray, 0, 0).setScale(mapMain_scale)
        this.layer_vegetationf2 =  map.createLayer(mapMainLayers_ID.layer11, tilesArray, 0, 0).setScale(mapMain_scale)
        this.layer_buildingsf2  =  map.createLayer(mapMainLayers_ID.layer12, tilesArray, 0, 0).setScale(mapMain_scale)
        
        this.cameras.main.setBounds(0, 0, (map.widthInPixels * mapMain_scale), (map.heightInPixels * mapMain_scale), true) // limites da camera
        this.physics.world.setBounds(0, 0, (map.widthInPixels * mapMain_scale), (map.heightInPixels * mapMain_scale))

        this.scene.run(mainUserInterface)
        this.scene.bringToTop(mainUserInterface)
        let idInit = undefined

        if( !localStorage.getItem('lastPoint')){                   //   PRIMEIRA VEZ JOGANDO                         
            timeline_1.play()
            gameState.isPlayerAbleToMove = false
            idInit = 2
            localStorage.setItem('lastPoint', 2)

        } else {                                                   //   NÃO É A PRIMEIRA VEZ JOGANDO
            updateStates()

            idInit = this.getOnStorage('lastPoint')

            playerState.point_id = this.getOnStorage('lastPoint')
            level_data.hit = this.getOnStorage('playerLife')
            playerState.point_x = this.getObjectById(playerState.point_id).x * mapMain_scale 
            playerState.point_y = this.getObjectById(playerState.point_id).y * mapMain_scale
            playerState.targetID = undefined 
            playerState.targetX = undefined
            playerState.targetY = undefined
            gameState.counter_cityMap = 0
            gameState.developerSign_step = 0
        }

        const initPoint = this.getObjectById(idInit) 
        
        gameState.isPlayerAbleToMove = true                                      
        gameState.defaultMotionControls = false
        gameState.accessibleMotionControls = true
        
        this.createAllNeededAnimation()
        
        this.player = this.physics.add.sprite( Math.floor(initPoint.x * mapMain_scale), Math.floor(initPoint.y * mapMain_scale), userCharacter_objConfig.down.manDown_key).setDepth(2).setScale(character_scale)
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(4, 4)
        
        if(localStorage.getItem('lastPoint')){
            this.setLayersDepth(this.getPlayerFloor())
        }
        
        playerState.point_x = this.player.x
        playerState.point_y = this.player.y

        this.cameras.main.startFollow(this.player) // configurando posicionamento da camera
        this.cursor = this.input.keyboard.createCursorKeys() 
        
        //----------------------       MAP OBJECTS       -----------------------
        const mapObjects = map.getObjectLayer(objectsLayers_keys.MapaMainLayer_obj1)['objects']

        mapObjects.forEach(object => {
            switch(object.name){
                case 'decision_break':
                    if(object.id != 2)
                    {
                        const circle = this.add.circle(Math.round(object.x * mapMain_scale), Math.round(object.y * mapMain_scale), .5).setOrigin(0)

                        this.physics.add.existing(circle, true)
                        this.physics.add.overlap(this.player, circle, () => {

                            if(playerState.point_id == object.id)
                            {
                                // console.log('deu ruin')
                                return    
                            }
                            
                            if(object.id == 308 && gameState.developerSign_step != 0){
                                gameState.developerSign_step = 0
                            } 
                            
                        
                            if(this.isCompletelyInside(circle, this.player))
                            {   
                                playerState.point_id = object.id
                                if(object.id == 327 || object.id == 328 || object.id == 329 || object.id == 330){
                                    if(gameState.accessibleMotionControls === true){
                                        accessible_btn.classList.remove('active')

                                        gameState.isExploreAble = true
                                        gameState.accessibleMotionControls = false
                                        gameState.defaultMotionControls = true
                                        gameState.explore = true
                                        document.querySelector('.textBody').innerHTML = `<p>CG_width: ${containerGame_width}</p><p>CG_height: ${containerGame_height}</p>`

                                        this.player.body.setSize((10 * mapMain_scale), (16 * mapMain_scale))
                                        //MODO EXPLORAÇÃO ATIVADO   
                                    }
                                }
                                switch(playerState.direction)
                                {
                                    case('up'):
                                        this.player.y += 1
                                        break

                                    case('down'):
                                        this.player.y += 4
                                        break

                                    case('left'):
                                        this.player.x += 1
                                        break

                                    case('right'):
                                        this.player.x += 4
                                        break
                                    
                                    default:
                                        break
                                }
                            
                                if (object.id == playerState.targetID)
                                {
                                    this.player.setVelocity(0, 0);
                                    playerState.isMoving = false;
                                    playerState.direction = undefined

                                    this.player.anims.stop()
                                    return
                                }
                                else
                                {
                                    this.player.setVelocity(0, 0);
                                    this.defineRoute()
                                }
                            }
                        })   
                    } 
                    break                
                
                case 'explore':
                    const recExplore = this.add.rectangle(object.x * mapMain_scale, object.y * mapMain_scale, object.width * mapMain_scale, object.height * mapMain_scale)
                    recExplore.setOrigin(0)
                    
                    this.physics.add.existing(recExplore, true)
                    this.physics.add.overlap(this.player, recExplore, () => {
                        if(gameState.explore){
                            accessible_btn.classList.add('active')
        
                            gameState.accessibleMotionControls = true
                            gameState.defaultMotionControls = false
                            gameState.isExploreAble = true
                            
                            this.player.body.setSize(4, 4)

                            const target = this.getObjectById(object.properties[0].value)
                            console.log(target.y * mapMain_scale)
                            let auxTweens = 0
                            switch(this.player.anims.currentAnim.key){
                                case 'walk up':
                                    // TWEENS
                                    if(auxTweens == 0 ){
                                        auxTweens++
                                        gameState.explore = false
                                        this.player.play({key: userCharacter_animationsKey.walk_up.key, repeat: 1}, false)
                                        
                                        const tweens_walkUp =  this.tweens.add({
                                            targets: this.player,
                                            y: playerState.targetY,
                                            duration: 500,
                                            ease: 'Linear',
                                            onComplete: () => {
                                                tweens_walkUp.destroy()
                                                this.player.y = playerState.targetY
                                                if(this.player.x < Math.floor(target.x * mapMain_scale)){
                                                    this.player.play({key: userCharacter_animationsKey.walk_right.key, repeat: 1}, true)
                                                }else{
                                                    this.player.play({key: userCharacter_animationsKey.walk_left.key, repeat: 1}, true)
                                                }
                                                const tweens_walkRight = this.tweens.add({
                                                    targets: this.player,
                                                    y: playerState.targetY,
                                                    x: Math.floor(target.x * mapMain_scale),
                                                    duration: 750,
                                                    ease: 'Linear',
                                                    onComplete:() => {
                                                        tweens_walkRight.destroy()
                                                        gameState.isPlayerAbleToMove = false
                                                        auxTweens = 0
                                                        playerState.targetID = target.id
                                                        playerState.targetX = Math.floor(target.x * mapMain_scale)
                                                        playerState.targetY = Math.floor(target.y * mapMain_scale)
                                                        this.player.play({key: userCharacter_animationsKey.walk_down.key, repeat: 0}, true)


                                                        this.time.addEvent({
                                                            delay: 1200,
                                                            callback: () => gameState.isPlayerAbleToMove = true,
                                                            loop: false
                                                        })
                                                    }
                                                }).play()
                                            },
                                            repeat: 0,
                                            yoyo: false
                                        }).play()
                                    }
                                break

                                case 'walk down':
                                    // TWEENS
                                    if(auxTweens == 0 ){
                                        auxTweens++
                                        gameState.explore = false
                                        this.player.play({key: userCharacter_animationsKey.walk_down.key, repeat: 1}, false)
                                        
                                        const tweens_walkDown =  this.tweens.add({
                                            targets: this.player,
                                            y: playerState.targetY,
                                            duration: 500,
                                            ease: 'Linear',
                                            onComplete: () => {
                                                tweens_walkDown.destroy()
                                                this.player.y = playerState.targetY
                                                if(this.player.x < Math.floor(target.x * mapMain_scale)){
                                                    this.player.play({key: userCharacter_animationsKey.walk_right.key, repeat: 1}, true)
                                                }else{
                                                    this.player.play({key: userCharacter_animationsKey.walk_left.key, repeat: 1}, true)
                                                }                                                
                                                const tweens_walkLeft = this.tweens.add({
                                                    targets: this.player,
                                                    y: playerState.targetY,
                                                    x: Math.floor(target.x * mapMain_scale),
                                                    duration: 750,
                                                    ease: 'Linear',
                                                    onComplete:() => {
                                                        tweens_walkLeft.destroy()
                                                        gameState.isPlayerAbleToMove = false
                                                        auxTweens = 0
                                                        playerState.targetID = target.id
                                                        playerState.targetX = Math.floor(target.x * mapMain_scale)
                                                        playerState.targetY = Math.floor(target.y * mapMain_scale)
                                                        this.player.play({key: userCharacter_animationsKey.walk_down.key, repeat: 0}, true)

                                                        this.time.addEvent({
                                                            delay: 1200,
                                                            callback: () => gameState.isPlayerAbleToMove = true,
                                                            loop: false
                                                        })
                                                    }
                                                }).play()
                                            },
                                            repeat: 0,
                                            yoyo: false
                                        }).play()
                                    }
                                    break

                                case 'walk left':
                                    if(auxTweens == 0 ){
                                        auxTweens++
                                        gameState.explore = false
                                        if(this.player.y < Math.floor(target.y * mapMain_scale)){
                                            this.player.play({key: userCharacter_animationsKey.walk_down.key, repeat: 1}, true)
                                        }else{
                                            this.player.play({key: userCharacter_animationsKey.walk_up.key, repeat: 1}, true)
                                        } 
                                        
                                        const tweens_walkHorizontaly =  this.tweens.add({
                                            targets: this.player,
                                            y:  Math.floor(target.y * mapMain_scale),
                                            x: this.player.x,
                                            duration: 250,
                                            ease: 'Linear',
                                            onComplete: () => {
                                                tweens_walkHorizontaly.destroy()
                                                if(this.player.x < Math.floor(target.x * mapMain_scale)){
                                                    this.player.play({key: userCharacter_animationsKey.walk_right.key, repeat: 1}, true)
                                                }else{
                                                    this.player.play({key: userCharacter_animationsKey.walk_left.key, repeat: 1}, true)
                                                }                                                
                                                const tweens_walkVerticaly = this.tweens.add({
                                                    targets: this.player,
                                                    x: Math.floor(target.x * mapMain_scale),
                                                    y: this.player.y,
                                                    duration: 750,
                                                    ease: 'Linear',
                                                    onComplete:() => {
                                                        tweens_walkVerticaly.destroy()
                                                        gameState.isPlayerAbleToMove = false
                                                        auxTweens = 0
                                                        playerState.targetID = target.id
                                                        playerState.targetX = Math.floor(target.x * mapMain_scale)
                                                        playerState.targetY = Math.floor(target.y * mapMain_scale)
                                                        this.player.play({key: userCharacter_animationsKey.walk_down.key, repeat: 0}, true)

                                                        this.time.addEvent({
                                                            delay: 1200,
                                                            callback: () => gameState.isPlayerAbleToMove = true,
                                                            loop: false
                                                        })
                                                    }
                                                }).play()
                                            },
                                            repeat: 0,
                                            yoyo: false
                                        }).play()
                                    }

                                    // gameState.explore = false
                                    // playerState.targetID = target.id
                                    // playerState.targetX = Math.floor(target.x * mapMain_scale)
                                    // this.player.y = playerState.targetY
                                    // playerState.targetY = Math.floor(target.y * mapMain_scale)
                                    // gameState.isPlayerAbleToMove = false
                                    // this.player.play({key: userCharacter_animationsKey.walk_left.key, repeat: 1}, false)
                                break

                                case 'walk right':
                                    if(auxTweens == 0 ){
                                        auxTweens++
                                        gameState.explore = false
                                        if(this.player.y < Math.floor(target.y * mapMain_scale)){
                                            this.player.play({key: userCharacter_animationsKey.walk_down.key, repeat: 1}, true)
                                        }else{
                                            this.player.play({key: userCharacter_animationsKey.walk_up.key, repeat: 1}, true)
                                        } 
                                        
                                        const tweens_walkHorizontaly =  this.tweens.add({
                                            targets: this.player,
                                            y:  Math.floor(target.y * mapMain_scale),
                                            x: this.player.x,
                                            duration: 250,
                                            ease: 'Linear',
                                            onComplete: () => {
                                                tweens_walkHorizontaly.destroy()
                                                if(this.player.x < Math.floor(target.x * mapMain_scale)){
                                                    this.player.play({key: userCharacter_animationsKey.walk_right.key, repeat: 1}, true)
                                                }else{
                                                    this.player.play({key: userCharacter_animationsKey.walk_left.key, repeat: 1}, true)
                                                }                                                
                                                const tweens_walkVerticaly = this.tweens.add({
                                                    targets: this.player,
                                                    x: Math.floor(target.x * mapMain_scale),
                                                    y: this.player.y,
                                                    duration: 750,
                                                    ease: 'Linear',
                                                    onComplete:() => {
                                                        tweens_walkVerticaly.destroy()
                                                        gameState.isPlayerAbleToMove = false
                                                        auxTweens = 0
                                                        playerState.targetID = target.id
                                                        playerState.targetX = Math.floor(target.x * mapMain_scale)
                                                        playerState.targetY = Math.floor(target.y * mapMain_scale)
                                                        this.player.play({key: userCharacter_animationsKey.walk_down.key, repeat: 0}, true)

                                                        this.time.addEvent({
                                                            delay: 1200,
                                                            callback: () => gameState.isPlayerAbleToMove = true,
                                                            loop: false
                                                        })
                                                    }
                                                }).play()
                                            },
                                            repeat: 0,
                                            yoyo: false
                                        }).play()
                                    }
                                break
                            }
                        }
                    })
                break
                
                case 'developers':
                    const recDev = this.add.rectangle((object.x * mapMain_scale), (object.y * mapMain_scale), (object.width * mapMain_scale), (object.height * mapMain_scale)).setDisplayOrigin(0)
                    this.physics.add.existing(recDev, true)
                    this.physics.add.overlap(this.player, recDev, () => {
                        if(!gameState.isDevelopersSignAble && gameState.developerSign_step == 0){

                            gameState.isDevelopersSignAble = true
                            gameState.developerSign_step++
                        }
                    })
                break

                case 'save_point':

                    const recSave = this.add.rectangle((object.x * mapMain_scale), (object.y * mapMain_scale), (object.width * mapMain_scale), (object.height * mapMain_scale)).setDisplayOrigin(0).setDepth(10)
                    this.physics.add.existing(recSave, true)
                    this.physics.add.overlap(this.player, recSave, () => {

                        if(this.getOnStorage('lastPoint') != object.properties[0].value){
                            // console.log(this.getOnStorage('lastPoint'), object.properties[0].value)
                            playerState.lastPoint_id = object.properties[0].value
                            playerState.isMoving = false

                            localStorage.setItem('lastPoint', JSON.stringify(object.properties[0].value))
                            localStorage.setItem('gameState', JSON.stringify(gameState))
                            localStorage.setItem('playerState', JSON.stringify(playerState))
                            if(this.getOnStorage('playerLife') != level_data.hit){
                                localStorage.setItem('playerLife', JSON.stringify(level_data.hit))
                            }
                        }
                    
                    })
                    break

                case 'level':
                    let hasOverlapOccurred = false
                    
                    const rec = this.add.rectangle((object.x * mapMain_scale), (object.y * mapMain_scale), (object.width * mapMain_scale), (object.height * mapMain_scale)).setDisplayOrigin(0)
                    
                    this.physics.add.existing(rec, true)
                    this.physics.add.overlap(rec, this.player, () => {
                        if(!hasOverlapOccurred)
                        {
                            let player_half         = this.player.x - this.player.width / 2
                            let player_other_half   = this.player.x + this.player.width / 2
                            let isPlayerCompletelyInside  = player_half > rec.x && player_other_half  < rec.x + rec.width
                            
                            if(isPlayerCompletelyInside)
                            {
                                if(object.properties[0].value <= JSON.parse(this.getOnStorage('currentLevel'))){                       //DATA

                                    return
                                }
                                hasOverlapOccurred = true
                                gameState.isPlayerAbleToMove = false
                                this.sendStringToUI('')
                                
                                this.time.addEvent({
                                    delay: 500,
                                    callback: () => {
                                        this.song
                                        this.transitToNewScene(level1)
                                        this.time.delayedCall(1000, () => gameState.isPlayerAbleToMove = true)
                                    },
                                    loop: false
                                })
                            }
                        }
                    })
                    break   

                case 'info':
                    const recInfo = this.add.rectangle((object.x * mapMain_scale), (object.y * mapMain_scale), (object.width * mapMain_scale), (object.height * mapMain_scale)).setDisplayOrigin(0)
                    this.physics.add.existing(recInfo, true)
                    this.physics.add.overlap(recInfo, this.player, () => this.onInfoElementsOverlap(object))
                    break
                
                case 'fence':
                    const recFence = this.add.rectangle((object.x * mapMain_scale), (object.y * mapMain_scale), (object.width * mapMain_scale), (object.height * mapMain_scale)).setDisplayOrigin(0).setDepth(10)
                    this.physics.add.existing(recFence, true)
                    this.physics.add.collider(this.player, recFence)
                    break

                case 'cityMap':
                    const CityMap_point =  object

                    const recX = CityMap_point.x * mapMain_scale
                    const recY = CityMap_point.y * mapMain_scale
                    const recW = CityMap_point.width * mapMain_scale
                    const recH = CityMap_point.height * mapMain_scale 
                    
                    const recCityMap = this.add.rectangle(recX, recY, recW, recH).setOrigin(0)
                            
                    this.physics.add.existing(recCityMap, true)
                    this.physics.add.overlap(this.player, recCityMap, () => {
                        if(!gameState.isTopInformationAble && gameState.counter_cityMap == 0){
                            gameState.isTopInformationAble = true
                            gameState.topInformationType = 'CityMap'
                            gameState.counter_cityMap++
                        }
        })
                    break

                default:
                    if(object.rectangle){
                        const objRec = this.add.rectangle((object.x * mapMain_scale), (object.y * mapMain_scale), (object.width * mapMain_scale), (object.height * mapMain_scale)).setDisplayOrigin(0).setDepth(10)
                        this.physics.add.existing(objRec, true)
                        this.physics.add.collider(this.player, objRec)
                        
                     }else if(object.ellipse){
                         const objEllips = this.add.circle((object.x * mapMain_scale), (object.y * mapMain_scale), (object.height * mapMain_scale / 2)).setOrigin(0)
                         this.physics.add.existing(objEllips, true)
                         this.physics.add.collider(this.player, objEllips)
                    }
                    break
            }
        })
        
        //----------------------       DOM        -----------------------
        const accessible_btn = document.getElementById('alternativeMovements')
        const mute_btn = document.getElementById('mute')
        
        accessible_btn.onclick = () => {
            this.player.setVelocity(0, 0)
            playerState.isMoving = false

            this.player.anims.stop()
            if(accessible_btn.classList.contains('active')) { // Default
                accessible_btn.classList.remove('active')

                gameState.accessibleMotionControls = false
                gameState.defaultMotionControls = true
            }else{                                            // Acessible

                if(playerState.lastPoint_id){
                    let x = this.getObjectById(playerState.lastPoint_id).x * mapMain_scale
                    let y = this.getObjectById(playerState.lastPoint_id).y * mapMain_scale
                    
                    updateStates()
                    this.player.x = x
                    this.player.y = y
                    this.player.play({key: userCharacter_animationsKey.walk_down.key, repeat: 0}, true)

                    gameState.accessibleMotionControls = true
                    gameState.defaultMotionControls = false
                }

                accessible_btn.classList.add('active')
            }            
            
        }

        mute_btn.onclick = () => {
            mute_btn.classList.toggle('active')

            const icone = document.querySelector("#mute_icon")

            icone.classList.toggle('fa-volume-high')
            icone.classList.toggle('fa-volume-xmark')
            
            if(this.sound.volume == 1)
            {
                this.sound.volume = 0
            } 
            else
            {
                this.sound.volume = 1
            }
        }

    }

    update() {
        document.querySelector('.textBody').innerHTML = `<p>DEV_STEP:  ${gameState.developerSign_step}</p><p>DEV ABLE:  ${gameState.isDevelopersSignAble}</p>`
        if(gameState.accessibleMotionControls) 
        {
            this.alternativeCharacterMoveControl()   
        }

        if(gameState.defaultMotionControls)
        {
            this.handleMainCharacterMovements()
        }

        if(gameState.isTopInformationVisible && !gameState.isGuapimirimSignAble){ // caso space -> mostrar mapa
            if(this.cursor.space.isDown)
            {
                gameState.isGuapimirimSignAble = true
                gameState.isTopInformationVisible = false
            }
        }
         
        if(playerState.floor != this.getPlayerFloor())
        {
            this.setLayersDepth(this.getPlayerFloor())    
        }

        if(gameState.isDevelopersSignAble) this.darkenScreen()
    }
    darkenScreen(){
        if(!gameState.isDevelopersSignOn){
            this.cameras.main.fadeOut(1000, 0, 0, 0); // Fade para preto em 1 segundo
        }else if(gameState.developerSign_step == 2){
            this.cameras.main.fadeFrom(1000,0, 0, 0)

            gameState.developerSign_step++ // encerra o fluxo
            gameState.isDevelopersSignOn = false
            gameState.isDevelopersSignAble = false
        }
    }

    sendStringToUI(string){
        userIterfaceState.text = string
    }

    getObjectById(objectId) {
        const objectLayer = this.make.tilemap({key: mapMain_key}).getObjectLayer(objectsLayers_keys.MapaMainLayer_obj1)
        if (!objectLayer) 
        {
            console.error("Camada de objetos não encontrada.");                                                         //    O-O
            return null;
        }
        
        let object = objectLayer.objects.find(obj => obj.id === objectId);
        return object;
    }

    handleMainCharacterMovements(){
        if(gameState.isPlayerAbleToMove)
        {
            if(this.cursor.up.isDown)
            {
                this.player.key = userCharacter_objConfig.up.manUp_key
                this.player.play({key: userCharacter_animationsKey.walk_up.key, repeat: 0}, true)
                this.player.setVelocity(0, -character_velocity)        
            }
            else if (this.cursor.down.isDown)
            {
                this.player.key = userCharacter_objConfig.down.manDown_key
                this.player.play(userCharacter_animationsKey.walk_down.key, true)
                this.player.setVelocity(0, character_velocity)        
            }
            else if( this.cursor.left.isDown )
            {   
                this.player.key =  userCharacter_objConfig.left.manLeft_key
                this.player.play(userCharacter_animationsKey.walk_left.key, true)
                this.player.setVelocity(-character_velocity, 0)        
            }
            else if (this.cursor.right.isDown)
            {
                this.player.key = userCharacter_objConfig.right.manRight_key
                this.player.play(userCharacter_animationsKey.walk_right.key, true)
                this.player.setVelocity(character_velocity, 0)        
            }else{
                this.player.setVelocity(0)
            }


            if(!this.isScrolling && this.cursor.up.isDown)
            {
                this.player.key = userCharacter_objConfig.up.manUp_key
                this.player.play({key: userCharacter_animationsKey.walk_up.key, repeat: 0}, true)
                this.player.setVelocityY(-100)        
            } 
            else if(!this.isScrolling && this.cursor.down.isDown)
            {
                this.player.key = userCharacter_objConfig.down.manDown_key
                this.player.play(userCharacter_animationsKey.walk_down.key, true)
                this.player.setVelocityY(100)        
            }
        }
        else
        {
            this.player.setVelocity(0)
        }
    }
     
    createAllNeededAnimation() {
        const ManWalkUpConfig = {
            key: userCharacter_animationsKey.walk_up.key,
            frames: this.anims.generateFrameNumbers(userCharacter_objConfig.up.manUp_key, {frame: [0, 1, 2, 3]}),
            frameRate: character_AnimationFrameRate, 
            repeat: 0,
        }
        this.anims.create(ManWalkUpConfig)
        
        const ManWalkLeftConfig = {
            key: userCharacter_animationsKey.walk_left.key,
            frames: this.anims.generateFrameNumbers(userCharacter_objConfig.left.manLeft_key, {frame: [0, 1, 2, 3]}),
            frameRate: character_AnimationFrameRate,
            repeat: 0,
        }
        this.anims.create(ManWalkLeftConfig)
        
        const ManWalkRightConfig = {
            key: userCharacter_animationsKey.walk_right.key,
            frames: this.anims.generateFrameNumbers(userCharacter_objConfig.right.manRight_key, {frame: [0, 1, 2, 3]}),
            frameRate: character_AnimationFrameRate,
            repeat: 0,
        }
        this.anims.create(ManWalkRightConfig)

        const ManWalkDownConfig = {
            key: userCharacter_animationsKey.walk_down.key,
            frames: this.anims.generateFrameNumbers(userCharacter_objConfig.down.manDown_key, {frame: [0, 1, 2, 3]}),
            frameRate: character_AnimationFrameRate, 
            repeat: 0,
        }
        this.anims.create(ManWalkDownConfig)


        const heartFull = {
            key: lifeBart_animationsKey.heart_full.key,
            frames: this.anims.generateFrameNumbers(lifeBar.lifeBar_key, {start: 4, end: 0}),
            frameRate: 5, 
            repeat: 0,
        }
        this.anims.create(heartFull)

        const heartHalf = {
            key: lifeBart_animationsKey.heart_half.key,
            frames: this.anims.generateFrameNumbers(lifeBar.lifeBar_key, {start: 0, end: 2}),
            frameRate: 3, 
            repeat: 0
        }
        this.anims.create(heartHalf)

        const heartEmpty = {
            key: lifeBart_animationsKey.heart_empty.key,
            frames: this.anims.generateFrameNumbers(lifeBar.lifeBar_key, {start: 2, end: 4}),
            frameRate: 3, 
            repeat: 0
        }
        this.anims.create(heartEmpty)
    } 
    
    getPlayerFloor(x = this.player.x, y = this.player.y){
        const upEdge      = 321 * mapMain_scale 
        const downEdge    = 559 * mapMain_scale
        const leftEdge    = 770 * mapMain_scale
        const rightEdge   = 1248 * mapMain_scale

        if(this.player.x > leftEdge && this.player.x < rightEdge && this.player.y > upEdge && this.player.y < downEdge)
        {
            // O player está no SEGUNDO andar
            return 'floor_2'
        } 
        else 
        {
            // O player está no PRIMEIRO andar
            return 'floor_1'
        }
    }

    setLayersDepth(data){
        if(data == 'floor_1')
        {
            this.layer_ground.setDepth(0)
            this.layer_levels.setDepth(0)
            this.layer_trunksRoots.setDepth(0)
            this.layer_train.setDepth(0)
            this.layer_floor1.setDepth(0)
            this.layer_fence.setDepth(0)
            this.layer_vegetationf1.setDepth(3)
            this.layer_floor2.setDepth(3)
            this.layer_treetops1.setDepth(3)
            this.layer_shadowsf2.setDepth(3);
            this.layer_vegetationf2.setDepth(3)
            this.layer_buildingsf2.setDepth(3)

            this.player.setDepth(2)
            playerState.floor = 'floor_1'
        }
        else if(data == 'floor_2')
        {
            this.layer_ground.setDepth(0)
            this.layer_levels.setDepth(0)
            this.layer_trunksRoots.setDepth(0)
            this.layer_train.setDepth(0)
            this.layer_floor1.setDepth(1)
            this.layer_fence.setDepth(1)
            this.layer_vegetationf1.setDepth(1)
            this.layer_floor2.setDepth(1)
            this.layer_treetops1.setDepth(3)
            this.layer_shadowsf2.setDepth(1)
            this.layer_vegetationf2.setDepth(1)
            this.layer_buildingsf2.setDepth(3)

            this.player.setDepth(2)
            playerState.floor = 'floor_2'
        }
    }

    onInfoElementsOverlap(element){
        if(element.properties[1].value == 'placa')
        {
            this.sendStringToUI(element.properties[0].value)
        }
    }

    transitToNewScene(newSceneKey) {
        this.cameras.main.fadeOut(1000, 0, 0, 0); // Fade para preto em 1 segundo
    
        this.cameras.main.once('camerafadeoutcomplete', (camera) => {
          this.scene.start(newSceneKey);
        })
    }

    alternativeCharacterMoveControl(){
        if(gameState.isPlayerAbleToMove){
            if(this.cursor.up.isDown & !playerState.isMoving)      // UP
            {   
//              Ajusta a localização do personagem no sentido da direção para criar uma contingência.
//              (dependendo da velocidade, numeros decimais podem vazar gerando erro depois de um tempo)
                this.player.y = Math.floor(this.player.y)
                
//              Identificar o ponto relativo a direção
                const current_Point =  this.getObjectById(playerState.point_id)
                const up_propertie = current_Point.properties.find(obj => obj.name === 'up')

//              Assegurar que existe caminho pela referida direção                
                if(!up_propertie.value){
                    console.error("caminho inexistente ! você está se equivocando")
                    return
                }

//              Resgata o ponto alvo e atualiza as coordenadas do alvo no obj de controle do jogador               
                const next_Point = this.getObjectById(up_propertie.value)

                playerState.targetX = Math.floor(next_Point.x * mapMain_scale) 
                playerState.targetY = Math.floor(next_Point.y * mapMain_scale)
                playerState.targetID = up_propertie.value
//              Dispara o personagem na direção desejada usando a respectiva animação
                this.player.key = userCharacter_objConfig.up.manUp_key
                this.player.play({key: userCharacter_animationsKey.walk_up.key, repeat: -1}, true)
                this.player.setVelocity(0, -character_velocity)
                
//              Atualiza o estado do personagem em: "movimentando" e "direção"
                playerState.isMoving = true 
                playerState.direction = 'up'

            }
            else if(this.cursor.down.isDown & !playerState.isMoving)       // DOWN
            {
                this.player.y = Math.floor(this.player.y)

                const current_point =  this.getObjectById(playerState.point_id)
                const down_propertie = current_point.properties.find(obj => obj.name === 'down')
                
                if(!down_propertie.value){
                    // console.log("caminho inexistente ! você está se equivocando")
                    return
                }

                const next_Point = this.getObjectById(down_propertie.value)

                playerState.targetX = Math.floor(next_Point.x * mapMain_scale) 
                playerState.targetY = Math.floor(next_Point.y * mapMain_scale)
                playerState.targetID = down_propertie.value
                
                this.player.key = userCharacter_objConfig.down.manDown_key
                this.player.play({key: userCharacter_animationsKey.walk_down.key, repeat: -1}, true)
                this.player.setVelocity(0, character_velocity)

                playerState.isMoving = true 
                playerState.direction = 'down'

                // console.log(`atual: ${playerState.point_id}   proximo:${playerState.targetID}\nplayer.x: ${this.player.x} alvo: ${playerState.targetX}\nplayer.y: ${this.player.y} alvo: ${playerState.targetY}`)
               
            }
            else if(this.cursor.left.isDown & !playerState.isMoving)       // LEFT
            {
                this.player.x = Math.floor(this.player.x)

                const current_Point =  this.getObjectById(playerState.point_id)
                const left_propertie = current_Point.properties.find(obj => obj.name === 'left')
                
                if(!left_propertie.value){
                    // console.log("caminho inexistente ! você está se equivocando")
                    return
                }
                
                const next_Point = this.getObjectById(left_propertie.value)
                
                playerState.targetX = Math.floor(next_Point.x * mapMain_scale) 
                playerState.targetY = Math.floor(next_Point.y * mapMain_scale)
                playerState.targetID = left_propertie.value
                
                this.player.key = userCharacter_objConfig.left.manLeft_key
                this.player.play({key: userCharacter_animationsKey.walk_left.key, repeat: -1}, true)
                this.player.setVelocity(-character_velocity, 0)
                
                playerState.isMoving = true 
                playerState.direction = 'left'

                // console.log(`atual: ${playerState.point_id}   proximo:${playerState.targetID}\nplayer.x: ${this.player.x} alvo: ${playerState.targetX}\nplayer.y: ${this.player.y} alvo: ${playerState.targetY}`)
            }
            else if(this.cursor.right.isDown & !playerState.isMoving)      // RIGHT
            {
                this.player.x = Math.floor(this.player.x)
                
                const current_Point =  this.getObjectById(playerState.point_id)
                const right_propertie = current_Point.properties.find(obj => obj.name === 'right')
                
                if(!right_propertie.value){
                    // console.log("caminho inexistente ! você está se equivocando")
                    return
                }

                const next_Point = this.getObjectById(right_propertie.value)

                playerState.targetX = Math.floor(next_Point.x * mapMain_scale) 
                playerState.targetY = Math.floor(next_Point.y * mapMain_scale)
                playerState.targetID = right_propertie.value
                
                this.player.key = userCharacter_objConfig.right.manRight_key
                this.player.play({key: userCharacter_animationsKey.walk_right.key, repeat: -1}, true)
                this.player.setVelocity(character_velocity, 0)
                
                playerState.isMoving = true 
                playerState.direction = 'right'

                // console.log(`atual: ${playerState.point_id}   proximo:${playerState.targetID}\nplayer.x: ${this.player.x} alvo: ${playerState.targetX}\nplayer.y: ${this.player.y} alvo: ${playerState.targetY}`)
            }
        }     
    }

    defineRoute(){
        switch(playerState.direction)
        {// Você vai ter que concertar isso daqui sua safada .... Porque 8 ?
            case('up'):        
            if(this.player.y <= playerState.targetY + 8 && this.player.y >= playerState.targetY + 8) 
            {
                playerState.direction = 'up'
                this.player.key = userCharacter_objConfig.up.manUp_key
                this.player.play({key: userCharacter_animationsKey.walk_up.key, repeat: -1}, true)
                this.player.setVelocity(0, -character_velocity)
            }
            else
            {
                if ( this.player.x > playerState.targetX)
                {
                    playerState.direction = 'left'
                    this.player.key = userCharacter_objConfig.left.manLeft_key
                    this.player.play({key: userCharacter_animationsKey.walk_left.key, repeat: -1}, true)
                    this.player.setVelocity(-character_velocity, 0)
                } 
                else                           
                {                                                                           
                    playerState.direction = 'right'
                    this.player.key = userCharacter_objConfig.right.manRight_key
                    this.player.play({key: userCharacter_animationsKey.walk_right.key, repeat: -1}, true)
                    this.player.setVelocity(character_velocity, 0)
                }                
            }                                                                
            break
            case('down'):
            if(this.player.y <= playerState.targetY + 8 && this.player.y >= playerState.targetY + 8)
            {
                playerState.direction = 'down'
                this.player.key = userCharacter_objConfig.down.manDown_key
                this.player.play({key: userCharacter_animationsKey.walk_down.key, repeat: -1}, true)
                this.player.setVelocity(0, character_velocity)
            }
            else
            {
                if(this.player.x > playerState.targetX)                              
                {                                   
                    playerState.direction = 'left'
                    this.player.key = userCharacter_objConfig.left.manLeft_key
                    this.player.play({key: userCharacter_animationsKey.walk_left.key, repeat: -1}, true)
                    this.player.setVelocity(-character_velocity, 0)
                } 
                else                          
                {                                                                           
                    playerState.direction = 'right'
                    this.player.key = userCharacter_objConfig.right.manRight_key
                    this.player.play({key: userCharacter_animationsKey.walk_right.key, repeat: -1}, true)
                    this.player.setVelocity(character_velocity, 0)
                }
            }
            break
            case('left'): 
            if(this.player.x <= playerState.targetX + 8 && this.player.x >= playerState.targetX + 8)
            {   
                playerState.direction = 'left'
                this.player.key = userCharacter_objConfig.left.manLeft_key
                this.player.play({key: userCharacter_animationsKey.walk_left.key, repeat: -1}, true)
                this.player.setVelocity(-character_velocity, 0)

            }
            else
            {
                if(this.player.y > playerState.targetY)                                
                {                                                                        
                    playerState.direction = 'up'
                    this.player.key = userCharacter_objConfig.up.manUp_key
                    this.player.play({key: userCharacter_animationsKey.walk_up.key, repeat: -1}, true)
                    this.player.setVelocity(0, -character_velocity)
                }
                else                           
                {                                                                           
                    playerState.direction = 'down'
                    this.player.key = userCharacter_objConfig.down.manDown_key
                    this.player.play({key: userCharacter_animationsKey.walk_down.key, repeat: -1}, true)
                    this.player.setVelocity(0, character_velocity)
                }
            }                                                                     
            break
            case('right'):
            if(this.player.x <= playerState.targetX + 8 && this.player.x >= playerState.targetX + 8)
            {
                playerState.direction = 'right'
                this.player.key = userCharacter_objConfig.right.manRight_key
                this.player.play({key: userCharacter_animationsKey.walk_right.key, repeat: -1}, true)
                this.player.setVelocity(character_velocity, 0)
            }
            else
            {
                if(this.player.y > playerState.targetY)                                
                {                                 
                    playerState.direction = 'up'
                    this.player.key = userCharacter_objConfig.up.manUp_key
                    this.player.play({key: userCharacter_animationsKey.walk_up.key, repeat: -1}, true)
                    this.player.setVelocity(0, -character_velocity)
                }
                else if(this.player.y < playerState.targetY)                           
                {                                                                           
                    playerState.direction = 'down'
                    this.player.key = userCharacter_objConfig.down.manDown_key
                    this.player.play({key: userCharacter_animationsKey.walk_down.key, repeat: -1}, true)
                    this.player.setVelocity(0, character_velocity)
                }
            }
            break
        }
    }

    isCompletelyInside(inner, outer) { // Verifica se os limites de "inner" estão dentro dos limites de "outer"
        // console.log(`${inner.x >= outer.x} - ${inner.y >= outer.y} - ${inner.x + inner.width <= outer.x + outer.width} - ${inner.y + inner.height <= outer.y + outer.height}\ni-left :  -> ${inner.x} | o-left: ${outer.x}\ni-top :  -> ${inner.y} | o-top: ${outer.y}\ni-right: ${inner.x + inner.width} | o-right: ${outer.x + outer.width}\ni-down: ${inner.y + inner.height} | o-down: ${outer.y + outer.height}\n`);
        return (
          inner.x >= (outer.x - 2) &&
          inner.y >= (outer.y - 2) &&
          inner.x + inner.width <= (outer.x - 2) + outer.width &&
          inner.y + inner.height <= (outer.y - 2) + outer.height
        );
    }

    getOnStorage(key){
        return JSON.parse(localStorage.getItem(key))
    }
}

export{
    MapaMain
}