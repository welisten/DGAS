// Pensar na compartimentalização de alguns parametros (SCALA)

// import Phaser from "phaser";

//Scenes


//Consts
import { containerGame_width, containerGame_height, mapMain_scale } from "../Consts/Sizes.js"
import { lifeBar } from "../Consts/SpriteSheets.js";
import { uiImages } from "../Consts/ImagesKeys.js";

// From others modules
import { level_data } from "../Consts/LevelStatesObj.js"
import { userIterfaceState, gameState, playerState } from "../Consts/GameStateObj.js"
import { lifeBart_animationsKey } from "../Consts/Animations.js";

let timer_UI = level_data.timer
let queue = []


export default class GameBackground extends Phaser.Scene
{
    init(){
        this.auxText = ''
        this.auxLife = 0
        this.currentIndex = 0
        this.controlTextObj = { interfaceText_stt: 'paused' }
        this.arrows = []
    }
    create() 
    {
    //  Moldura
        this.screenFrame = this.add.rectangle(10, 10, ( containerGame_width - 20 ), ( containerGame_height - 20 ), '0xffffff', 1 )
            .setOrigin( 0 )
            .setStrokeStyle( 3, '0xffffff', 1 )
            .isFilled = false

        
    //  Corações
        this.heart_1 = this.add.sprite(20, 20, lifeBar.lifeBar_key, 0)
            .setOrigin(0)
            .setScale(.5)
        this.heart_2 = this.add.sprite(50, 20, lifeBar.lifeBar_key, 0)
            .setOrigin(0)
            .setScale(.5)
        this.heart_3 = this.add.sprite(80, 20, lifeBar.lifeBar_key, 0)
            .setOrigin(0)
            .setScale(.5)

    //  Timer
    //      Moldura
        this.timerGraficFrame = this.add.graphics()
        this.timerGraficFrame.fillStyle(0xffffff, 0.5)
        
        const x = containerGame_width - 118
        const y = 20
        const width = 100
        const height = 50
        const radius = 20

        this.timerGraficFrame.fillRoundedRect(x, y, width, height, radius)
       
    //      Relógio(Icone)
        this.clock = this.add.image(containerGame_width - 115, 27, uiImages.timer.key)
            .setOrigin(0)
            .setScale(1)
            .setTintFill("0x000000")
        
    //      Tempo(string)
        this.timer = this.add.text(containerGame_width - 85, 27, timer_UI < 10 ? `0${timer_UI}`: `${timer_UI}`, {
            fontSize: 35,
            color: '0x000000'
        })
            .setOrigin(0)
        
    //      Caixa de dialogo
        this.dialogBox = this.add.image( (containerGame_width / 2) , (containerGame_height - 70), uiImages.dialogBox.key)
            .setOrigin(0.5)
            .setScale(1.7, 0.8)

        this.dialogBox.setAlpha(0)

    //      Texto da caixa de dialogo
        this.textOfDialogBox = this.add.text((containerGame_width / 2), containerGame_height - 110, '', {
            fontSize: 24,
            color: "0xffffff",
            wordWrap: {
                width: (this.dialogBox.width * 1.7) - 40,
                useAdvancedWrap: true,
            },
            align: 'center',
        }).setOrigin(0.5, 0)

        this.textOfDialogBox.setLineSpacing(6)

    //      Top Informations
        const CM_height = 244
        this.CityMap_info_popUp = this.add.image( (containerGame_width / 2) , (-CM_height), uiImages.cityMap_Sign.key)
                .setOrigin(0.5, 0)
                .setAlpha(0)
                .setDepth(10)

        this.cityMap_info_in = this.tweens.add({
            targets: this.CityMap_info_popUp,
            y: 0,
            duration: 750,
            ease: 'Linear',
            repeat: 0,
            paused: true,
            persist: true
        })
        this.cityMap_info_out = this.tweens.add({
            targets: this.CityMap_info_popUp,
            y: -CM_height,
            duration: 750,
            ease: 'Linear',
            repeat: 0,
            paused: true,
            persist: true
        })
        //      Desenvolvedor
        this.developer_sign = this.add.image( (containerGame_width / 2) , (containerGame_height/2), uiImages.developer.key)
        .setOrigin(0.5)
        .setScale(.8)
        .setAlpha(0)

    this.developer_sign_in = this.tweens.add({
        targets: this.developer_sign,
        alpha: 1,
        duration: 500,
        ease: 'Linear',
        repeat: 0,
        paused: true,
        persist: true
    })

    this.developer_sign_out = this.tweens.add({
        targets: this.developer_sign,
        alpha: 0,
        duration: 500,
        ease: 'Linear',
        repeat: 0,
        paused: true,
        persist: true
    })
        //      Mapa Guapi
        this.cityMap_map = this.add.image( (containerGame_width / 2) , (containerGame_height / 2), uiImages.cityMap_Map.key)
            .setOrigin(0.5)
            .setScale(.55)
            .setAlpha(0)

        this.cityMap_map_in = this.tweens.add({
            targets: this.cityMap_map,
            alpha: 1,
            duration: 500,
            ease: 'Linear',
            repeat: 0,
            paused: true,
            persist: true
        })

        this.cityMap_map_out = this.tweens.add({
            targets: this.cityMap_map,
            alpha: 0,
            duration: 250,
            ease: 'Linear',
            repeat: 0,
            paused: true,
            persist: true
        })

        this.cursor = this.input.keyboard.createCursorKeys() 
    
    }

