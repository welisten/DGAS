// CLASS
// import { Game } from "./Game.js";
// GAME DATA
import { gameData } from "../../Constants/gameData.js";

// ASSETS DATA
// import { generalImgDtArr, animalsImgDtArr} from "../../Constants/ImagesData.js";
// import { audioDataArr } from "../../Constants/songsData.js";

// CONSTANTS
import { colors } from "../../Constants/colors.js";

let store;

class Preloader{
    constructor(){
        this.intro = null // aqui posteriormente irá entrar uma classe referente a uma introdução (instruçãoes por exemplo)
        this.phaserGame = null
        this.assetsControls = {}
        this.setPreloader()

        document.title = 'Página de carregamento'
        if(!gameData.isDarkMode) document.body.style.backgroundColor = `${colors.bg_light}`
    }

    setPreloader(){
        let ruleW = window.screen.width > 2000 ? window.screen.width * 0.4  : window.screen.width > 1500 ? window.screen.width * 0.65 : window.screen.width * 0.60
        const gContainerWidth  = `${ruleW}px`     
        const gcontainerHeight  = window.screen.height * 0.613

        const parent = document.querySelector('#loading')
        parent.style.width = gContainerWidth
        parent.style.height = gcontainerHeight
        
        const config = {
            type: Phaser.AUTO,
            width: gContainerWidth,
            height: gcontainerHeight,
            parent: parent,
            transparent: true,
            scene: {
                preload: this.preload,
            }
        }
        this.phaserGame = new Phaser.Game(config)               
    }
    preload(){
        let ruleW;
        const gameCanvas = this.sys.game.canvas
        
        ruleW = window.screen.width > 2000 ? window.screen.width * 0.4  : window.screen.width > 1500 ? window.screen.width * 0.65 : window.screen.width * 0.6
        
        const gContainerWidth  = ruleW        
        const gcontainerHeight  = window.screen.height * 0.613
        
        gameCanvas.id                       = 'jogo4_canvas'
        gameCanvas.style.border             = `10px solid ${colors.redDeep_main}`;
        gameCanvas.style.borderRadius       = "20px"
        
        // os assets devem ser armazenado no navegador
        window.gameAssets = {}
        store = window.gameAssets

        const progressBar = this.add.graphics()
        const progressBox = this.add.graphics()
        
        const loadingContainer = document.querySelector('#loading')
        
        loadingContainer.classList.toggle('active')
        
        progressBox.fillStyle('0xffffff', 1)
        progressBox.fillRoundedRect((gContainerWidth - (gContainerWidth * .8)) / 2 , gcontainerHeight * .479, gContainerWidth * .8, 20, 5)
        progressBox.lineStyle(5, '0xffffff', 1)
        progressBox.strokeRoundedRect((gContainerWidth - (gContainerWidth * .8)) / 2 , gcontainerHeight * .479, gContainerWidth * .8, 20, 5)
        progressBox.setDepth(9)
        progressBar.setDepth(10)
        
        const getImage = (key) => { // retorna a url
            return this.textures.get(key).getSourceImage()
        }
        const getAudio = (key) => {// retorna audioBuffer
            return this.cache.audio.get(key)
        }


        this.load.on('progress', value => {
            
            progressBar.clear();
            progressBar.fillStyle(0xabed3f, 1);
            progressBar.fillRoundedRect((gContainerWidth - (gContainerWidth * .81)) / 2 + gContainerWidth * .01 , gcontainerHeight * .479 + 3.5, (gContainerWidth * .79) * value, 14, 2)

        })
        
        function criarObjeto(object, key, callback){ // object pode ser retirado e substituido por store(global) internamente na função
            object[key] = callback
        }

        this.load.on('filecomplete', (key) => {
            console.log(`O arquivo "${key}" foi carregado`)
        })

        this.load.on('complete',  () => {
            let textToReaderEl

            audioDataArr.forEach( dataObj => criarObjeto(store, dataObj.name, getAudio(dataObj.name)))
            for(let dataObj of generalImgDtArr){
                criarObjeto(store, dataObj.name, getImage(dataObj.name))
            }

            textToReaderEl = document.querySelector('.textToReader')
            textToReaderEl.textContent = "carregamento concluido"
            this.time.delayedCall(1000, () => {
                progressBar.destroy()
                progressBox.destroy()

                loadingContainer.classList.toggle('active')
                loadingContainer.remove()
                gameCanvas.remove()
                
                gameData.mainScene = 'Game'
                console.clear()
                gameData.app = new Game()
            })
        })

        for(let dataObj of generalImgDtArr){
            this.load.image(dataObj.name, dataObj.src)
        }

        for(let dataObj of animalsImgDtArr){
            this.load.image(dataObj.name, dataObj.src)
        }

        audioDataArr.forEach((dataObj) => {
            this.load.audio(dataObj.name, dataObj.src)
        })
        
    }

    getIntro(){//future
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


