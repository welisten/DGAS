// CLASES
import  { MemoryGame } from './Game.js';
import  { GameDisplay } from '../Class/GameDisplay.js'
import  { GameAcessibleDisplay} from '../Class/GameAccessible.js'
// DATA
import  { colors } from '../Consts/Colors.js';
import  { gameData } from '../script.js';

class IntroForm {
    constructor(){
        this.element = ''                              // SCENE (MAIN CONTAINER)
        this.gameDisplay   = 'undefined'               // ASIDE GAME DISPLAY iNFO
        this.gameAcessibleDisplay   = 'undefined'      // ASIDE GAME DISPLAY ACCESSIBILITY
        this.isActive = false 

        this.audioContext = new (window.AudioContext || window.webkitAudioContext)()//rever propriedade do obj          ASIDE GAME ACCESSIBLE CONTAINER
        this.ucarineSong    = gameAssets['ucarine']
        this.transitionSong = gameAssets['transition']
        this.errorSong      = gameAssets['incorrect']
        this.currentAudio = null
        this.gainNode = this.audioContext.createGain()

        this.generateScene()
        gameData.class = 'IntroForm'
    }

    generateScene(){                            // CHAMADA DAS FUNÇOES CRIADORAS E CONFIGURADORAS DA CENA
        document.getElementById('gameBoard').style.display = 'none'

        this.playAudio(this.ucarineSong, 1, true)
        
        this.generateForm()
        this.generateAside()
        this.setControlsBtn()
        this.isActive = true
    }
    generateForm(){                             // CRIA OS ELEMENTOS DO FORMULÁRIO
        this.element = document.getElementById('introFormContainer')            
        // LEVAR EM CONSIDERAÇÃO O USO OU NÃO USO DE UM BANCO DE DADOS
        const introForm = document.createElement('form')
        const formTitle = document.createElement('p')
        const formBody = document.createElement('div')
        const nameLabel = document.createElement('label')
        const nameInput = document.createElement('input')
        const startBtn  = document.createElement('button')
                                                                                // CONFIGURA OS ATRIBUTOS
        formTitle.setAttribute('tabindex', '2')                                 // Acessibilidade
        formTitle.setAttribute('aria-label', "Olá, vamos começar digitando o seu nome")

        nameInput.setAttribute('tabindex', '2')
        nameInput.setAttribute('aria-label', 'Digite seu nome')
        nameInput.setAttribute('aria-required', 'true')

        startBtn.setAttribute('tabindex', '2')
        startBtn.setAttribute('aria-label', 'Iniciar')

        introForm.classList.add('introForm')                                    // classes
        formTitle.classList.add('formTitle')
        nameInput.classList.add('nameInput')
        nameLabel.classList.add('nameLabel')
        formBody.classList.add('formBody')
        startBtn.classList.add('startBtn')
        nameLabel.setAttribute('for', 'user_name') 
        
        nameLabel.title = "Digite seu nome"                                     // outros
        nameInput.type = 'text'
        nameInput.name = 'user_name'
        nameInput.placeholder = 'Digite seu nome'
        nameInput.id = 'user_name'
        
        formTitle.textContent = ''
        nameLabel.textContent =  'Nome :'
        startBtn.textContent = 'iniciar'

        formBody.appendChild(nameLabel)                                         // APPEND OS ELEMENTOS
        formBody.appendChild(nameInput)
        formBody.appendChild(startBtn)
        introForm.appendChild(formTitle)
        introForm.appendChild(formBody)
        this.element.appendChild(introForm)
        
        this.handleElements()                                                   // CONFIGURA COMPORTAMENTO DINÂMICO DOS ELEMENTOS
        this.typewriter('Olá ! Vamos começar digitando o seu nome.', formTitle)

    }
    generateAside(){                            // CRIA OS ELEMENTOS DA SEÇÃO AO LADO DO CONTAINER DO JOGO
        const gameBoard_aside = document.getElementById('gameBoard_aside')
        
        this.gameDisplay = new GameDisplay(gameBoard_aside)
        this.gameAcessibleDisplay = new GameAcessibleDisplay(gameBoard_aside)
    }
    setControlsBtn(){                           // CONFIGURA AS AÇOES DOS config_btn PARA COM O ELEMENTOS RECÉM CRIADOS
        const mute_btn = document.querySelector('.mute_btn')
        mute_btn.addEventListener('click', () => {
            this.gainNode.gain.value == 1 ? this.gainNode.gain.value = 0 : this.gainNode.gain.value = 1
        })
    }
    changeToAccessibility(){                //  TOGGLEACCESSIBILITY
        const formBodyEl = document.querySelector('.formBody')
        const formLabel =  document.querySelector('.nameLabel')
        const formInput =  document.querySelector('.nameInput')

        formBodyEl.classList.toggle('accessible')
        if(formBodyEl.classList.contains('accessible')){
            formLabel.innerHTML = 'Digite seu Nome:'
            formInput.placeholder = 'Nome'
            formLabel.style.transform = 'translateY(0)'
            formLabel.style.color = colors.white
            formInput.style.color = colors.black
        }else{
            formLabel.innerHTML = 'Nome:'
            formInput.placeholder = 'Digite seu Nome'
            formLabel.style.transform = 'translateY(5.5vh)'
            formLabel.style.color = colors.black
            formInput.style.color = colors.black
        }
    }