    update(){
        this.handel_timerEl(timer_UI, level_data)
        this.handlePlayerLife(playerState.life)
        this.check_Add_textToQueue(userIterfaceState.text)
        this.handel_Queue(queue, this.controlTextObj.interfaceText_stt)
        if(gameState.isTopInformationAble) 
        {                                                                                                        // PASSO 2
            this.showTopInformation(gameState.topInformationType)
            gameState.isTopInformationAble = false
        }

        if(gameState.isGuapimirimSignAble)
        {
            this.cityMap_info_out.play()
            this.bringMapToScrean()
            gameState.isGuapimirimSignAble = false // está aqui para garantir que essa função seja chamada somente uma vez
        }
        
        if(gameState.isGuapimirimSignVisible)
        {
            if(this.cursor.space.isDown){
                this.cityMap_map_out.play()

                gameState.isGuapimirimSignVisible = false
                gameState.isPlayerAbleToMove      = true
                gameState.isGuapimirimSignAble    = false
                gameState.isTopInformationAble    = false
                
                this.time.addEvent({
                    delay: 2000,
                    callback: () => gameState.counter_cityMap = 0,
                    loop: false
                })
            }
        } 
        if(gameState.isDevelopersSignOn)
        {
            if(this.cursor.space.isDown){
                this.developer_sign_out.play()
                this.heart_1.setAlpha(1)
                this.heart_2.setAlpha(1)
                this.heart_3.setAlpha(1)
                this.clock.setAlpha(1)
                this.timer.setAlpha(1)
                this.timerGraficFrame.setAlpha(1)
                
                gameState.developerSign_step++
                
            }
        } 

        if(gameState.isExploreAble) this.handleExplore()
        if(gameState.isDevelopersSignAble) this.handleDevelopersSign()
    }

    handleDevelopersSign(){
        if(!gameState.isDevelopersSignOn){
            this.developer_sign_in.play()
            this.heart_1.setAlpha(0)
            this.heart_2.setAlpha(0)
            this.heart_3.setAlpha(0)
            this.clock.setAlpha(0)
            this.timer.setAlpha(0)
            this.timerGraficFrame.setAlpha(0)
            gameState.isDevelopersSignOn = true
        }
    }

