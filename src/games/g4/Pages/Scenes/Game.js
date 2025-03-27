import { gameData } from "../../Constants/gameData.js";
import { colors } from "../../Constants/Colors.js";
import { Sights } from "./Sights.js";
import { gainNode, audioContext, currentAudios } from "./../../Js/script.js"
import { audioDataArray } from "../../Constants/songsData.js";

class App {
    constructor(isInitMsgAlreadySkipped = false){

        this.element = document.querySelector('#game_container')
        this.element.classList.add('hm')
       
        this.currentAudios =  currentAudios
        this.audioContext = audioContext //rever propriedade do obj
        this.gainNode = gainNode
        
        this.isInitMsgAlreadySkipped = isInitMsgAlreadySkipped

        document.title = 'Guapimirim Áudio Estúdio'
        gameData.mainScene = 'Game'

        this.currentIndex = 0

        this.handleIntroSkip = this.skipIntro.bind(this)
        this.handleChooseOption = this.chooseOpt.bind(this)
        this.handleNewSceneCalling = this.callNewScene.bind(this)
        this.handleOptionsFocus = this.optionOnFocus.bind(this)

        if(!gameData.isMute) this.gainNode.gain.value = 0

        
        this.start()
    }

    start(){
        // console.clear()
        this.buildContainer()
        this.setContainersElms()
        this.playGameAudio('positiveBlipEffect', 1, false)
        setTimeout(() =>{
            this.stopAllCurrentAudios()
            this.playGameAudio('mainTheme', .5, true)
            gameData.isClickable = true
            if(gameData.isAccess){
                let firstElemToFocus
                if(this.isInitMsgAlreadySkipped){
                    firstElemToFocus = document.querySelector('.invitation')
                    setTimeout(() => firstElemToFocus.focus(), 1500)
                    
                } else {
                    firstElemToFocus = document.querySelector('.hm_h1')
                    firstElemToFocus.focus()

                }
            }
        }, 1000)
    }
    buildContainer(){
        // CONSTRUIR HIERARQUIA E OS ELEMENTOS DA DOM REFERENTE A PAGINA HOME
        const setMainContainer = () => {
            let ruleW , gContainerWidth, gcontainerHeight  ;

            this.element.classList.remove('inactive')
            
            ruleW = window.screen.width > 2000 ? window.screen.width * 0.4  : window.screen.width > 1500 ? window.screen.width * 0.65 : window.screen.width * 0.60
            gContainerWidth  = Math.floor(ruleW) 
            gcontainerHeight  = window.innerHeight * .7
    
            this.element.style.width = `${gContainerWidth}px`
            this.element.style.height = `${gcontainerHeight}px`
        }

        setMainContainer()

        const gameC_El = this.element
        const mainC = this.createNewElement('div', 'container', 'main')
        
        
        const bgImgContainer = this.createNewElement('div', 'hm_bgImgContainer')
        const studioImg = this.createNewElement('img', 'studioImg', undefined, "./../Assets/imgs/studio.png")
        
        const sampleTable   = this.createNewElement('div', 'hm_sampleTable')
        const hmLamp_IMG    = this.createNewElement('img', 'lamp', 'hm_lamp', "./../Assets/imgs/lamp.png") 
        const invitation    = this.createNewElement('h2', 'invitation')    
        const hm_Menu      = this.createNewElement('div', 'hm_menu')
        const menuTitle     = this.createNewElement('h3', 'menuTitle', 'hm_menuTitle')
        const menuBody      = this.createNewElement('ul', 'menuBody')
        const mbody_row1    = this.createNewElement('span', 'mn_row')
        const menu_opt1     = this.createNewElement('l1', 'mn_option selected btn')
        const menu_icon_cont = this.createNewElement('td', 'mn_opt_icon')
        const menu_icon_IMG = this.createNewElement('img', 'options_kitty_iMG', 'options_kitty_iMG', './../Assets/imgs/kitty.png')
        const mbody_row2    = this.createNewElement('span', 'mn_row')
        const menu_opt2     = this.createNewElement('td', 'mn_option btn')

        this.buildInitialMessage(this.isInitMsgAlreadySkipped, mainC)
        
        hmLamp_IMG.setAttribute('alt', 'Lampada de teto')
        menu_icon_IMG.setAttribute('alt', 'Gatinho')
        hmLamp_IMG.setAttribute('inert', '')
        menu_icon_cont.setAttribute('inert', '')
        invitation.textContent = 'Vamos fazer um som ?'
        menuTitle.textContent = 'Escolha uma base:'
        menu_opt1.textContent = 'Rio soberbo'
        menu_opt2.textContent = 'Centro'

        invitation.setAttribute('tabindex', 4)
        invitation.setAttribute('role', 'paragraph')
        menuTitle.setAttribute('tabindex', 5)
        menuTitle.setAttribute('aria-label', 'Escolha uma base dentre as opções do menu')
        menuTitle.setAttribute('role', 'paragraph')
        hm_Menu.setAttribute('aria-labelledly', 'hm_menuTitle')
        menu_opt1.setAttribute('tabindex', 6)
        menu_opt1.setAttribute('role', 'menuitem')
        menu_opt1.setAttribute('title', 'Clique para escolher a opção de base musical')
        menu_opt2.setAttribute('tabindex', 7)
        menu_opt2.setAttribute('role', 'menuitem')
        menu_opt2.setAttribute('title', 'Clique para escolher a opção de base musical')

        if(this.isInitMsgAlreadySkipped){
            invitation.setAttribute('hm-initialFocus', '')
        }
        
        bgImgContainer.appendChild(studioImg)
        
        menu_icon_cont.appendChild(menu_icon_IMG)
        mbody_row1.append(menu_opt1, menu_icon_cont)
        mbody_row2.append(menu_opt2)
        menuBody.append(mbody_row1, mbody_row2)
        hm_Menu.append(menuTitle, menuBody)
        sampleTable.append(hmLamp_IMG, invitation, hm_Menu)
        
        mainC.append(bgImgContainer, sampleTable)
        gameC_El.appendChild(mainC)
    }
    setContainersElms(){
        // CONFIGURAR OS BOTÕES DO MENU E QUALQUER OUTRO ELEMENTO DA TELA
        const menuOptions = document.querySelectorAll('.mn_option')

        if(!this.isInitMsgAlreadySkipped){
            const skipButton = document.querySelector('.hm_msg_skip')
    
            document.addEventListener('keydown', this.handleIntroSkip) /*Aqui */
            skipButton.addEventListener('click', this.handleIntroSkip)  /*Aqui */
        } else {
            const bgImgContainer = document.querySelector('.hm_bgImgContainer')
            bgImgContainer.style.left = '2%'
        }

        menuOptions.forEach(opt => {
            opt.addEventListener('click', this.handleNewSceneCalling) /*Aqui */
            opt.addEventListener('focus', this.handleOptionsFocus)
        })
    }

