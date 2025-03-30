import { IntroForm } from "../Scenes/Form.js";
import { cardsImagesDataArr, generalImagesDataArr, audioDataArr } from "../Consts/Values.js";
import { colors } from "../Consts/Colors.js";
import { gameData } from "../script.js";
import { getDeviceSize } from "../../../g1/JavaScript/getDeviceSize.js";

class Preloader {
    constructor(){
        this.intro = null
        this.phaserGame = null
        this.assetsControls = {}
        this.setPreloader()
    }

    setPreloader(){
        let [containerWidth, containerHeight] = getDeviceSize()
        const parent = document.querySelector('#gameBoard')
        const config = {
            type: Phaser.AUTO,
            width: containerHeight,
            height: containerHeight,
            backgroundColor: gameData.isDarkMode ? colors.black : colors.blue_baby,
            parent: parent,
            scene: {
                preload: this.preload,
            }
        }

        this.phaserGame = new Phaser.Game(config)
    }
    preload(){
        const gameCanvas = this.sys.game.canvas

        gameCanvas.id = 'jogo2_canvas'
        gameCanvas.parentNode.style.display = 'flex'
        gameCanvas.style.border = `5px solid ${colors.blue_baby}`;
        gameCanvas.style.borderRadius = "20px"
        
        window.gameAssets = {}
        let store = window.gameAssets

        function criarObjeto(object, key, callback){
            object[key] = callback
        }
        const getImage = (key) => { // retorna a url
            return this.textures.get(key).getSourceImage()
        }
        const getAudio = (key) => {// retorna audioBuffer
            return this.cache.audio.get(key)
        }

        for(let dataObj of cardsImagesDataArr){
            this.load.image(`${dataObj.name}_1`, dataObj.src)
            this.load.image(`${dataObj.name}_2`, dataObj.src)

        }

        audioDataArr.forEach((dataObj) => {
            this.load.audio(dataObj.name, dataObj.src)
        })
        let [width, height] = getDeviceSize()
        let containerWidth = height
        
        const logoImg =  document.querySelector(".logo")
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        
        logoImg.classList.add('active')
        logoImg.style.height =` ${containerWidth * 0.65}px`

        progressBox.fillStyle('0xffffff', 1);
        progressBox.fillRoundedRect((containerWidth - (containerWidth * .8)) / 2 , containerWidth * .85, containerWidth * .8, 20, 15);
        progressBox.lineStyle(5, '0xffffff', 1);
        progressBox.strokeRoundedRect((containerWidth - (containerWidth * .8)) / 2 , containerWidth * .85, containerWidth * .8, 20, 15);
        progressBox.setDepth(1)
        progressBar.setDepth(2)
        
        const loadingText = this.make.text({
            x: containerWidth / 2,
            y: containerWidth * .8,
            text: 'Loading...',
            style: {
            font: '20px monospace',
            fill: '#ffffff'
        }
        });
        loadingText.setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
            progressBar.clear();
            progressBar.fillStyle(0x3498db, 1);
            progressBar.fillRoundedRect((containerWidth - (containerWidth * .8)) / 2 + containerWidth * .01 , containerWidth * .85 + 5, (containerWidth * .78) * value, 10, 5);
        });
        this.load.on('complete',  () => {
            gameData.isPreloadComplete = true
            
            const textToReaderEl = document.querySelector('.textToReader')
            const controls = document.querySelector('#gameControls')
            const asideDisplay = document.querySelector('#gameBoard_aside')
            const mainDisplay = document.querySelector('#game_Container')
            
            textToReaderEl.textContent = 'O jogo foi carregado com sucesso.'
            audioDataArr.forEach( dataObj => criarObjeto(store, dataObj.name, getAudio(dataObj.name)))
            for(let dataObj of cardsImagesDataArr){
                criarObjeto(store, `${dataObj.name}_1`, getImage(`${dataObj.name}_1`))
                criarObjeto(store, `${dataObj.name}_2`, getImage(`${dataObj.name}_2`))
            }
            setTimeout(() => {
                controls.style.display = 'flex'
                asideDisplay.style.display = 'flex'
                mainDisplay.style.display = 'flex'
                

                progressBar.destroy();
                progressBox.destroy();
                loadingText.destroy();
                gameCanvas.remove()
                logoImg.classList.remove('actvive')
                logoImg.remove()

                gameData.intro =  new IntroForm()
            }, 500)
        });
    }

    getIntro(){
        if (this.intro) {
            console.log('Starting the game with intro:', this.intro);
        } else {
            console.log('Intro is not initialized yet');
        }
    }
}


export{
    Preloader
}


