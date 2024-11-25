// CLASS
import { App } from "./Game.js";
// GAME DATA
import { gameData } from "../../Constants/gameData.js";

// ASSETS DATA
import { generalImgDtArr, handsImgDtArr, lettersImgDtArr, wordsImgDtArr, vocabularyImgDtArr } from "../../Constants/ImagesData.js";
import { audioDataArr } from "../../Constants/songsData.js";

// CONSTANTS
import { colors } from "../../Constants/Colors.js";

let store;
class Preloader{
    constructor(){
        this.intro = null // aqui posteriormente irá entrar uma classe referente a uma introdução (instruçãoes por exemplo)
        this.phaserGame = null
        this.assetsControls = {}
        this.setPreloader()

        document.title = 'Carregando...'
        if(!gameData.isDarkMode) document.body.style.backgroundColor = `${colors.bg_light}`
    }

    setPreloader(){
        let ruleW = window.innerWidth > 2000 ? window.innerWidth * 0.40 : window.innerWidth > 1500 ? window.innerWidth * 0.65 : window.innerWidth * 0.55

        const gContainerWidth  = Math.floor(ruleW)
        const gcontainerHeight  = window.innerHeight * 0.7
        const parent = document.querySelector('#logoContainer')
        const config = {
            type: Phaser.AUTO,
            width: gContainerWidth,
            height: gcontainerHeight,
            parent: parent,
            scene: {
                preload: this.preload,
            }
        }

        this.phaserGame = new Phaser.Game(config)               //**
    }
    preload(){
        const gameCanvas = this.sys.game.canvas

        gameCanvas.id                       = 'jogo3_canvas'
        gameCanvas.style.border             = `10px solid ${colors.letter_c2}`;
        gameCanvas.style.borderRadius       = "20px"
        
        // os assets devem ser armazenado no navegador
        window.gameAssets = {}
        store = window.gameAssets

        let ruleW = window.innerWidth > 2000 ? window.innerWidth * 0.40 : window.innerWidth > 1500 ? window.innerWidth * 0.65 : window.innerWidth * 0.55

        const gContainerWidth  = Math.floor(ruleW)        
        const gcontainerHeight  = window.innerHeight * 0.7

        const progressBar = this.add.graphics()
        const progressBox = this.add.graphics()
        const logoContainer = document.querySelector('.logo')
        
        logoContainer.classList.toggle('active')
        progressBox.fillStyle('0xfdfdfd', 1)
        progressBox.fillRoundedRect((gContainerWidth - (gContainerWidth * .8)) / 2 , gcontainerHeight * .85, gContainerWidth * .8, 20, 15)
        progressBox.lineStyle(5, '0xfdfdfd', 1)
        progressBox.strokeRoundedRect((gContainerWidth - (gContainerWidth * .8)) / 2 , gcontainerHeight * .85, gContainerWidth * .8, 20, 15)
        progressBox.setDepth(1)
        progressBar.setDepth(2)
        
        const loadingText = this.make.text({
            x: gContainerWidth / 2,
            y: gcontainerHeight * .8,
            text: 'Carregando...',
            style: {
            font: '30px monospace',
            fill: '#ffffff'
        }
        })
        loadingText.setOrigin(0.5, 0.5)
        
        const getImage = (key) => { // retorna a url
            return this.textures.get(key).getSourceImage()
        }
        
        const getAudio = (key) => {// retorna audioBuffer
            return this.cache.audio.get(key)
        }
        this.load.on('progress', value => {
            progressBar.clear();
            progressBar.fillStyle(0xf2dd04, 1);
            progressBar.fillRoundedRect((gContainerWidth - (gContainerWidth * .8)) / 2 + gContainerWidth * .01 , gcontainerHeight * .85 + 3.5, (gContainerWidth * .78) * value, 14, 7)
        })
        
        function criarObjeto(object, key, callback){ // object pode ser retirado e substituido por store(global) internamente na função
            object[key] = callback
        }

        this.load.on('filecomplete', (key) => {
            console.log(`O arquivo "${key}" foi carregado`)
        })

        this.load.on('complete',  () => {
            audioDataArr.forEach( dataObj => criarObjeto(store, dataObj.name, getAudio(dataObj.name)))
            for(let dataObj of generalImgDtArr){
                criarObjeto(store, dataObj.name, getImage(dataObj.name))
            }
            for(let dataObj of wordsImgDtArr){
                criarObjeto(store, dataObj.name, getImage(dataObj.name))
            }
            for(let dataObj of vocabularyImgDtArr){
                criarObjeto(store, dataObj.name, getImage(dataObj.name))
            }
            for(let i = 0 ; i < lettersImgDtArr.length; i++){
                criarObjeto(store, lettersImgDtArr[i].name, getImage(lettersImgDtArr[i].name))
                criarObjeto(store, handsImgDtArr[i].name, getImage(handsImgDtArr[i].name))

            }

            this.time.delayedCall(1000, () => {
                progressBar.destroy()
                progressBox.destroy()
                loadingText.destroy()

                logoContainer.classList.toggle('active')
                logoContainer.parentNode.remove()
                gameCanvas.remove()
                
                gameData.mainClass = 'App'
                console.clear()
                gameData.app = new App()
            })
        })

        for(let dataObj of generalImgDtArr){
            this.load.image(dataObj.name, dataObj.src)
        }
        for(let dataObj of wordsImgDtArr){
            this.load.image(dataObj.name, dataObj.src)
        }
        for(let dataObj of vocabularyImgDtArr){
            this.load.image(dataObj.name, dataObj.src)
        }

        for(let i = 0 ; i < lettersImgDtArr.length; i++){
            this.load.image(lettersImgDtArr[i].name, lettersImgDtArr[i].src)
            this.load.image(handsImgDtArr[i].name, handsImgDtArr[i].src)
        }

        audioDataArr.forEach((dataObj) => {
            this.load.audio(dataObj.name, dataObj.src)
        })

        
    }

    getIntro(){
        if (this.intro) {
            console.log('Starting the game with intro:', this.intro)
        } else {
            console.log('Intro is not initialized yet')
        }
    }
}


export{
    Preloader
}