    handleExplore(){
        if(gameState.explore){

            const graficSign = this.add.graphics()
            const gS_width = containerGame_width * 0.45
            const gS_Height = containerGame_height * 0.1

            graficSign.fillStyle(0xffffff, 0.5)
            graficSign.fillRect((containerGame_width / 2  - (gS_width / 2)), containerGame_height * .1,gS_width, gS_Height)
            
            const gSBorder = this.add.graphics()
            gSBorder.lineStyle(3, 0x00ff00)
            gSBorder.strokeRect((containerGame_width / 2  - (gS_width / 2)), containerGame_height * .1,gS_width, gS_Height)

            const gsText = this.add.text(containerGame_width/2, (containerGame_height * .15)  , 'Modo Explorar Ativado', {
                fill: '0x000000',
                fontStyle: 'bold',
                fontWeight: 'bold',
                fontSize: containerGame_width * .03,
            }).setOrigin(.5)

            this.time.addEvent({
                delay: 1500,
                callback: () => {
                    graficSign.destroy()
                    gSBorder.destroy()
                    gsText.text = ''
                },
                loop: false
            })
            gameState.isExploreAble = false
        }else{
            const graficSign = this.add.graphics()
            const gS_width = containerGame_width * 0.5
            const gS_Height = containerGame_height * 0.1

            graficSign.fillStyle(0xffffff, 0.5)
            graficSign.fillRect((containerGame_width / 2  - (gS_width / 2)), containerGame_height * .1,gS_width, gS_Height)
            
            const gSBorder = this.add.graphics()
            gSBorder.lineStyle(3, 0xff00000)
            gSBorder.strokeRect((containerGame_width / 2  - (gS_width / 2)), containerGame_height * .1,gS_width, gS_Height)

            const gsText = this.add.text(containerGame_width/2, (containerGame_height * .15)  , 'Modo Explorar Desativado', {
                fill: '0x000000',
                fontStyle: 'bold',
                fontWeight: 'bold',
                fontSize: containerGame_width * .03,
            }).setOrigin(.5)

            this.time.addEvent({
                delay: 1500,
                callback: () => {
                    graficSign.destroy()
                    gSBorder.destroy()
                    gsText.text = ''
                },
                loop: false
            })
            gameState.isExploreAble = false
        }
    }

    handlePlayerLife(life){
        if(this.auxLife == life){
            return
        }   

        

        switch(playerState.life / .5){
            case 6:
                this.heart_1.play({key: lifeBart_animationsKey.heart_full.key, repeat:0}, true)
                this.heart_2.play({key: lifeBart_animationsKey.heart_full.key, repeat:0}, true)
                this.heart_3.play({key: lifeBart_animationsKey.heart_full.key, repeat:0}, true)
                break

            case 5:
                this.heart_3.play({key: lifeBart_animationsKey.heart_half.key, repeat: 0}, true)
                break

            case 4:
                this.heart_3.play({key: lifeBart_animationsKey.heart_empty.key, repeat: 0}, true)
                break
            case 3:
                this.heart_2.play({key: lifeBart_animationsKey.heart_half.key, repeat:0}, true)
                break

            case 2:
                this.heart_2.play({key: lifeBart_animationsKey.heart_empty.key, repeat:0}, true)
                break

            case 1:
                this.heart_1.play({key: lifeBart_animationsKey.heart_half.key, repeat:0}, true)
                break

            case 0:
                this.heart_1.play({key: lifeBart_animationsKey.heart_empty.key, repeat:0}, true)
                
                // Chamar Game Over
                break

        }
        this.auxLife = life
    }

    showTopInformation(type){ // PASSO 3
        if(type == 'CityMap'){
            gameState.isPlayerAbleToMove = false

            this.CityMap_info_popUp.setAlpha(1)
            this.cityMap_info_in.play()

            gameState.isTopInformationVisible = true
            gameState.topInformationType = ''
            
            this.time.addEvent({
                delay: 2000,
                callback: () => {
                    if(!gameState.isGuapimirimSignVisible) {
                        this.cityMap_info_out.play()
                        this.time.addEvent({
                            delay: 3000,
                            callback: () => gameState.counter_cityMap = 0,
                            loop: false
                        })
                    }
                    gameState.isTopInformationVisible = false
                    gameState.isGuapimirimSignAble    = false
                    gameState.isPlayerAbleToMove      = true
                }
            })
        }

        return
    }

    bringMapToScrean() { // PASSO 4
        gameState.isTopInformationVisible = false
        gameState.isPlayerAbleToMove = false

        this.cityMap_map_in.play()
        this.time.addEvent({
            delay: 250,
            callback: () => gameState.isGuapimirimSignVisible = true,
            loop: false
        })          
    }

    check_Add_textToQueue(text){        //  VERIFICA se o texto é repetido, caso não seja ADICIONA texto na fila para renderização
       if(text && this.auxText != text)
        {
            this.auxText = text
            this.addToQueue(queue, text)
        }
       return
    }

    handel_Queue(queue, writeMachineState){         //  Faz a fila andar se houver elemento na 1° posição da fila E SE a maquina de escrever estiver pausada
        let isWriteMacinePaused = writeMachineState == 'paused'

        if(queue[0] && isWriteMacinePaused){ // se houver elemento na 1° posição E a maquina de escrever estiver pausada
            this.currentIndex = 0                                   // seta o index atual para o correto rastreamento da exibição do texto (maquina de escrever)

            this.displayElement(this.dialogBox)
            this.writeText(queue[queue.length - 1][0])                  // -> [TextEncoder, align]
            this.textOfDialogBox.setAlign(queue[queue.length - 1][1]) // -> [TextEncoder, align]
        }
        else
        {
            return
        }
    }
 
