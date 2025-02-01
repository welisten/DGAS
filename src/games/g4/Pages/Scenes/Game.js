import { gameData } from "../../Constants/gameData.js";
import { colors } from "../../Constants/Colors.js";
import { Sights } from "./Sights.js";


class App {
    constructor(){

        this.element = document.querySelector('#game_container')
        this.element.classList.add('hm')
       
        this.currentAudio = {config:{startTime: 0, pausedAt: 0}}
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)() //rever propriedade do obj
        this.gainNode = this.audioContext.createGain()
        
        document.title = 'Guapimirim Áudio Estúdio'
        gameData.mainScene = 'Game'

        if(!gameData.isMute) this.gainNode.gain.value == 0

        
        this.setSettingsControllers()
        this.start()
    }

    setSettingsControllers(){

        const muteBtn = document.querySelector('#muteBtn')
        const lightBtn = document.querySelector('#lightBtn')

        setIcons()

        muteBtn.addEventListener('click', () => {
            this.toggleVolume()
        })

        lightBtn.addEventListener('click', () => {
            this.toggleLightMode()
        })

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

    start(){
        this.buildContainer()
        this.setContainersElms()
        this.playAudio(gameAssets['positiveBlipEffect'])
        setTimeout(() =>{
            this.playAudio(gameAssets['mainTheme'], .5, true)
            gameData.isClickable = true
        }, 1000)
    }

    buildContainer(){
        // CONSTRUIR HIERARQUIA E OS ELEMENTOS DA DOM REFERENTE A PAGINA HOME
        
        let ruleW , gContainerWidth, gcontainerHeight  ;

        this.element.classList.remove('inactive')
        
        ruleW = window.screen.width > 2000 ? window.screen.width * 0.4  : window.screen.width > 1500 ? window.screen.width * 0.65 : window.screen.width * 0.60
        gContainerWidth  = Math.floor(ruleW) 
        gcontainerHeight  = window.innerHeight * .7

        this.element.style.width = `${gContainerWidth}px`
        this.element.style.height = `${gcontainerHeight}px`

        const createNewElement = (el, cl = undefined, id = undefined, src = undefined) => {
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

        const gameC_El = this.element
        const mainC = createNewElement('div', 'container', 'main')
        
        const initialMessage = createNewElement('div', 'hm_initialMessage')
        const h1 = createNewElement('h1', 'hm_h1')
        const welcomeTxt = createNewElement('span', 'hm_welcomeTxt')
        const gameNameTxt = createNewElement('span', 'hm_gameNameTxt')
        const hmIntroMessage = createNewElement('p', 'hm_message')
        const skipButton = createNewElement('button', 'hm_msg_skip')
        
        const bgImgContainer = createNewElement('div', 'hm_bgImgContainer')
        const studioImg = createNewElement('img', 'studioImg', undefined, "./../Assets/imgs/studio.png")
        
        const sampleTable   = createNewElement('div', 'hm_sampleTable')
        const hmLamp_IMG    = createNewElement('img', 'lamp', 'hm_lamp', "./../Assets/imgs/lamp.png") 
        const invitation    = createNewElement('h2', 'invitation')    
        const hm_table      = createNewElement('table', 'hm_menu')
        const tHead         = createNewElement('thead', 'hm_thead')
        const thead_tr      = createNewElement('tr')
        const thead_th      = createNewElement('th')
        const tBody         = createNewElement('tbody', 'hm_tbody')
        const tbody_row1    = createNewElement('tr', 'mn_row')
        const menu_opt1     = createNewElement('td', 'mn_option selected')
        const menu_icon_cont = createNewElement('td', 'mn_opt_icon')
        const menu_icon_IMG = createNewElement('img', 'options_kitty_iMG', 'options_kitty_iMG', './../Assets/imgs/kitty.png')
        const tbody_row2    = createNewElement('tr', 'mn_row')
        const menu_opt2     = createNewElement('td', 'mn_option')


        welcomeTxt.textContent = 'Bemvindos ao'
        gameNameTxt.textContent = 'Sons do Rio'
        hmIntroMessage.textContent = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod facilis reiciendis dignissimos assumenda, rerum fuga corporis minus ea vero modi error enim quas expedita. Voluptas aliquam culpa commodi aperiam iusto! Deserunt dignissimos odio illo perferendis? At, labore amet ipsam illum dolorem optio quisquam doloremque et atque odit eos aliquid quia, veniam maiores facilis repellendus asperiores voluptatem dolore debitis facere! Modi?'
        skipButton.textContent = 'pular >>'
        skipButton.setAttribute('alt', 'studio musical')
        hmLamp_IMG.setAttribute('alt', 'Lampada de teto')
        menu_icon_IMG.setAttribute('alt', 'Gatinho')
        invitation.textContent = 'Vamos fazer um som ?'
        thead_th.textContent = 'Escolha uma base:'
        menu_opt1.textContent = 'Rio soberbo'
        menu_opt2.textContent = 'Centro'

        h1.append(welcomeTxt, gameNameTxt)
        initialMessage.append(h1, hmIntroMessage, skipButton)
        bgImgContainer.appendChild(studioImg)
        menu_icon_cont.appendChild(menu_icon_IMG)
        thead_tr.appendChild(thead_th)
        tbody_row1.append(menu_opt1, menu_icon_cont)
        tbody_row2.append(menu_opt2)
        tHead.append(thead_tr)
        tBody.append(tbody_row1, tbody_row2)
        hm_table.append(tHead, tBody)
        sampleTable.append(hmLamp_IMG, invitation, hm_table)
        
        mainC.append(initialMessage, bgImgContainer, sampleTable)
        gameC_El.appendChild(mainC)
        
    }
    setContainersElms(){
        // CONFIGURAR OS BOTÕES DO MENU E QUALQUER OUTRO ELEMENTO DA TELA
        const skipButton = document.querySelector('.hm_msg_skip')
        const mainContainer = document.querySelector('#main')
        const bgImgContainer = document.querySelector('.hm_bgImgContainer')
        const menuOptions = document.querySelectorAll('.mn_option')
        const menuRow = document.querySelectorAll('.mn_row')
        const menu_icon_cont = document.querySelector('.mn_opt_icon')


        let currentIndex = 0
        const chooseOpt = (e) => {
            let amount = menuOptions.length

            if(e.key === 'ArrowUp' || e.key === 'ArrowDown'){

                menuOptions[currentIndex].classList.remove('selected')
                menuRow[currentIndex].removeChild(menu_icon_cont)  
                
                if(e.key === 'ArrowUp'){
                    currentIndex = (currentIndex - 1 + amount) % amount
                } else {
                    currentIndex = (currentIndex + 1 + amount) % amount
                }
                
                menuOptions[currentIndex].classList.add('selected')
                menuRow[currentIndex].appendChild(menu_icon_cont)
                this.playAudio(gameAssets['btn_select'], 1)
            }

            if(e.key === 'Enter'){
                menuOptions[currentIndex].click()
            }
        }
        
        const skipIntro = (e) => {
            let isCorrectKey = e.key === 'Escape' || e.key === 'Enter'
            let isSkiped = mainContainer.classList.contains('skiped')
            if(isCorrectKey && !isSkiped){
                mainContainer.classList.add('skiped')
                bgImgContainer.style.left = '2%'
                this.playAudio(gameAssets['btn_select'], 1)

                document.removeEventListener('keyup', skipIntro)
                document.addEventListener('keydown', chooseOpt)
            }
        }

        const removeMenuOptEvents = () =>{
            menuOptions.forEach(opt => {
                opt.removeEventListener('click', callNewScene)
            })
        }

        const callNewScene = (e) => {
            this.stopCurrentAudio()
            removeMenuOptEvents()
            document.removeEventListener('keydown', chooseOpt)
            this.resetContainerToNewScene(e.target.textContent)
        }

        document.addEventListener('keyup', skipIntro)
        skipButton.addEventListener('click', () => {
            mainContainer.classList.add('skiped')
            bgImgContainer.style.left = '2%'
            this.playAudio(gameAssets['btn_select'], 1)

            document.removeEventListener('keyup', skipIntro)
            document.addEventListener('keydown', chooseOpt)
        })
        menuOptions.forEach(opt => {
            opt.addEventListener('click', callNewScene)
        })
    }


    playAudio(audioBuffer, volume = 1.0, loop = false){   
            const src = this.audioContext.createBufferSource()
            src.buffer = audioBuffer
            src.loop = loop
    
            volume = gameData.isMute === true ? 0 : 1
            this.gainNode.gain.value = volume 
            
            src.connect(this.gainNode)
            this.gainNode.connect(this.audioContext.destination)
            if(loop !== true){
                src.start()
    
            } else {
                src.start(0, this.currentAudio.config.startTime)
                this.currentAudio.audio = src
            }
    }
    stopCurrentAudio(){
        if(this.currentAudio.audio) {
            this.currentAudio.config.startTime = this.audioContext.currentTime
            this.currentAudio.audio.stop()
            this.currentAudio.audio = null
        }
    }
    toggleLightMode(){
        let btn = document.getElementById('lightBtn')

        if(gameData.isDarkMode){
            // transformar em light
            document.body.style.background = `#ddd`

        } else {
            // transformar em dark
            document.body.style.background = `${colors.bg_dark}`
        }
        btn.children[0].classList.toggle('fa-sun')
        btn.children[0].classList.toggle('fa-moon')
        gameData.isDarkMode = ! gameData.isDarkMode
    }
    toggleVolume(){
        this.gainNode.gain.value == 1 ? this.gainNode.gain.value = 0 : this.gainNode.gain.value = 1
            
        muteBtn.children[0].classList.toggle('fa-volume-xmark')
        muteBtn.children[0].classList.toggle('fa-volume-high')

        gameData.isMute = !gameData.isMute
    }
    resetContainerToNewScene(classStr){
        let classNm = classStr.split(' ').map(str => capitalize(str)).join('_')
        const mainC = document.getElementById('main')
        mainC.innerHTML = " "
        classNm += ' container'
        mainC.className = classNm
        
        new Sights(this, classNm)

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
                   if(element === document) this.playAudio(gameAssets['btn_select'])
                }
            })

            btn.addEventListener('mouseout', () => {
                h_aux = false
            })
        })
    }
    popUpMessage(message, delay = 3500){   // EXIBE MENSAGEM NO POPUP VISÍVEL
        gameData.isClickable = false

        const popUp = document.getElementById('popUpMessage')
        const popupText = document.querySelector('.popupText')
        
        this.playAudio(gameAssets['deny'])
        popUp.style.top = `10%`
        popupText.children[0].textContent = message
    
        
        setTimeout(() => {
            popUp.style.top = `-23%`
            setTimeout( () => popupText.children[0].textContent = '', 1000)
            gameData.isClickable = true

        }, delay)
    }
}


export{
    App
}