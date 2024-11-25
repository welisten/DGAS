import { gameData } from "../../Constants/gameData.js";

import { colors } from "../../Constants/Colors.js";
import { Sights } from "./Sights.js";
import { sightData } from "../../Constants/sightsData.js";


class Game {
    constructor(){

        this.element = document.querySelector('#game_container')
        this.element.classList.add('j4-hm')
        this.events = []
        this.sights = ['cutia', 'apa', 'concordia']
       
        this.currentAudio = {
            default: {
                config:{startTime: 0, pausedAt: 0},
                audio: undefined,
                // context: new (window.AudioContext || window.webkitAudioContext)()

            },
        }
        this.auxAudioaAmt = 0
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)()//rever propriedade do obj
        // this.gainNode = this.audioContext.createGain()
        this.frogTimer = undefined
        this.isTimeToChangeInstruc = false

        document.title = 'Vamos Explorar Guapimirim!'
        gameData.mainScene = 'Game'
        
        this.setSettingsControllers()
        this.start()
    }

    setSettingsControllers(){

        const muteBtn = document.querySelector('#muteBtn')
        const lightBtn = document.querySelector('#lightBtn')
        const infoBtn = document.querySelector('#infoBtn')
        const accessBtn = document.querySelector('#accessBtn')
        const closeBtn = document.querySelector('#t-close')
        const info = document.querySelector('#info')        
        const i_navBtns = document.querySelectorAll('.i-navBtn')
        const i_body = document.querySelectorAll('.i-body')

        setIcons()

        muteBtn.addEventListener('click', () => {
            this.toggleVolume()
        })

        lightBtn.addEventListener('click', () => {
            this.toggleLightMode()
        })

        infoBtn.addEventListener('click', () => {
                const main = document.querySelector('#main')
                const j4Bg = document.querySelector('#j4-bg')
                let titleText, subtitleText, body_iGame, body_iProposal;
                
                if(info.classList.contains("active")){
                    return
                }

                titleText = document.querySelector('.t-text')
                subtitleText = document.querySelector('.sub-tex')
                body_iGame = document.querySelector('.body-g')
                body_iProposal = document.querySelector('.body-p')
                
                if(gameData.mainScene === 'Game' ){
                    body_iProposal.classList.add('active')
                    body_iGame.classList.remove('active')  
                } else {
                    body_iProposal.classList.remove('active')
                    body_iGame.classList.add('active') 
                }
                main.classList.toggle('blur')
                j4Bg.classList.toggle('blur')
                info.classList.toggle('active')
                
                if(gameData.isAccess) titleText.focus();

                textFit(titleText)
        })

        accessBtn.addEventListener('click', () => {
            accessBtn.classList.toggle('active')
            gameData.isAccess = !gameData.isAccess

            accessBtn.children[0].classList.toggle('fa-regular')
            accessBtn.children[0].classList.toggle('fa-solid')
            
            if(accessBtn.classList.contains('active')){
                this.readText('O modo acessível foi ativado')
            } else {
                this.readText('O modo acessível foi desativado')
            }
        })


        closeBtn.addEventListener('click', () => {
            let choiceReq = document.querySelector('.hm-b-title')
            
            
            if(gameData.isAccess){
                this.readText('seção de instruções fechada.');
                if(choiceReq) setTimeout(() => choiceReq.focus(), 50)
            }
            
            const main = document.querySelector('#main')
            const j4Bg = document.querySelector('#j4-bg')
            const info = document.querySelector('#info')

            main.classList.toggle('blur')
            j4Bg.classList.toggle('blur')
            info.classList.toggle('active')
        })
        

        const keyboardInInstruc = (e) => {
            let choiceReq, info, latest_p, isActiveElementsInLatestP;

            info = document.querySelector('#info')
            choiceReq = document.querySelector('.hm-b-title')
            latest_p= document.querySelectorAll('.last_p')
            isActiveElementsInLatestP = Array.from(latest_p).some( p => p === (document.activeElement))


            if(info.classList.contains('active'))
            {
                switch (e.key) {
                    case 'Escape':
                        if(gameData.isAccess){
                            this.readText('seção de instruções fechada.');
                            if(choiceReq) setTimeout(() => choiceReq.focus(), 50)
                            
                        }
        
                        const main = document.querySelector('#main')
                        const j4Bg = document.querySelector('#j4-bg')
                        const info = document.querySelector('#info')
            
                        main.classList.toggle('blur')
                        j4Bg.classList.toggle('blur')
                        
                        info.classList.toggle('active')
                        break;
                    case 'ArrowLeft':
                    case 'ArrowRight':
                        if(gameData.isAccess) return;
                        toggleInfoSections(e)
                        break;
                    
                    case 'Tab':
                        if(!isActiveElementsInLatestP && !this.isTimeToChangeInstruc){
                            return
                        } else {
                            if(this.isTimeToChangeInstruc){
                                toggleInfoSections(e)
                                this.isTimeToChangeInstruc = false
                                return
                            }
                            if(isActiveElementsInLatestP) this.isTimeToChangeInstruc = true
                        }
                        break

                    default:
                        break;
                }
            } 
        }

        const clickOutElement = (e) => {
            let elem = document.querySelector('#info')
            if(!e || !elem) throw new Error('Evento ou elemento não fornecido')
            if(!elem.classList.contains('active')) return;

            let elemClicked, main, j4Bg, gameControls;
            
            elemClicked = e.target
            main = document.querySelector('#main')
            j4Bg = document.querySelector('#j4-bg')
            gameControls = document.querySelector('.gameControls')

            if(!elem.contains(elemClicked) && !gameControls.contains(elemClicked)){
                main.classList.toggle('blur')
                j4Bg.classList.toggle('blur')
                elem.classList.toggle('active')
            } 
        }

        const toggleInfoSections = (e) => {
            let infoTheme = document.querySelectorAll('.i-b0')

            i_body.forEach(container => container.classList.toggle('active'))
            if(gameData.isAccess){
                infoTheme.forEach( theme => {
                    if(theme.style.display !== 'none') theme.focus()
                })
            }
        }
        
        i_navBtns.forEach(btn => {
            btn.addEventListener('click', (e) => toggleInfoSections(btn))
        })
        
        document.addEventListener('mouseup', (e) => clickOutElement(e))
        document.addEventListener('keyup', (e) => keyboardInInstruc(e))

        function setIcons(){
            if(gameData.isMute){
                muteBtn.children[0].setAttribute('class', 'fa-solid fa-volume-xmark')
            }else{
                muteBtn.children[0].setAttribute('class', 'fa-solid fa-volume-high')
            }

            if(gameData.isDarkMode){
                lightBtn.children[0].setAttribute('class', 'fa-regular fa-sun')
            } else {
                lightBtn.children[0].setAttribute('class', 'fa-regular fa-moon')
            }
        }
    }
    start(restart = false){
        this.buildContainer()
        if (!restart) this.buildBg()
        this.setContainersElms()

        this.playAudio(gameAssets['frog_croaking'], 'frog_croaking', .1)
        this.readText("seja bem vindo ao Jogo 4", false)
        setTimeout(() =>{
            this.playAudio(gameAssets['theme_main'], 'theme_main', 0.05, true)
            this.frogTimer = setInterval(() => this.playAudio(gameAssets['frog_croaking'], 'frog_croaking', .1), 6000)
            gameData.isClickable = true
        }, 1000)
        console.log(gameData)
    }
    buildContainer(){
        this.setMainContainer()

        const main = document.querySelector('#main')

        const hmContainer = this.createNewElement('div', 'hm-container container')
        const hm_c_title = this.createNewElement('div', 'hm-c-title container')
        const hm_title = this.createNewElement('p', 'h-t-text')

        hm_title.innerHTML = 'Vamos Explorar'
        hm_title.setAttribute('tabindex', '17')

        hm_c_title.appendChild(hm_title)
        hmContainer.appendChild(hm_c_title)


        const hmBoard = this.createNewElement('div', 'hm-board')
        const hmBhead = this.createNewElement('div', 'hm-b-head')
        const hmBHTitle = this.createNewElement('p', 'hm-b-title')
        
        hmBHTitle.innerHTML = 'escolha o local'
        hmBHTitle.setAttribute('tabindex', '18')
        hmBHTitle.setAttribute('aria-live', 'polite')

        hmBhead.appendChild(hmBHTitle)

        const hmBBody = this.createNewElement('div', 'hm-b-body')
        
        let idxToSight = 19;

        for(let sight in sightData){
            let row = this.createNewElement('div', 'hm-b-r')
            let data = this.createNewElement('button', 'hm-b-d btn')
            
            data.textContent = sight
            data.setAttribute('tabindex', idxToSight++)
            data.setAttribute('title', `Ponto Turístico: ${sight.toUpperCase()}`)

            row.appendChild(data)
            hmBBody.appendChild(row)
        }

        hmBoard.append(hmBhead, hmBBody)
        
        hmContainer.appendChild(hmBoard)
        main.appendChild(hmContainer)
        
        textFit(hm_title)
    }
    setContainersElms(){
        // CONFIGURAR OS BOTÕES DO MENU E QUALQUER OUTRO ELEMENTO DA TELA
        const cPointsArr = document.querySelectorAll('.hm-b-d')
        let txContent;

        cPointsArr.forEach( point => {
            point.addEventListener('click', (e) => {
                if(!gameData.isClickable) return

                gameData.isClickable = false
                txContent = e.target.textContent

                this.stopCurrentAudio()
                this.playAudio(gameAssets['car_acceleration'])

                setTimeout(() => {
                    this.playAudio(gameAssets['car_horn'])
                    this.readText('chegamos em')
                    setTimeout(() => {
                        switch(txContent){
                            case 'concordia':
        
                                this.resetContainerToNewScene()
                                new Sights(this, 'concordia')
                                break;
        
                            case 'apa':
        
                                this.resetContainerToNewScene()
                                new Sights(this, 'apa')
                                break;

                            case 'cotia':
        
                                this.resetContainerToNewScene()
                                new Sights(this, 'cotia')
                                break;
        
                            default:
        
                                console.log('fase inexistente')
                                break;
                        }
                    }, 500)
                }, 1800)

            })
           
        })

        this.setBtns()
    }
    setMainContainer(){
        let  ruleW, gContainerWidth, gcontainerHeight  ;

        this.element.classList.remove('inactive')
        ruleW = window.screen.width > 2000 ? window.screen.width * 0.4  : window.screen.width > 1500 ? window.screen.width * 0.65 : window.screen.width * 0.6
        gContainerWidth  = window.screen.width * 0.40        
        gcontainerHeight  = window.screen.height * 0.613

        this.element.style.width = `${ruleW}px`
        this.element.style.height = `${gcontainerHeight}px`
    }
    resetContainerToNewScene(clss = ""){
        const main = document.querySelector('#main')

        main.innerHTML = " "
        this.element.className = clss;
        this.currentAudio = {}
        this.stopCurrentAudio()
        this.events.forEach(e => e.elem.removeEventListener(e.event, e.func))
    }

    readText(text, urgenci = true){  
        let textToReaderEl;
        textToReaderEl = document.querySelector('.textToReader')

        if(gameData.lastAccText === text){
            text += "."
        }

        if(!urgenci){
            textToReaderEl.setAttribute('aria-live', "polite")
            textToReaderEl.textContent  = `${text}`
        } else {
            textToReaderEl.setAttribute('aria-live', "assertive")
            textToReaderEl.textContent  = `${text}`
        } 
        gameData.lastAccText = text
    }  
    playAudio(audioBuffer, audioName = undefined, volume = 1.0, loop = false ){   
            const src = this.audioContext.createBufferSource()
            const gainNode = this.audioContext.createGain()

            src.buffer = audioBuffer
            src.loop = loop

            let accessibleVolume = gameData.isAccess ? 1 : volume

            const vl = gameData.isMute === true ? 0 : accessibleVolume
            gainNode.gain.value = vl
            
            src.connect(gainNode)
            gainNode.connect(this.audioContext.destination)

            if(loop === false){
                src.start()
            } else {
                if(audioName in this.currentAudio){
                    src.start(0, this.currentAudio[audioName].config.startTime)
                    this.currentAudio[audioName].audio = src
                } else {
                    src.start(0, 0)
                    this.currentAudio[audioName] = {config:{startTime: 0, pausedAt: undefined, gainNode: gainNode, volume: accessibleVolume}}
                    this.currentAudio[audioName].audio = src
                }
            }
            // Retorna o gainNode caso queira manipular o volume desse áudio no futuro
            return {source: src, gainNode: gainNode}
    }
    stopCurrentAudio(){
            for( let sound in this.currentAudio){
                this.currentAudio[sound].config.startTime = 0
                if(this.currentAudio[sound].audio){
                    let pausedAt = this.currentAudio[sound].audio.context.currentTime

                    this.currentAudio[sound].audio.stop()
                    this.currentAudio[sound].config.pausedAt = pausedAt
                }
                if(this.frogTimer) {
                    clearInterval(this.frogTimer)
                    this.frogTimer = undefined
                }
            }
    }

    toggleLightMode(){
        let btn = document.getElementById('lightBtn')

        if(gameData.isDarkMode){
            // transformar em light
            document.body.style.background = colors.bg_light
            if(gameData.isAccess) this.readText('Jogando no modo diurno')

        } else {
            // transformar em dark
            document.body.style.background = `${colors.bg_dark}`
            if(gameData.isAccess) this.readText('Jogando no modo noturno')

        }
        btn.children[0].classList.toggle('fa-sun')
        btn.children[0].classList.toggle('fa-moon')
        gameData.isDarkMode = ! gameData.isDarkMode
    }
    toggleVolume(){
        for(let audio in this.currentAudio){
            let gain;
            if( this.currentAudio[audio].config.gainNode) {
                gain =  this.currentAudio[audio].config.gainNode.gain.value

                gain = gain > 0 ? 0 : this.currentAudio[audio].config.volume
                this.currentAudio[audio].config.gainNode.gain.value = gain
            }  
        }
            
        muteBtn.children[0].classList.toggle('fa-volume-xmark')
        muteBtn.children[0].classList.toggle('fa-volume-high')

        gameData.isMute = !gameData.isMute
        if(!gameData.isAccess){
            return
        } else {
            if(gameData.isMute){
                this.readText('Som do jogo desativado')
            } else {
                this.readText('Som do jogo ativado')
            }
        }
    }

    getImage(key){
        return gameAssets[key]
    }
    createNewElement(el, cl = undefined, id = undefined, src = undefined, text = null){
        const element = document.createElement(el)

        if(cl){
            let clss = cl.split(' ')
            for(let i = 0; i < clss.length; i++){
                element.classList.add(clss[i])
            }
        } 
        if(id)  element.setAttribute('id', id);
        if(src) element.setAttribute('src', src);
        if(text && typeof text === 'string') element.textContent = text

        return element
    }
    popUpMessage(message, delay = 3500){   // EXIBE MENSAGEM NO POPUP VISÍVEL
        gameData.isClickable = false

        const popUp = document.getElementById('popUpMessage')
        const popupText = document.querySelector('.popupText')
        
        this.playAudio(gameAssets['deny'], 'deny')
        popUp.style.top = `0`
        popupText.children[0].textContent = message
    
        
        setTimeout(() => {
            popUp.style.top = `-33rem`
            setTimeout( () => popupText.children[0].textContent = '', 1000)
            gameData.isClickable = true

        }, delay)
    }
    buildBg(){
        const j4_bg = document.querySelector('#j4-bg')

        const bgEle = this.createNewElement('div', 'j4-bg-bg')

        const foreground = this.getImage('foreground')
        foreground.className = "foreground svg"
        foreground.setAttribute('alt', "floresta ilustrada")

        const monkeyLeft = this.getImage('monkey_left')
        monkeyLeft.className = "m_l monkey"
        monkeyLeft.setAttribute('alt', 'macaco pendurado no cipó')

        const monkeyRight = this.getImage('monkey_right')
        monkeyRight.className = "m_r monkey"
        monkeyRight.setAttribute('alt', 'macaco pendurado no galho')

        const homeGif = this.getImage('home_gif')
        homeGif.className = "homeGif"
        homeGif.setAttribute('alt', 'página inicial')

        const homeBtnEl = this.createNewElement('button', 'btn bg-homeBtn', 'homeBtn')
        homeBtnEl.setAttribute('tabindex', '22')
        homeBtnEl.setAttribute('title', 'Página Inicial ')
        homeBtnEl.appendChild(homeGif)

        homeBtnEl.addEventListener('click', () => {
            if(!gameData.isClickable || gameData.mainScene === 'Game'){
                if(gameData.isAccess) this.readText('Você já está na página Inicial')
                return  
            } else {
                this.resetContainerToNewScene('j4-hm')
                
                gameData.mainScene = 'Game'
                document.title = ' Vamos Explorar Guapimirim!'

                bgEle.style.backgroundImage = "url('./../Assets/imgs/general/hm_background.png')"
    
                this.start(true)
            }
        })

        homeBtnEl.addEventListener('mouseenter', () => {
            this.playAudio(gameAssets['btn_select'], 'btn_select', .05)
        })

        j4_bg.append(bgEle, foreground, monkeyLeft, monkeyRight, homeBtnEl)
    }
    toggleBgDisplay(){
        const j4_bg = document.querySelector('#j4-bg')
        
        let bgDisplay = j4_bg.style.display

        if(bgDisplay === 'none'){
            j4_bg.style.display = 'block'
        } else {
             j4_bg.style.display = 'none'
        }
    }
    setBtns(element = document){
        let btns = element.querySelectorAll('.btn')
        let h_aux = false;
        btns.forEach((btn) => {
            btn.addEventListener('mouseenter', () => {
                if(!h_aux){
                    h_aux = !h_aux
                   if(element === document) this.playAudio(gameAssets['btn_select'], 'btn_select', .05)
                }
            })

            btn.addEventListener('mouseout', () => {
                h_aux = false
            })
        })
    }
}


export{
    Game
}