    writeText(string){                  //  Recebe uma string e ADICIONA letra por letra ao texto da caixa de diálogo(textOfDialogBox)
        let obj = this.separeteStringFromdirection(string)
        
        let indexsArr = []
        if(obj.indexsArr.length > 0){
            indexsArr = obj.indexsArr  
        } 

        let directionsSign = []
        for(let index_bracketStart of indexsArr){
            let index_bracketEnd = string.indexOf(']', index_bracketStart)
            directionsSign.push(string.slice(index_bracketStart, index_bracketEnd + 1))
        }

        string = obj.string               
        let length = string.length
        
        this.controlTextObj.interfaceText_stt = 'writing'
        this.displayElement(this.dialogBox)
        this.displayElement(this.textOfDialogBox)
        
        let aux         = 0
        let aux_balance = 0
        let x           = (containerGame_width - this.dialogBox.width) / 2 - 10
        let y           = this.textOfDialogBox.y - 5
        
        this.typewriter = this.time.addEvent({ 
            delay: 50, 
            callback: () => {
                this.controlTextVelocity(string)
                this.handle_endOfString(this.currentIndex, length)
                
                if(indexsArr.length > 0 && aux < indexsArr.length){
                    let tracked_index = indexsArr[aux] == 0 ? indexsArr[aux] : indexsArr[aux] - aux_balance
                    let line_hight = 20 * mapMain_scale

                    if(this.currentIndex == tracked_index){
                        switch(directionsSign[aux]){
                            case "[up]":
                                this.arrows.push(this.add.sprite(x, y, uiImages.arrows.up.key).setScale(.18).setOrigin(0))
                                // this.tweens.add({
                                //     targets: this.arrows[this.arrows.length - 1],
                                //     x: x,
                                //     y: y,
                                //     scaleX: .19,
                                //     scaleY: .19,
                                //     alpha: 1,
                                //     duration: 750,
                                //     ease: 'Linear',
                                //     repeat: -1,
                                //     yoyo: true,
                                // }).play()
                                y           +=  line_hight
                                aux_balance +=  directionsSign[aux].length
                                aux++
                                break
                            case "[down]":
                                this.arrows.push(this.add.sprite(x, y, uiImages.arrows.down.key).setScale(.25).setOrigin(0))
                                // this.tweens.add({
                                //     targets: this.arrows[this.arrows.length - 1],
                                //     x: x,
                                //     y: y,
                                //     scaleX: .19,
                                //     scaleY: .19,
                                //     alpha: 1,
                                //     duration: 750,
                                //     ease: 'Linear',
                                //     repeat: -1,
                                //     yoyo: true
                                // }).play()
                                y           +=  line_hight
                                aux_balance +=  directionsSign[aux].length
                                aux++
                                break
                            case "[left]":
                                this.arrows.push(this.add.sprite(x, y, uiImages.arrows.left.key).setScale(.25).setOrigin(0))
                                // this.tweens.add({
                                //     targets: this.arrows[this.arrows.length - 1],
                                //     x: x,
                                //     y: y,
                                //     scaleX: .19,
                                //     scaleY: .19,
                                //     alpha: 1,
                                //     duration: 750,
                                //     ease: 'Linear',
                                //     repeat: -1,
                                //     yoyo: true
                                // }).play()
                                y           +=  line_hight
                                aux_balance +=  directionsSign[aux].length
                                aux++
                                break
                            case "[right]":
                                this.arrows.push(this.add.sprite(x, y, uiImages.arrows.right.key).setScale(.25).setOrigin(0))
                                // this.tweens.add({
                                //     targets: this.arrows[this.arrows.length - 1],
                                //     x: x,
                                //     y: y,
                                //     scaleX: .19,
                                //     scaleY: .19,
                                //     alpha: 1,
                                //     duration: 750,
                                //     ease: 'Linear',
                                //     repeat: -1,
                                //     yoyo: true
                                // }).play()
                                y           +=  line_hight
                                aux_balance +=  directionsSign[aux].length
                                aux++
                                break
                        }

                    }
                }
                this.textOfDialogBox.text += string[this.currentIndex]
                this.currentIndex++
            },
            loop: true
        })
    }

