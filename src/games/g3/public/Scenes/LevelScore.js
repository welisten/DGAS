import { colors } from "../Consts/Colors.js"
import { generalImagesDataArr } from "../Consts/Values.js"
import { gameData } from "../script.js"

class LevelScore{
    constructor(father, name, time, level, gainNode, audioContext, game ){
        this.father = father
        this.element = ''
        this.userName = name[0].toUpperCase() + name.slice(1).toLowerCase()
        this.userTime = time
        this.userLevel = level
        this.game = game
        this.audioContext = audioContext                             // ASIDE GAME ACCESSIBLE CONTAINER

        this.songVictory =  gameAssets['victory']
        this.songApplause = gameAssets['aplause']
        this.transitionSong = gameAssets['transition']
        this.currentAudio = []
        this.gainNode = gainNode

        this.playAudio( this.songVictory, 1.0, true )
        this.playAudio( this.songApplause, 1.0, true )
        this.generatePainel()
        gameData.class = 'LevelScore'

    }

    generatePainel(){                                                           //CRIA OS ELEMENTOS DOM DO PAINEL DO SCORE (INCLUINDO O HEADER)    
        const container = document.createElement('div')
        const painelHeader = document.createElement('p')
        const title = document.createElement('span')
        const painelBody = document.createElement('p')
        const painelFooter = document.createElement('div')
        
        this.element = document.createElement('div')
        this.element.setAttribute('id', 'levelScore')
        this.element.classList.add('levelScore')
        
        container.classList.add('scoreContainer')
        painelHeader.classList.add('scoreHeader')
        title.classList.add('scoreTitle')
        title.classList.add('FIT')
        painelBody.classList.add('scoreBody')
        painelFooter.classList.add('scoreFooter')
        
        container.setAttribute('tabindex','2')
        container.setAttribute('aria-label','Placar')
        painelHeader.setAttribute('tabindex','3')
        painelHeader.setAttribute('aria-label',`Parabens ${this.userName} !`)
        painelBody.setAttribute('tabindex','4')

        if(gameData.isDarkMode){
            painelBody.style.background = 'none'
        }else{
            painelBody.style.background = colors.light_blue_9c
        }

        painelHeader.appendChild(title)
        container.appendChild(painelHeader)
        container.appendChild(painelBody)
        container.appendChild(painelFooter)
        this.element.appendChild(container)
        this.father.appendChild(this.element)

        title.textContent = `Parabéns ${this.userName}`
        this.fitTextContect('.scoreTitle')
        
        this.generateBody(painelBody)
        this.generateFooter(painelFooter)
    }
    generateBody(father){               // PREENCHE OS ELEMENTOS DO CORPO DO PAINEL
        const star1Container = document.createElement('div')
        const star2Container = document.createElement('div')
        const star3Container = document.createElement('div')

        let [star1, star2, star3, golden] = this.handleScore(this.userTime, this.userLevel)
        if(gameData.isScreenReaderActive || gameData.isLibrasActive) golden = 3
       
        father.setAttribute('aria-label', `Você conseguiu ${golden} estrelas`)
       
        star1Container.classList.add('star1')
        star2Container.classList.add('star2')
        star3Container.classList.add('star3')

        star1Container.appendChild(star1)
        star2Container.appendChild(star2)
        star3Container.appendChild(star3)

        father.appendChild(star1Container)
        father.appendChild(star2Container)
        father.appendChild(star3Container)

    }
    generateFooter(father){             // PREENCHE OS ELEMENTOS DO RODAPÉ DO PAINEL
        const btnsContainer = document.createElement('div')
        const gameInfo = document.createElement('div')

        gameInfo.classList.add('footerInfo')
        const timeInfo = document.createElement('p')
        const levelInfo = document.createElement('p')

        levelInfo.classList.add('levelInfo')
        timeInfo.classList.add('timeInfo')
        
        levelInfo.innerHTML = `Level <span>${this.userLevel}</span>`
        timeInfo.innerHTML = `<span>${this.userTime}s</span>`

        levelInfo.setAttribute('tabindex','5')
        levelInfo.setAttribute('aria-label', `na fase ${this.userLevel}`)
        
        let timeInSec = this.game.gameDisplay.header.getTimer()
        let timeInMin;
        let restInSec;

        if(timeInSec > 60){
            timeInMin = Math.floor(timeInSec / 60)
            restInSec = timeInSec % 60
        }
        timeInfo.setAttribute('tabindex','6')
        timeInfo.setAttribute('aria-label',`em ${timeInMin ? `${timeInMin} minuto ${restInSec ? `e ${restInSec}` : ''}` : timeInSec} segundos`)

        const levelImg = document.createElement('img')
        const clockImg = document.createElement('img')
        const level_OBJ = generalImagesDataArr.find(obj => obj.name === 'level')
        const clock_OBJ = generalImagesDataArr.find(obj => obj.name === 'clock')
       
        levelImg.src = level_OBJ.src
        clockImg.src = clock_OBJ.src
        levelImg.alt = level_OBJ.description
        clockImg.alt = clock_OBJ.description
        
        levelInfo.appendChild(levelImg)
        timeInfo.appendChild(clockImg)

        gameInfo.appendChild(levelInfo)
        gameInfo.appendChild(timeInfo)

        btnsContainer.classList.add('btnsContainer')
        const btnReplay = document.createElement('button')
        const btnNext = document.createElement('button')
        
        btnReplay.classList.add('btnReplay')
        btnReplay.classList.add('fa-solid')
        btnReplay.classList.add('fa-repeat')

        btnNext.classList.add('btnNext')
        btnNext.classList.add('fa-solid')
        btnNext.classList.add('fa-forward')
        
        btnReplay.setAttribute('tabindex', '7')
        btnReplay.setAttribute('aria-label', `Jogar Novamente`)
        btnReplay.setAttribute('title', `Novamente jogar`)
        btnNext.setAttribute('tabindex', '8')
        btnNext.setAttribute('aria-label', `Jogar próxima fase (momentaneamente indisponível)`)
        btnNext.setAttribute('title', `Jogar próxima fase (indisponível no momento)`)

        btnsContainer.appendChild(btnReplay)
        btnsContainer.appendChild(btnNext)
  
        father.appendChild(gameInfo)
        father.appendChild(btnsContainer)

        let auxContrl = ''

        btnReplay.addEventListener('mouseover', (e) => {
          if(auxContrl === e.target) return
          if(gameData.isLibrasActive)
            gameData.intro.gameAcessibleDisplay.readWithAccessibility(`${e.target.title}`)
      
          setTimeout(() => auxContrl =  '', 1000)
        })
        btnNext.addEventListener('mouseover', (e) => {
          if(auxContrl === e.target) return
          if(gameData.isLibrasActive)
            gameData.intro.gameAcessibleDisplay.readWithAccessibility(`${e.target.title}`)
      
          setTimeout(() => auxContrl =  '', 1000)
        })

        btnReplay.addEventListener('click', (e) => {
            let delay = gameData.isScreenReaderActive || gameData.isLibrasActive  ? 4500 : 1000

            if(gameData.isScreenReaderActive || gameData.isLibrasActive){
                let aux = 3
                let verb = gameData.isLibrasActive ? 'começou' : 'começa em'
                this.readText(`O jogo ${verb}`, false)
                gameData.intro.gameAcessibleDisplay.readWithAccessibility(`O jogo ${verb}`)
                setTimeout(() => {
                    let countdown = setInterval(() => {
                        if(aux <= 0 || gameData.isLibrasActive) {
                            clearInterval(countdown)
                            
                            return
                        }else if(aux === 1){
                            this.stopCurrentAudio()
                            this.playAudio(this.transitionSong)
                        }
                        this.readText(aux, false)
                        gameData.intro.gameAcessibleDisplay.readWithAccessibility(aux)
                        aux--
                    }, 1000)
                }, 500)
            }else{
            this.stopCurrentAudio()
            this.playAudio(this.transitionSong)
            }

            setTimeout(() => {
                const gameBoard = document.getElementById('gameBoard')
            
                gameBoard.style.display = "grid"
                this.element.style.display = 'none'
                
                this.game.gameDisplay.body.reset()
                this.game.presetGameElements()
                this.game.replayGame()
            }, delay)
        })

        btnNext.addEventListener('click', () => {
            this.popUpMessage('A fase 2 está momentaneamente indisponível. Aguarde as próximas atualizações', '.btnReplay', 6000)
            if(this.userLevel < gameData.lastLevel) this.game.user.updateUser()
        })
    }
    popUpMessage(message, nxtElem, delay = 2500, isVisible = true, chaining = false){   // EXIBE MENSAGEM NO POPUP VISÍVEL
        const popUp = document.getElementById('popUp')
        const popupText = document.querySelector('.popupText')
        const nextFocusElement = document.querySelector(nxtElem)
        let display = popUp.style.display
        
        if(display != 'flex')   popUp.style.display = 'flex'
        if(isVisible)
            popUp.style.opacity = 1
        
        if(!chaining)
            popupText.textContent = ''

        popupText.setAttribute('tabindex', 1)
        popupText.textContent = message
        popupText.focus() 
        
        if(isVisible)
            setTimeout(() => {
                popUp.style.opacity = 0
                popUp.style.display = 'none'
            }, delay - 1000)
        
        if(nxtElem && gameData.isScreenReaderActive)
            setTimeout(() => nextFocusElement.focus(), delay + 100)
        
        
    }
    handleScore(time, level){ //DEFINE AS ESTRELAS NO CORPO DO PAINEL
        const userTime = time
        const factor = Number(level)
        const maxTime = 100
        const minTime = maxTime - (10 * factor)

        let star1 = document.createElement('img')
        let star2 = document.createElement('img')
        let star3 = document.createElement('img')

        let goldenStar_src = generalImagesDataArr.find(obj => obj.name === 'golden star').src
        let steelStar_src = generalImagesDataArr.find(obj => obj.name === 'steel star').src
        
        function getstars(userTime, minTime, maxTime){
            if(userTime <= minTime) return 3
            if(userTime <= minTime + 10) return 2
            if(userTime <= maxTime) return 1
            return 0
        }
        let goldenStars = getstars(userTime, minTime, maxTime)

        if(!gameData.isScreenReaderActive && !gameData.isLibrasActive){

            star1.src =  goldenStars >= 1 ? goldenStar_src : steelStar_src
            star2.src =  goldenStars >= 2 ? goldenStar_src : steelStar_src
            star3.src =  goldenStars >= 3 ? goldenStar_src : steelStar_src

            return [star1, star2, star3, goldenStars];
        } else {
            star1.src =  goldenStar_src
            star2.src =  goldenStar_src
            star3.src =  goldenStar_src
            goldenStars = 3

            return [star1, star2, star3, goldenStars];
        }
    }
    getImage(name){                 // RETORNA A IMAGEM DO OBJ GLOBAL, ARMAZENADA NO PRELOAD (BLOB)
        return gameAssets[name]
    }
    fitTextContect(identificador){ // IDENTIFICA OVERFLOW DE TEXTO EM RELAÇÃO AO SEU PAI E CORRIGE TAMANHO DA FONTE
        const elem = document.querySelector(identificador)
        const parent = elem.parentNode
        const parentHeight = parent.offsetHeight
        const parentWidth = parent.offsetWidth
        elem.style.transition = 'none'
        elem.style.fontSize = `11rem`
        if((elem.offsetHeight * 1.2) > (parentHeight) || (elem.offsetWidth * 1.2) > parentWidth){
            $(document).ready(function(){
                $(identificador).fitText(1.5)
            })
        }
    }
    destroyScore(){ // ELIMINA ELEMENTO E SEUS FILHOS
        this.element.style.display = 'none'
        this.father.remove(this.element)
    }
    playAudio(audioBuffer, volume = 1.0, loop = false){
        const src = this.audioContext.createBufferSource()
        src.buffer = audioBuffer
        src.loop = loop

        volume = gameData.isMute === true ? 0 : 1
        this.gainNode.gain.value = volume 
        
        src.connect(this.gainNode)
        this.gainNode.connect(this.audioContext.destination)
        src.start()
        if(loop === true )this.currentAudio.push(src)
    }
    stopCurrentAudio(){
        if(this.currentAudio.length > 0) {
            this.currentAudio.forEach(audio => audio.stop())
            this.currentAudio = []
        }
    }
    readText(text, focusEle = null ,textChaining = false){                                       // LIDA COM TEXTOS DE LEITURA ACESSÍVEL IMEDIATA
        if(gameData.lastAccText === text) text += `.`
        const textToReaderEl = document.querySelector('.textToReader')

        textToReaderEl.textContent = textChaining ? `${popupText.textContent} ${text}` : `${text}`
        if(focusEle) focusEle.focus()
        gameData.lastAccText = text
    } 
    toggleLight(){
        let scoreBody = document.querySelector('.scoreBody')
        if(!scoreBody) return 

        if(gameData.isDarkMode){
            scoreBody.style.background = 'none'
        } else {
            scoreBody.style.background = colors.light_blue_9c
        }
    }
}

export{
    LevelScore
}