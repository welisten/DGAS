// CLASS
import { App } from "./Game.js";
// GAME DATA
import { gameData } from "../../Constants/gameData.js";

// ASSETS DATA
import { generalImageDataArray } from "../../Constants/ImagesData.js";
import { audioDataArray } from "../../Constants/songsData.js";

// CONSTANTS
import { general_colors, palett } from "../../../../Constants/colors.js";
import { platformData } from "../../../../Constants/platformData.js";

let store, gameCanvas;

class Preloader{
    constructor(){
        this.intro = null // aqui posteriormente irá entrar uma classe referente a uma introdução (instruçãoes por exemplo)
        this.phaserGame = null
        this.assetsControls = {}
        this.setPreloader()

        document.title = 'Página de carregamento'
        if(!platformData.isDarkMode) document.documentElement.setProperti('--bg--', general_colors.bg_light)
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
        // os assets devem ser armazenado globalmente no navegador
        window.gameAssets   = {}
        store               = window.gameAssets
        
        gameCanvas = this.sys.game.canvas
        setCanvasStyle(gameCanvas)
        
        const loadingContainer = document.querySelector('#loading')
        loadingContainer.classList.add('active')
        
        const getImage = (key) => { // retorna a url
            return this.textures.get(key).getSourceImage()
        }
        const getAudio = (key) => {// retorna audioBuffer
            return this.cache.audio.get(key)
        }
        function saveOnStore(object, key, callback){ // object pode ser retirado e substituido por store(global) internamente na função
            object[key] = callback
        }

        this.load.on('filecomplete', (key) => {
            console.log(`O arquivo "${key}" foi carregado`)
        })

        this.load.on('complete',  () => {
            let textToReaderEl, pElemCarregando

            audioDataArray.forEach( dataObj => saveOnStore(store, dataObj.name, getAudio(dataObj.name)))
            
            for(let dataObj of generalImageDataArray){
                saveOnStore(store, dataObj.name, getImage(dataObj.name))
            }

            textToReaderEl = document.querySelector('.textToReader')
            pElemCarregando = document.querySelector('#p-carregando')

            textToReaderEl.textContent = "carregamento concluido"
            pElemCarregando.setAttribute('aria-buzy', false)
            
            this.time.delayedCall(1000, () => {
                loadingContainer.classList.remove('active')
                loadingContainer.remove()
                gameCanvas.remove()
                
                gameData.mainScene = 'Game'
                // console.clear()
                gameData.app = new App()
            })
        })

        for(let dataObj of generalImageDataArray){
            this.load.image(dataObj.name, dataObj.src)
        }

        audioDataArray.forEach((dataObj) => {
            this.load.audio(dataObj.name, dataObj.src)
        })
        
    }
}

function setCanvasStyle(elem){
    elem.id                       = 'jogo4_canvas'
    elem.style.border             = `10px solid ${palett.dark_4}`;
    elem.style.borderRadius       = "20px"  
}


export{
    Preloader
}