    separeteStringFromdirection(string){
        let indexsArr = []
        let index = string.indexOf('[')

        if(index !== -1){
            let index       = -1
            let occurrence = this.countAmountOfOccurrences('[', string)
            const regex = /\[(up|down|left|right)\]/

            for(let i = 0; i < occurrence; i++){
                index = string.indexOf('[', index + 1)
                indexsArr.push(index)
            }
            for(let i = 0; i < occurrence; i++){
                string = string.replace(regex, '')
            }
        }
        return {string, indexsArr}
    }

    countAmountOfOccurrences(separator, mainString) {
        // Divida a string principal em um array de strings com base na separator o comprimento do array de strings resultante
        const arrayOccurrences  =  mainString.split(separator)
        const amountOccurrences =   arrayOccurrences.length - 1 
        return amountOccurrences
    }
    
    handle_endOfString(currentIndex, stringLength){       //  VERIFICA se é a ultima letra do texto e dispara a função de configuração de controles após 1 seg
        if( currentIndex >= stringLength - 1 ) 
        {
            this.typewriter.delay = 1000
            this.removeFromQueue(queue)

            this.time.removeEvent(this.typewriter)
            this.time.addEvent({
                delay: 500,
                callback: () => {
                    this.arrows.forEach(arrow => {
                        arrow.destroy()
                        arrow.setAlpha(0)
                        this.hideElement(arrow)
                    })
                    this.dialogBox.setAlpha(1)
                    this.textOfDialogBox.setAlpha(1)
                },
                loop: false
            })

            this.time.addEvent(
                {
                    delay: 1000,
                    callback: () => {
                        this.controlTextObj.interfaceText_stt = 'paused'
                        this.currentIndex = 0
                        this.textOfDialogBox.text = ''

                    },
                    loop: false
                }
            )
            if(!queue[0]){
                this.hideElement(this.dialogBox)
                this.hideElement(this.textOfDialogBox)
            }
            
        }
        return
    }

    controlTextVelocity(text){          //  Controla a velocidade de escrita do texto da Caixa de dialogop
        switch(text[this.currentIndex]){
            case ".":
                this.typewriter.delay = 1000        
                break
            
            case  "!":
                this.typewriter.delay = 1000        
                break
            
            default:
                this.typewriter.delay = 50           
                break
        }
    }

    addToQueue(queue, text, align = 'center' ) {        //  Adiciona o elemento ao final da fila junto com seu estilo de alinhamento
        queue.push([text, align]);
    }

    removeFromQueue(queue) {            //  Remove e retorna o primeiro elemento da fila
        if(queue[0]){
            const removedElement = queue.shift();
            return removedElement; // Retorna o elemento removido
        }  
        return
    }

    handel_timerEl(UI_timerNum, level_data){ // Configura o timer diacordo com dados passados do modulo dos Level, e lida com renderização da str do timer
        if(UI_timerNum != level_data.timer && level_data.running){
            
            UI_timerNum = level_data.timer   
            this.timer.setText( UI_timerNum < 10 ? `0${UI_timerNum}` : `${UI_timerNum}`)
        }
    }

    displayElement(element){    // Torna a Caixa de dialogos visivel
    let alpha = element.alpha
        if(alpha == 0){//  Se não ha caixa de dialogo
            //FADE IN
            let fadeIn = this.time.addEvent(
            {
                delay: 50,
                callback: () => {
                    if(alpha >= 1){
                        element.setAlpha(1)
                        this.time.removeEvent(fadeIn)
                        return
                    }
                    alpha += 0.1
                    element.setAlpha(alpha)
                },
                loop: true
            })
        }
        return
    }

    hideElement(element){      // Retira a visibilidade da caixa de Dialogo
        let alpha = element.alpha
        if(alpha == 1){//  Se há uma caixa de dialogo na tela
            //FADE OUT
            let fadeOut = this.time.addEvent(
            {
                delay: 50,
                callback: () => {
                    if(alpha <= 0){
                        element.setAlpha(0)
                        this.time.removeEvent(fadeOut)
                        return
                    }
                    alpha -= 0.1
                    element.setAlpha(alpha)
                },
                loop: true
            })
        }

        return
    }
}

const addToUIQueue = (text, align) => GameBackground.prototype.addToQueue(queue, text, align)
export{
    GameBackground,
    queue,
    addToUIQueue
}