    createNewElement(el, cl = undefined, id = undefined, src = undefined){
        const element = document.createElement(el)

        if(cl){
            let clss = cl.split(' ')
            for(let i = 0; i < clss.length; i++){
                element.classList.add(clss[i])
            }
        } 
        if(id)  element.setAttribute('id', id);
        if(src) element.setAttribute('src', src);

        return element
    }
    buildInitialMessage(isInitMsgAlreadySkipped, mainContainer){
        if(!this.isInitMsgAlreadySkipped){
            const initialMessage = this.createNewElement('div', 'hm_initialMessage', 'hm_initialMessage')
            const title = this.createNewElement('h1', 'hm_h1')
            const welcomeTxt = this.createNewElement('span', 'hm_welcomeTxt')
            const gameName = this.createNewElement('span', 'hm_gameNameTxt')
            const hm_IntroMessage = this.createNewElement('p', 'hm_message')
            const skipButton = this.createNewElement('button', 'hm_msg_skip')

            const message = `Olá Amiguinho!<br>Aqui você vai descobrir muitos sons incríveis! Cada clique pode trazer uma surpresa. será o som de um animal? De um instrumento? Ou de algo que você conhece muito bem? <br>Este jogo foi feito para todos! Se você não pode ver tão bem, não se preocupe! Os sons vão te guiar nessa aventura.<br>Pronto para começar? Então abra bem os ouvidos e divirta-se!`

            welcomeTxt.textContent = 'Bemvindos ao'
            gameName.textContent = 'Sons do Rio.'
            hm_IntroMessage.innerHTML = message
            skipButton.textContent = 'Pular >'
            
            title.append(welcomeTxt, gameName)
            
            title.setAttribute('tabindex', 1)
            title.setAttribute('hm-initialFocus', '')
            title.setAttribute('role', 'paragraph')
            hm_IntroMessage.setAttribute('tabindex', 2)
            skipButton.setAttribute('tabindex', 3)
            skipButton.setAttribute('aria-label', 'pular introdução')
            skipButton.setAttribute('title', 'Clique para pular a introdução')
            
            initialMessage.append(title, hm_IntroMessage, skipButton)
            mainContainer.appendChild(initialMessage)
        } else {
            
            mainContainer.classList.add('skipped')
            
            setTimeout(() => {
                const sampleBoard = document.querySelector('.hm_sampleTable')
                if(sampleBoard) sampleBoard.style.opacity = 1;
            },500)
            
            this.playGameAudio('btn_select', 1, false)
            document.addEventListener('keydown', this.handleChooseOption)
        }
    }
    optionOnFocus(e){
        const option = e.target
        const allOptionsArr = [...document.querySelectorAll('.mn_option')]
        const icon = document.querySelector('.mn_opt_icon')
        const currentRowSelected = icon.parentElement
        const currentIndex = allOptionsArr.indexOf(option)

        allOptionsArr.forEach(opt => opt.classList.remove('selected'))
        option.classList.add('selected')

        currentRowSelected.removeChild(icon)
        option.parentElement.append(icon)

        this.currentIndex = currentIndex
    }
    chooseOpt (e){
        const menuOptions = document.querySelectorAll('.mn_option')
        const menuRow = document.querySelectorAll('.mn_row')
        const menu_icon_cont = document.querySelector('.mn_opt_icon')

        let amount = menuOptions.length

        if(e.key === 'ArrowUp' || e.key === 'ArrowDown'){

            menuOptions[this.currentIndex].classList.remove('selected')
            menuRow[this.currentIndex].removeChild(menu_icon_cont)  
            
            if(e.key === 'ArrowUp'){
                this.currentIndex = (this.currentIndex - 1 + amount) % amount
            } else {
                this.currentIndex = (this.currentIndex + 1 + amount) % amount
            }
            
            menuOptions[this.currentIndex].classList.add('selected')
            menuRow[this.currentIndex].appendChild(menu_icon_cont)
            this.playGameAudio('btn_select', 1, false)
            
            if(gameData.isAccess)
                menuOptions[this.currentIndex].focus();
        }

        if(e.key === 'Enter'){
            menuOptions[this.currentIndex].click()
        }
    }
    skipIntro(e) {
        const mainContainer = document.querySelector('#main')
        const skipButton = document.querySelector('.hm_msg_skip')
        const infoContainer = document.getElementById('info')
        const initialMessage = document.querySelector('.hm_initialMessage')
        const sampleBoard = document.querySelector('.hm_sampleTable')

        if(infoContainer.classList.contains('active')) return;

        let isKeyOrClickEvent = (e.type === 'keydown' && ( e.key === 'Escape' || e.key === 'Enter' )) || e.type === 'click' ;
        let isSkipped = mainContainer.classList.contains('skipped')
        if(isSkipped){
            return
        } else if(isKeyOrClickEvent){
            e.preventDefault()
            const bgImgContainer = document.querySelector('.hm_bgImgContainer')
            const hm_initialFocus = document.querySelector('[hm-initialFocus]')

            document.removeEventListener('keydown', this.handleIntroSkip)
            skipButton.removeEventListener('click', this.handleIntroSkip)

            initialMessage.style.opacity = 0
            bgImgContainer.style.left = '2%'

            if(hm_initialFocus){
                hm_initialFocus.removeAttribute('hm-initialFocus')
                document.querySelector('.invitation').setAttribute('hm-initialFocus', '')
            }
            mainContainer.classList.add('skipped')

            setTimeout(() => {
                sampleBoard.style.opacity = 1
                if(gameData.isAccess)
                    document.querySelector('.invitation').focus();
            },500)

            this.playGameAudio('btn_select', 1, false)
            document.addEventListener('keydown', this.handleChooseOption)
        }
    }

