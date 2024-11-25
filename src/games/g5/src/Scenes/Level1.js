// Scene (Cena) principal do Jogo


// -> implementar timeline de inicio de jogo
//      -> entrada do player
//      -> contagem regressiva
//      -> inicio do jogo

// -> implementar logica do jogo
// Sistema que ao ser acionado, a cada INTERVALO X ele gera um numero aleatório entre 1 e 3
// referente as colunas onde cada tronco deve descer. a condição de parada é o GameState.isScrolling


// import Phaser from "phaser";

// Scenes
import { mainUserInterface } from '../Consts/SceneKeys.js'    // ATENCION
// Constants
import { mapL1_key, l1_tilesetObjConfig, l1_layers_ID, objectsLayers_keys } from '../Consts/MapKeys.js'
import { l1Map_scale, l1Map_height, l1Map_width, transitionFadeDuration, containerGame_height } from '../Consts/Sizes.js'
import { userCharacter_objConfig } from '../Consts/CharacterKeys.js'
import { level1_delayMapScrolling, level1_SpeedMapScrolling, character_AnimationFrameRate, stemDelay } from '../Consts/Difficulty.js'
import { userCharacter_animationsKey, lifeBart_animationsKey } from '../Consts/Animations.js'
import { stem, lifeBar } from '../Consts/SpriteSheets.js'
import { level1Songs } from "../Consts/SongsKey.js";

// Level data
import { level_data, levelStatesObj } from "../Consts/LevelStatesObj.js"
import { playerState, gameState } from "../Consts/GameStateObj.js";
import { colors } from '../Consts/Colors.js'

const loadedChunks = new Set()
const arrayChunks = new Array()
const tileArray = new Array()
const chunk_size = 63
const tile_size  = 16

let lastChunkY = null;
let aux1 = 0
let aux2 = 1  // used to control de position of game chunks

for(let y = 0; y < Math.floor(l1Map_height / 16); y += 63){
    arrayChunks.push([aux1])
    aux1++
}

export default class Level1 extends Phaser.Scene{
    /** Lembre-se que quando implementados o fim da fase e o botão de pausar 
     * devemos atualizar tanto GameStatesObj quanto currentGameState */
    preload(){
        this.load.image(
            stem.stem_key,
            stem.stem_URL,
        )
    }
    init(){
        this.enableKeyboard = false
        this.currentGameState = levelStatesObj.Running
        
        // styles
        const gameCanvas = this.sys.game.canvas
        gameCanvas.id = 'jogo5_canvas'
        gameCanvas.style.border = `5px solid ${colors.main_color}`;
        gameCanvas.style.borderRadius = "20px"
    }