    handleElements(){                           // CONFIGURA COMPORTAMENTO DINAMICO DOS ELEMENTOS DO FORMULARIO
        const nameInput = document.querySelector('.nameInput')
        const nameLabel = document.querySelector('.nameLabel')
        const startBtn  = document.querySelector('.startBtn')
        const introForm = document.querySelector('.introForm')
        
        nameInput.addEventListener('focus', ()=>{
            if(gameData.isLibrasActive) return
            nameLabel.style.transform = 'translateY(0)'
            nameLabel.style.color = colors.white
        })
        nameInput.addEventListener('blur', ()=>{
            if(!nameInput.value && !gameData.isLibrasActive){
                nameLabel.style.transform = 'translateY(5.5vh)'
                nameLabel.style.color = colors.black
            }
        })
        
        startBtn.addEventListener('click', (e) => {
            e.preventDefault()
            if(nameInput.value){
                let delay = gameData.isScreenReaderActive || gameData.isLibrasActive  ? 4500 : 1000

                if(gameData.isScreenReaderActive || gameData.isLibrasActive){
                    let aux = 3
                    let verb = gameData.isLibrasActive ? 'começou' : 'começa em'
                    this.readText(`O jogo ${verb}`, false)
                    setTimeout(() => {
                        let countdown = setInterval(() => {
                            console.log(aux)
                            if(aux <= 0) {
                                clearInterval(countdown)
                                
                                return
                            }else if(aux == 1){
                                this.stopCurrentAudio()
                                this.playAudio(this.transitionSong)
                            }
                            this.readText(aux, false)
                            aux--
                        }, 1000)
                    }, 500)

                }else{
                    this.stopCurrentAudio()
                    this.playAudio(this.transitionSong)
                }
                setTimeout(() => {
                    this.isActive =  false
                    const game = new MemoryGame(16, nameInput.value, this.gameDisplay, this.gainNode, this.audioContext)
                    this.element.style.display = "none"
                    document.querySelector('#popUp').style.opacity = 0

                    game.startGame()
                }, delay)

            }else{
                let delay = gameData.isLibrasActive ? null : 2500
                let focus = gameData.isLibrasActive ? null : '.nameInput'
                let popUpEl = document.querySelector('#popUp')

                popUpEl.style.display = 'flex'
                popUpEl.classList.add('animated')
                setTimeout(() => popUpEl.classList.remove('animated'), 1000)
                
                this.playAudio(this.errorSong)

                this.popUpMessage('Digite um nome válido', focus, delay, true, true)
            }
        })
    }
    typewriter(text, container){                // EFEITO MAQUINA DE ESCREVER PARA TEXTO SENDO MOSTRADO EM UM CONTAINER
        let node = 0
        let titleArr = text
        let writerDelay = 50
        
        setTimeout(() => {
            function tWriter(){//RECURSIVIDADE
                if(node >= titleArr.length){//PONTO DE PARADA
                    if(gameData.isScreenReaderActive){
                        document.querySelector('.formTitle').focus()
                    }
                    return
                }
                                                
                let currentChar = titleArr[node]            // EXECUÇÃO
                container.textContent += currentChar 
                node++                                   //ATUALIZAÇÃO DO NÓ
                
                let delay = writerDelay                 //ATUALIZAÇÃO DO PARAMETRO
                if(currentChar == '.' || currentChar == '!' || currentChar == '?' || currentChar == ',')
                    delay = 500
                setTimeout(tWriter, delay)           //CHAMADA RECURSIVA
            }
        tWriter()
        }, 2000)
    }
    toggleLight(){                              // ALTERNA COR DOS ELEMENTOS
        const form = document.querySelector('.introForm')
        const lightMode_btn = document.querySelector('.lightMode_btn')

        if(lightMode_btn.classList.contains('active')){
            this.element.style.backgroundColor =  colors.black
            form.style.backgroundColor =  colors.transparent_a23
            form.style.boxShadow = `0 0 .5em ${colors.blue_serius_ac7}`
            // console.log('active')
        }
        else
        {
            this.element.style.backgroundColor = colors.white
            form.style.backgroundColor = colors.blue_baby
            form.style.boxShadow ='none'
            // console.log('not active')

        }
    }
    popUpMessage(message, nxtElem, delay = 2500, isVisible = true, isDurable = false, chaining = false){   // EXIBE MENSAGEM NO POPUP VISÍVEL
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
        if(gameData.isLibrasActive)
            gameData.intro.gameAcessibleDisplay.readWithAccessibility(message)
        
        if(!isDurable)
            setTimeout(() => {
                popUp.style.opacity = 0
                popUp.style.display = 'none'
            }, 1500)
        
        if(nxtElem && delay)
            setTimeout(() => nextFocusElement.focus(), delay + 100)
        
        
    }
    readText(text, textChaining = false){                                       // LIDA COM TEXTOS DE LEITURA ACESSÍVEL IMEDIATA
        const textToReaderEl = document.querySelector('.textToReader')

        textToReaderEl.textContent = textChaining ? `${popupText.textContent} ${text}` : `${text}`
        if(gameData.isLibrasActive || gameData.isLibrasActive)
        gameData.intro.gameAcessibleDisplay.readWithAccessibility(text)

    }

    playAudio(audioBuffer, volume = 1.0, loop = false){         //INICIA MÚSICA
        const src = this.audioContext.createBufferSource()
        let aux = volume
        src.buffer = audioBuffer
        src.loop = loop

        volume = gameData.isMute === true ? 0 : aux
        this.gainNode.gain.value = volume 
        
        src.connect(this.gainNode)
        this.gainNode.connect(this.audioContext.destination)
        src.start()
        if(loop === true) this.currentAudio = src
    }
    stopCurrentAudio(){                                         //PAUSA OS AUDIOS QUE ESTÃO SENTO TOCADOS
        if(this.currentAudio) {
            this.currentAudio.stop()
            this.currentAudio = null
        }
    }
}

export{
    IntroForm
}