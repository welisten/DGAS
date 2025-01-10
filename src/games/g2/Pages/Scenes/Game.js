import { gameData } from "../../Constants/gameData.js";
import { colors } from "../../Constants/Colors.js";
import { Alphabet } from "./Alphabet.js";
import { Words } from "./Words.js";
import { Explore } from "./Explore.js";


class App {
    constructor(){

        this.element = document.querySelector('#game_Container')
        this.element.classList.add('hm')
       
        this.currentAudio = {config:{startTime: 0, pausedAt: 0}}
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)()//rever propriedade do obj
        this.gainNode = this.audioContext.createGain()
        
        document.title = 'Vamos Librar !'
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
            this.playAudio(gameAssets['theme1'], .5, true)
            gameData.isClickable = true
        }, 1000)
    }

    buildContainer(){
        // CONSTRUIR HIERARQUIA E OS ELEMENTOS DA DOM REFERENTE A PAGINA HOME
        
        let ruleW , gContainerWidth, gcontainerHeight  ;

        this.element.classList.remove('inactive')
        
        ruleW = window.innerWidth > 2000 ? window.innerWidth * 0.50 : window.innerWidth > 1500 ? window.innerWidth * 0.65 : window.innerWidth * 0.60
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
        
        const homeC_top_El = createNewElement('div', 'hm-c container top')
        
        const homeLogo_El= createNewElement('div', 'hm-logo')
        const earth_img_El= createNewElement('img', 'lg-earth', undefined, "../Assets/imgs/general/earth.png")
        const cloud1_img_El = createNewElement('img', 'lg-clouds cl-1', undefined, "../Assets/imgs/general/clouds_gif.gif")
        const cloud2_img_El = createNewElement('img', 'lg-clouds cl-2', undefined, "../Assets/imgs/general/clouds_gif.gif")
        
        const homeTitle_El = createNewElement('div', 'hm-title')
        const title_img_El = createNewElement('img', 'title', undefined, "../Assets/imgs/general/title.png")
        
        earth_img_El. setAttribute('alt', 'crianças dando as mãos envolta do globo terrestre')
        cloud1_img_El. setAttribute('alt', 'nuvens se mechendo')
        cloud2_img_El. setAttribute('alt', 'nuvens se mechendo')
        title_img_El. setAttribute('alt', 'titulo: vamos librar')
        
        homeLogo_El.appendChild(earth_img_El)
        homeLogo_El.appendChild(cloud1_img_El)
        homeLogo_El.appendChild(cloud2_img_El)
        homeTitle_El.appendChild(title_img_El)
        homeC_top_El.appendChild(homeLogo_El)
        homeC_top_El.appendChild(homeTitle_El)
        gameC_El.appendChild(homeC_top_El)


        const homeC_bottom_El = createNewElement('div', 'hm-c container bottom')
        
        const menuC_El = createNewElement('div', 'hm-menu container')
        const letterBtn_El = createNewElement('button', 'btn hm-btn', 'hm-lettersBtn')
        const wordBtn_El = createNewElement('button', 'btn hm-btn', 'hm-wordsBtn')
        const exploreBtn_El = createNewElement('button', 'btn hm-btn', 'hm-exploreBtn')

        letterBtn_El.innerHTML = 'alfabeto'
        wordBtn_El.innerHTML = 'palavras'
        exploreBtn_El.innerHTML = 'explorar'
        
        const hand1_img_El = createNewElement('img', 'hand h-1', undefined, "../Assets/imgs/general/hand.png")

        const wrapperC_El = createNewElement('div', 'wrapper')
        const hand2_img_El = createNewElement('img', 'hand h-2', undefined, "../Assets/imgs/general/hand.png")

        hand1_img_El.setAttribute('alt', 'mão referenciando a obra "A criação de Adão.')
        hand2_img_El.setAttribute('alt', 'mão referenciando a obra "A criação de Adão.')
        
        menuC_El.appendChild(letterBtn_El)
        menuC_El.appendChild(wordBtn_El)
        menuC_El.appendChild(exploreBtn_El)
        wrapperC_El.appendChild(hand2_img_El)
        homeC_bottom_El.appendChild(menuC_El)
        homeC_bottom_El.appendChild(hand1_img_El)
        homeC_bottom_El.appendChild(wrapperC_El)
        gameC_El.appendChild(homeC_bottom_El)

        const bg_El = createNewElement('div', 'bg')
        gameC_El.appendChild(bg_El)
    }
    setContainersElms(){
        // CONFIGURAR OS BOTÕES DO MENU E QUALQUER OUTRO ELEMENTO DA TELA
        const letterBtn_El = document.getElementById('hm-lettersBtn')
        const wordBtn_El = document.getElementById('hm-wordsBtn')
        const exploreBtn_El = document.getElementById('hm-exploreBtn')
        
        letterBtn_El.addEventListener('click', (e) => {
            if(!gameData.isClickable) return
            this.stopCurrentAudio()
            new Alphabet(this)
        })
        wordBtn_El.addEventListener('click', (e) => {
            if(!gameData.isClickable) return
            this.stopCurrentAudio()
            new Words(this)
        })
        exploreBtn_El.addEventListener('click', (e) => {
            if(!gameData.isClickable) return
            this.stopCurrentAudio()
            new Explore(this)
        })

        this.setBtns()
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
    resetContainerToNewScene(classStr = ''){
        const access = document.querySelector('.access')
        this.element.innerHTML = " "
        this.element.appendChild(access)
        this.element.className = classStr
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
    buildBg(){
        const backgroudGifsEl = this.createNewElement('div', "container bg-gifs")
       
        const bg_cloud1 = this.getImage('clouds_gif1')
        bg_cloud1.setAttribute('src', './../Assets/imgs/general/clouds_gif.gif')
        bg_cloud1.setAttribute('alt', 'nuvens')
        bg_cloud1.setAttribute('class', 'bg-gifs-clouds bg-c1')
        
        const bg_cloud2 = this.getImage('clouds_gif2')
        bg_cloud2.setAttribute('src', './../Assets/imgs/general/clouds_gif.gif')
        bg_cloud2.setAttribute('alt', 'nuvens')
        bg_cloud2.setAttribute('class', 'bg-gifs-clouds bg-c2')
       
        const bg_sun = this.getImage('sun_gif')  
        bg_sun.setAttribute('src','./../Assets/imgs/general/sun_gif.gif')
        bg_sun.setAttribute('alt','sol')
        bg_sun.setAttribute('class','bg-gifs-sun')

        const bg_home = this.getImage('home_gif')  
        bg_home.setAttribute('src','./../Assets/imgs/general/home_gif.gif')
        bg_home.setAttribute('alt','home')
        bg_home.setAttribute('class','bg-gifs-home')

        const homeBtnEl = this.createNewElement('button', 'btn bg-homeBtn', 'homeBtn')
        
        homeBtnEl.addEventListener('click', () => {
            if(!gameData.isClickable) return
            const accessBtn = document.querySelector('[vw-access-button]')
            
            let OR_rule = (gameData.mainScene === 'Words' || gameData.mainScene === 'Explore' )
            
            if( OR_rule && !accessBtn.classList.contains('active')){
                this.popUpMessage('aperte o "X" vermelho para fechar a aplicação', 2000)
                // função para indicar x
                return
            }
            this.stopCurrentAudio()
            this.resetContainerToNewScene('hm')
            gameData.mainScene = 'Game'

            this.start()
        })

        homeBtnEl.addEventListener('mouseenter', () => {
            this.playAudio(gameAssets['btn_select'])
        })

        homeBtnEl.appendChild(bg_home)
        backgroudGifsEl.appendChild(bg_cloud1)
        backgroudGifsEl.appendChild(bg_cloud2)
        backgroudGifsEl.appendChild(bg_sun)
        backgroudGifsEl.appendChild(homeBtnEl)

        document.getElementById('game_Container').appendChild(backgroudGifsEl)
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
}


export{
    App
}