    create()
    { 
        // this.sound.play(level1Songs.waterfallSong.key, level1Songs.waterfallSong.config)
        // this.sound.play(level1Songs.footstepsOnWater.key, level1Songs.footstepsOnWater.config)

        this.cameras.main.fadeIn(transitionFadeDuration, 0, 0, 0); // Fade a partir do preto em 1 segundo
        
        this.cameras.main.once('camerafadeoutcomplete', (camera) => {
            return
            // implementar timeline de instruçoes para level 1
        })
        this.player = this.physics.add.sprite( ((l1Map_width + 40) * l1Map_scale) / 2, (l1Map_height - 30) * l1Map_scale, userCharacter_objConfig.up.manUp_key).setScale(l1Map_scale * 1.8)
        this.player.body.setSize(4, 4)
        this.player.setDepth(4)
        this.player.setCollideWorldBounds(true);
        const map = this.make.tilemap({key: mapL1_key, tileWidth: 16, tileHeight: 16 })

        this.loadChunks(this.player.y, l1_tilesetObjConfig, l1_layers_ID)
       
        this.cameras.main.setBounds(0, 0, map.widthInPixels * l1Map_scale, map.heightInPixels * l1Map_scale) // limites da camera
        this.cameras.main.setScroll( 0, (l1Map_height * l1Map_scale)) // configurando posicionamento da camera
        this.physics.world.setBounds(0, 0, (map.widthInPixels * l1Map_scale), (map.heightInPixels * l1Map_scale))
        
        this.scene.run(mainUserInterface)
        this.scene.bringToTop(mainUserInterface)

        this.createNeededAnimation() // criar apenas uma vez (mapaMain)
        

        const mapObjects = map.getObjectLayer(objectsLayers_keys.WallLayerKey)["objects"] 
        
        mapObjects.forEach(object => {
            switch(object.name){
                default:
                    if(object.rectangle)
                    {
                        this.objRec = this.add.rectangle((object.x * l1Map_scale), (object.y * l1Map_scale), (object.width * l1Map_scale), (object.height * l1Map_scale)).setDisplayOrigin(0)
                        this.physics.add.existing(this.objRec, true)
                        this.physics.add.collider(this.player, this.objRec)
                    }
                    else if(object.ellipse)
                    {
                        this.objEllips = this.add.circle((object.x * l1Map_scale), (object.y * l1Map_scale), (object.height * l1Map_scale / 2), 0xff0000).setOrigin(0)
                        this.physics.add.existing(this.objEllips, true)
                        this.physics.add.collider(this.player, this.objEllips)
                    }
            }
        })

        this.cursor = this.input.keyboard.createCursorKeys()
        this.cronometro = this.time.addEvent({                              // QUANDO O JOGO REALMENTE COMOÇAR APENAS 
            delay: 1000,
            callback: () => {
                level_data.timer += 1
            },
            loop: true
        })
        levelStatesObj.hasBegun = true


        // -------------------------- DOM ------------------------------------
        const accessible_btn = document.getElementById('alternativeMovements')
        const mute_btn = document.getElementById('mute')

        accessible_btn.onclick = () => {
            if(accessible_btn.classList.contains('active')) { // Default
                accessible_btn.classList.remove('active')

                gameState.accessibleMotionControls = false
                gameState.defaultMotionControls = true
            }else{                                            // Acessible
                accessible_btn.classList.add('active')
                
                gameState.accessibleMotionControls = true
                gameState.defaultMotionControls = false
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
        gameState.accessibleMotionControls = true

    }


    update() {  // SE O JOGO ESTIVER PAUSADO OU SE ELE NÃO ESTIVER RODADNDO AS FUNÇOES DO UPDATE NÃO IRÃO SER LIDAS 
        if(this.currentGameState != levelStatesObj.Running && !levelStatesObj.hasBegun) return

        if(gameState.accessibleMotionControls) 
        {
            this.alternativeCharacterMoveControl()   
        }
    
        if(gameState.defaultMotionControls)
        {
            this.handleMainCharacterMovements()
        }

        if (levelStatesObj.hasMapScrolled) this.keepCharacterInCameraBounds()  
        this.time.delayedCall(level1_delayMapScrolling, () => {
            if(level_data.aux_controlDelay == 0)
            {
                level_data.aux_controlDelay ++
                this.toggleKeyboardControl()
            }
            this.handleMapScrolling()
        })
        this.cameras.main.update()

        this.loadChunks( this.player.y, l1_tilesetObjConfig, l1_layers_ID)
    }

    gameLogic(){
        let aux = 1
        let collumn = undefined
        let auxCollum = null
        
        if(levelStatesObj.isMapScrolling){
            this.gameMachineTimer = this.time.addEvent({
                delay: stemDelay,
                callback: () => {
                    collumn = Phaser.Math.Between(1,3)
                    while(collumn == auxCollum) collumn = Phaser.Math.Between(1,3)
                    auxCollum = collumn

                    let auxGameLogic = 0

                    if(this.cameras.main.scrollY > containerGame_height + 100)
                    {   
                        switch(collumn){
                           case 1:
                               const stem1 = this.add.image(288 * l1Map_scale, this.cameras.main.scrollY - 16 * l1Map_scale, stem.stem_key)
                               .setOrigin(0)
                               .setScale(l1Map_scale)
                               .setDepth(3)

                               this.physics.add.existing(stem1, true)
                               this.physics.add.overlap(this.player, stem1, () => {
                                   if(auxGameLogic == 0){
                                    level_data.hit++
                                       if(playerState.life > 0.5){
                                            this.sound.play(level1Songs.lifeAffected.key, level1Songs.lifeAffected.config)
                                            playerState.life = playerState.life - 0.5
                                        } else {
                                            playerState.life = 0
                                        this.sound.play(level1Songs.gameOver.key, level1Songs.gameOver.config)

                                        }
                                        auxGameLogic++
                                    }
                               })
                               break

                           case 2:
                               const stem2 = this.add.image(336 * l1Map_scale, this.cameras.main.scrollY - 16 * l1Map_scale, stem.stem_key)
                               .setOrigin(0)
                               .setScale(l1Map_scale)
                               .setDepth(3)

                               this.physics.add.existing(stem2, true)
                               this.physics.add.overlap(this.player, stem2, () => {
                                   if(auxGameLogic == 0){
                                    level_data.hit++
                                       if(playerState.life > 0.5){
                                            this.sound.play(level1Songs.lifeAffected.key, level1Songs.lifeAffected.config)
                                            playerState.life = playerState.life - 0.5
                                        } else {
                                            playerState.life = 0
                                            this.sound.play(level1Songs.gameOver.key, level1Songs.gameOver.config)
                                        }
                                        auxGameLogic++
                                    }
                               })
                               break

                           case 3:
                               const stem3 = this.add.image(384 * l1Map_scale, this.cameras.main.scrollY - 16 * l1Map_scale, stem.stem_key)
                               .setOrigin(0)
                               .setScale(l1Map_scale)
                               .setDepth(3)

                               this.physics.add.existing(stem3, true)
                               this.physics.add.overlap(this.player, stem3, () => {
                                   if(auxGameLogic == 0){
                                    level_data.hit++
                                       if(playerState.life > 0.5){
                                            this.sound.play(level1Songs.lifeAffected.key, level1Songs.lifeAffected.config)
                                            playerState.life = playerState.life - 0.5
                                        } else {
                                            playerState.life = 0
                                            this.sound.play(level1Songs.gameOver.key, level1Songs.gameOver.config)
                                        }
                                        auxGameLogic++
                                    }
                               })
                               break
                        }
                        
                    // this.AcessibleTextBodyEl.innerHTML = `<p>Chamada - ${aux}</p><p>Coluna - ${collumn}</p><p>Vida - ${playerState.life}</p><p>HIT - ${level_data.hit}</p>`
                    aux++
                    } else{
                        // this.AcessibleTextBodyEl.innerHTML = `<p>Fim da produção</p>`
                    }
                },
                loop: true
            })
        }
    }


    handleMainCharacterMovements(){
        if(this.enableKeyboard){  
            const noLeftRightKey = (levelStatesObj.isMapScrolling && !this.cursor.left.isDown && !this.cursor.right.isDown)
            const noUpKey        = (levelStatesObj.isMapScrolling && this.cursor.up.isDown)
            const noDownKey      = (levelStatesObj.isMapScrolling && this.cursor.down.isDown)
            
            const y = !levelStatesObj.isMapScrolling ? 0 : -100

            if( noLeftRightKey || noUpKey || noDownKey )
            {
                    this.player.key = userCharacter_objConfig.up.manUp_key
                    this.player.play({key: userCharacter_animationsKey.walk_up.key, repeat: 0}, true)
                    this.player.setVelocity(0, y)
            }
            else
            {   
                if( this.cursor.left.isDown )
                {   
                    this.player.key =  userCharacter_objConfig.left.manLeft_key
                    this.player.play(userCharacter_animationsKey.walk_left.key, true)
                    this.player.setVelocity(-100, y)        
                }
                else if (this.cursor.right.isDown)
                {
                    this.player.key = userCharacter_objConfig.right.manRight_key
                    this.player.play(userCharacter_animationsKey.walk_right.key, true)
                    this.player.setVelocity(100, y)        
                }
                else if(this.cursor.up.isDown)
                {
                    this.player.key = userCharacter_objConfig.up.manUp_key
                    this.player.play({key: userCharacter_animationsKey.walk_up.key, repeat: 0}, true)
                    this.player.setVelocity(0, -100)        
                } 
                else if(this.cursor.down.isDown)
                {
                    this.player.key = userCharacter_objConfig.manDown_key
                    this.player.play(userCharacter_animationsKey.walk_down.key, true)
                    this.player.setVelocity(0, 100)        
                }
                else{                                   // isMapScrolling = false
                    this.player.setVelocity(0, 0)        
                }
            }
        }
    } 
    
    alternativeCharacterMoveControl(){
        const y = !levelStatesObj.isMapScrolling ? 0 : -100

        if(this.cursor.left.isDown)       // LEFT
        {
            switch(level_data.playerCollumn) {
                case 2:
                    if(!level_data.isPlayerOnChagingPosition){
                        level_data.isPlayerOnChagingPosition = true
                        this.player.play({key: userCharacter_animationsKey.walk_left.key, repeat: 1}, true)
                        this.tweens.add({
                        targets: this.player,
                        x: 312 * l1Map_scale,
                        duration: 350,
                        ease: 'Linear',
                        repeat: 0,
                        paused: true,
                        persist: true,
                        onComplete: () => {
                            level_data.isPlayerOnChagingPosition = false
                            level_data.playerCollumn = 1
                        }                    
                        }).play()
                    }
                break
                
                case 3:
                    this.player.play({key: userCharacter_animationsKey.walk_left.key, repeat: 1}, true)
                    if(!level_data.isPlayerOnChagingPosition){
                        level_data.isPlayerOnChagingPosition = true
                        this.player.play({key: userCharacter_animationsKey.walk_left.key, repeat: 1}, true)
                        this.tweens.add({
                        targets: this.player,
                        x: 360 * l1Map_scale,
                        duration: 350,
                        ease: 'Linear',
                        repeat: 0,
                        paused: true,
                        persist: true,
                        onComplete: () => {
                            level_data.isPlayerOnChagingPosition = false
                            level_data.playerCollumn = 2
                        }                    
                        }).play()
                    }

                break
            
                default:
                    break
            }
        }
        else if(this.cursor.right.isDown & !playerState.isMoving)      // RIGHT
        {
            switch(level_data.playerCollumn) {
                case 1:
                    this.player.play({key: userCharacter_animationsKey.walk_right.key, repeat: 1}, true)
                    if(!level_data.isPlayerOnChagingPosition){
                        level_data.isPlayerOnChagingPosition = true
                        this.player.play({key: userCharacter_animationsKey.walk_left.key, repeat: 1}, true)
                        this.tweens.add({
                        targets: this.player,
                        x: 360 * l1Map_scale,
                        duration: 350,
                        ease: 'Linear',
                        repeat: 0,
                        paused: true,
                        persist: true,
                        onComplete: () => {
                            level_data.isPlayerOnChagingPosition = false
                            level_data.playerCollumn = 2
                        }
                    }).play()
                    }
                break

                case 2:
                    this.player.play({key: userCharacter_animationsKey.walk_right.key, repeat: 1}, true)
                    if(!level_data.isPlayerOnChagingPosition){
                        level_data.isPlayerOnChagingPosition = true
                        this.player.play({key: userCharacter_animationsKey.walk_left.key, repeat: 1}, true)
                        this.tweens.add({
                        targets: this.player,
                        x: 408 * l1Map_scale,
                        duration: 350,
                        ease: 'Linear',
                        repeat: 0,
                        paused: true,
                        persist: true,
                        onComplete: () => {
                            level_data.isPlayerOnChagingPosition = false
                            level_data.playerCollumn = 3
                        }
                        }).play()
                    }
                break
                
                default:
                break
            }
        }
        else
        {
            this.player.key = userCharacter_objConfig.up.manUp_key
            this.player.play({key: userCharacter_animationsKey.walk_up.key, repeat: 0}, true)
            this.player.setVelocity(0, y)
        }
    }
    
    keepCharacterInCameraBounds(){ // se os calculos de velocidade do boneco e velocidade de scrool do mapa estiverem ajustados corretamente essa função não será necessária
        if(this.currentGameState == 'running')
        {   
            const screenHeight = this.cameras.main.height
            if(this.player.y > screenHeight - this.player.height)
            {
                this.player.setVelocityY(-5)
            }
        }
    }

    handleMapScrolling(){
        if(this.cameras.main.scrollY > 0)
        {   
            this.cameras.main.scrollY -= level1_SpeedMapScrolling
            if(!levelStatesObj.isMapScrolling)
            {
                levelStatesObj.isMapScrolling = true
                level_data.running = true
                this.gameLogic()
            }
        } 
        else
        {
            if(levelStatesObj.isMapScrolling)
            {
                this.gameMachineTimer.destroy()
                console.log('fim')
                levelStatesObj.isMapScrolling = false
                levelStatesObj.hasMapScrolled =  true
                this.time.removeEvent(this.cronometro)
                level_data.running = false
                localStorage.setItem('currentLevel', 1)
                // TOCAR VITÓRIA
                // MOSTRAR PONTUAÇÃO E VITÓRIA
                // SALVAR
                //  -> VIDA
                //  -> STATUS (CURRENT LEVEL)
            }
        }

    }

    createNeededAnimation() { // criar apenas uma vez (preload)
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

    toggleKeyboardControl() {
        this.enableKeyboard = !this.enableKeyboard;
    }
    
    loadChunks(playerY, objConfigTileSetImage, objConfigLayersID){
        let chunkY = Math.floor( (playerY / l1Map_scale) / (chunk_size * tile_size))
        
        for(let y = chunkY ; y >= chunkY - 1 ; y --){
            const chunkKey = `${0},${y}`
            
            if(!loadedChunks.has(chunkKey))
            {
                this.loadChunk( y, objConfigTileSetImage, objConfigLayersID)
                if(y > 0){
                    this.loadChunk( y, objConfigTileSetImage, objConfigLayersID)
                } 
                loadedChunks.add(chunkKey)
                aux2++
            } 
            else if(!loadedChunks.has(`${0},${y-1}`))
            {
                if(y > 0){
                    this.loadChunk( y - 1, objConfigTileSetImage, objConfigLayersID)
                }
                loadedChunks.add(`${0},${y-1}`)
                aux2++
            }
        }
    }

    loadChunk(chunkY, objConfigTileSetImage, objConfigLayersID){
        const subtrahend = aux2 * (chunk_size * tile_size)
        const chunk      = this.make.tilemap({key:`chunk_${0}_${chunkY}`, tileWidth: tile_size, tileHeight:tile_size})
        
        objConfigTileSetImage.forEach(obj => {
            const layer = chunk.addTilesetImage(obj.name, obj.key, tile_size, tile_size)
            tileArray.push(layer)
        })
        
        Object.entries(objConfigLayersID).forEach(([chave, valor], index) => {
            chunk.createLayer(valor, tileArray, 0, (l1Map_height - subtrahend) * l1Map_scale ).setScale( l1Map_scale ).setDepth( index + 1 )
        })
        this.load.start()
    }
}

export{
    Level1
}