    playGameAudio(audioKey, volume = 1.0, loop = false){  
        let gainNode, src;

        // Verifica se o áudio já está sendo reproduzido
        if(audioKey in this.currentAudios){
            // nos diz se o audio foi pausado ou é apenas um audio curto sendo tocado consecutivamente
            let pausedAt = this.currentAudios[audioKey].config.pausedAt || 0
            
            src = this.audioContext.createBufferSource() 
            gainNode = this.currentAudios[audioKey].config.gainNode
            
            const audioBuffer = gameAssets[audioKey] 
            src.buffer = audioBuffer 
            src.loop = loop

            // Ajusta o volume com base no mute e no volume armazenado
            let currentVolume = this.currentAudios[audioKey].config.volume || volume
            gainNode.gain.value = gameData.isMute ? 0 : currentVolume

            src.connect(gainNode)
            gainNode.connect(this.audioContext.destination)

            // Inicia a reprodução com o delay e o ponto de pausa
            src.start(0, pausedAt)

            // Atualiza o estado do áudio dado a condição dele ser persistente (loop = true)
            if(this.currentAudios[audioKey].config.loop === true){
                //loop = true => audio persiste
                this.currentAudios[audioKey] = {
                    config: {
                        startTime: 0,
                        gainNode: gainNode,
                        volume: currentVolume,
                        loop: loop
                    },
                    audio: src
                };
            }else if (this.currentAudios[audioKey].config.loop === false){
                this.currentAudios[audioKey] = {
                    config: {
                        startTime: 0,
                        gainNode: gainNode,
                        volume: currentVolume,
                    },
                    audio: src
                };
                setTimeout(() => {
                    delete this.currentAudios[audioKey]
                }, audioBuffer.duration * 1000)
            }
        } else {
            src = this.audioContext.createBufferSource()
            gainNode = this.audioContext.createGain()

            const audioBuffer = gameAssets[audioKey]
            src.buffer = audioBuffer
            src.loop = loop

            let audioData = audioDataArray.find(obj => obj.name === audioKey)
            let audioVolume = audioData.volume || volume
            gainNode.gain.value = gameData.isMute ? 0 : audioVolume

            src.connect(gainNode)
            gainNode.connect(this.audioContext.destination)
            src.start(0, 0)

            if(loop === true){
                this.currentAudios[audioKey] = {
                    config: {
                        startTime: 0,
                        pausedAt: undefined,
                        gainNode: gainNode,
                        volume: audioVolume,
                        loop: loop
                    },
                    audio: src
                };
            }else{
                if(audioBuffer.duration < 3.5) return // não armazenar audios muito curtos

                this.currentAudios[audioKey] = {
                    config: {
                        startTime: 0,
                        pausedAt: undefined,
                        gainNode: gainNode,
                        volume: volume
                    },
                    audio: src
                };
                setTimeout(() => {
                    delete this.currentAudios[audioKey]
                }, audioBuffer.duration * 1000)
            }

            // Retorna o source e o gainNode para manipulação futura
            return { source: src, gainNode: gainNode };
        }
    }

    // Para definitivamente os audios rastreados em currentAudios
    stopAllCurrentAudios(){
        for(let key in this.currentAudios){
            this.currentAudios[key].audio.stop()
            delete this.currentAudios[key]
        }
    }

    removeAllElementsEvents(){
        const skipButton = document.querySelector('.hm_msg_skip')
        const menuOptions = document.querySelectorAll('.mn_option')

        document.removeEventListener('keydown', this.handleIntroSkip) 
        skipButton?.removeEventListener('click', this.handleIntroSkip) 
        document.removeEventListener('keydown', this.handleChooseOption)
        menuOptions?.forEach(opt => {
            opt.removeEventListener('click', this.handleNewSceneCalling)
        })
        this.removeBtnEvents()
    }
    callNewScene = (e) => {
        this.stopAllCurrentAudios()
        this.removeAllElementsEvents()
        this.resetContainerToNewScene(e.target.textContent)
    }
    resetContainerToNewScene(classStr){
        let classNm = classStr.split(' ').map(str => capitalize(str)).join('_')
        const mainC = document.getElementById('main')
        mainC.innerHTML = " "
        classNm += ' container'
        mainC.className = classNm
        
        new Sights(classNm.split(' ')[0], this.currentAudios)

        function capitalize(str) {
            if (!str) return "";
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    }

    getImage(key){
        return gameAssets[key]
    }
    setBtns(element = document){
        let btns = element.querySelectorAll('.btn')
        let h_aux = false;
        btns.forEach((btn) => {
            btn.addEventListener('mouseenter', () => {
                if(!h_aux){
                    h_aux = !h_aux
                   if(element === document) this.playGameAudio('btn_select')
                }
            })

            btn.addEventListener('mouseout', () => {
                h_aux = false
            })
        })
    }
    removeBtnEvents(element = document){
        let btns = element.querySelectorAll('.btn')
        let h_aux = false;
        btns.forEach((btn) => {
            btn.removeEventListener('mouseenter', () => {
                if(!h_aux){
                    h_aux = !h_aux
                   if(element === document) this.playGameAudio('btn_select')
                }
            })

            btn.removeEventListener('mouseout', () => {
                h_aux = false
            })
        })
    }
    popUpMessage(message, nxtElem, delay = 2500, isVisible = true, isDurable = true, chaining = false){   // EXIBE MENSAGEM NO POPUP VISÍVEL
        const popUp = document.getElementById('popUpMessage')
        const popupText = document.querySelector('.popupText')
        const nextFocusElement = document.querySelector(nxtElem)
        let display = popUp.style.display
        
        popUp?.classList.toggle('animated', !popUp.classList.contains('animated'))

        if(display != 'flex')   popUp.style.display = 'flex'
        
        popUp.removeAttribute('hidden')//o torna visível na interface e nas ferramentas de accessbilidade

        if(isVisible){
            popUp.style.opacity = 1
        }
        
        if(!chaining)
            popupText.textContent = ''

        popupText.setAttribute('tabindex', 1)
        popupText.textContent = message
        gameData.isAccess ? popupText.focus() : true
        
        if(!isDurable)
            setTimeout(() => {
                popUp.style.opacity = 0
                popUp.style.display = 'none'
            }, 1500)
        
        if(nxtElem && delay)
            setTimeout(() => nextFocusElement.focus(), delay + 100)
        
        
    }
    disposeAudioContext(){
        if(this.audioContext){
            this.audioContext.close()
            this.audioContext = null
        }
    }
}


export{
    App
}