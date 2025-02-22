import { colors } from "../../Constants/Colors.js";
import { gameData } from "../../Constants/gameData.js";
import { sightsData } from "../../Constants/sightsData.js";
import { App } from "./Game.js";
import { gainNode, audioContext } from "./../../Js/script.js"


let aux = 0


class Sights{
    constructor( location ){
        this.location = {name: location}
        this.element = document.querySelector(`.${this.location.name}`)

        this.currentAudio = {config:{startTime: 0, pausedAt: 0}}
        this.audioContext = audioContext
        this.gainNode = gainNode
        // this.audioContext = new (window.AudioContext || window.webkitAudioContext)() //rever propriedade do obj
        // this.gainNode = this.audioContext.createGain()

        this.initialControlsIndex = 1
        this.ctrFlag = false
        this.optFlag = false
        this.isPLaying = false
        this.ctrCurrentIdx = undefined
        this.optionsAmount = Object.keys(sightsData[this.location.name].samples).length

        this.chosenAnimalsNameArr = []
        this.chosenContainerIdxArr = []

        this.handleOptionsNavigation = this.optionNavigation.bind(this)
        this.handleControlersNavigation = this.controlsNavigation.bind(this)
        this.handleControlersSelection =  this.controlersSelection.bind(this)
        this.handleKeyDown = (e) => {
            this.handleOptionsNavigation(e),this.handleControlersNavigation(e)
        }

        this.start()

        document.title = capitalizeStr(this.location.name.split('_').join(' '))
        gameData.mainScene = capitalizeStr(this.location.name)
    } 

    start(){
        // console.clear()
        this.buildContainer() 
        this.setContainerElements() 

        gameData.isClickable =  true
        this.playAudio(gameAssets[sightsData[this.location.name].mainSampleName], .05, true)
        
        // ATENÇÃO AQUI
        // if(gameData.isAccess).readText(sightsData[this.location.name].descri, null, true)
    }
    buildContainer(){
        const createAndSetMenuRows = (obj, father) => {

            let index = 0
            for(let sample in obj){
                let sgh_menu_row = this.createNewElement('tr', 'sgh_menu_row')
                let sgh_menu_data = this.createNewElement('td', 'sgh_menu_data')
                let sgh_menu_opt = this.createNewElement('p', 'sgh_menu_opt')
                let sgh_menu_opt_img = this.createNewElement('img', 'sgh_menu_opt_img', undefined, './../Assets/imgs/notasG4.gif')
                
                
                sgh_menu_opt.textContent = capitalizeStr(obj[sample].alt)
                sgh_menu_opt_img.setAttribute('alt', 'notas musicais')
                
                sgh_menu_data.append(sgh_menu_opt, sgh_menu_opt_img)
                sgh_menu_row.appendChild(sgh_menu_data)
                sgh_menu_row.setAttribute('tabindex', index + 2)
                sgh_menu_row.setAttribute('index', index)
                index++
                
                father.append(sgh_menu_row)
                                
                sgh_menu_opt.addEventListener('click', (e) => {
                    if(this.chosenAnimalsNameArr.length >= 5){
                        return
                        // haverá alguma função de popUp para informar que limite foi atingido
                    }
                })
            }
        }

        const sgh_bg = this.createNewElement('div', 'sgh_bg', 'sgh_bg')
        const preguica_left = this.createNewElement('img', 'preguica left', 'sgh_preg_r', './../Assets/imgs/preguica_pre.png')
        const preguica_right = this.createNewElement('img', 'preguica right', 'sgh_preg_l', './../Assets/imgs/preguica_pre.png')
       
        preguica_left.setAttribute('alt', 'Bicho preguiça ouvindo música')
        preguica_right.setAttribute('alt', 'Bicho preguiça ouvindo música')
        sgh_bg.append(preguica_left, preguica_right)
        this.element.appendChild(sgh_bg)

        const sgh_menu = this.createNewElement('div','sgh_menu container','sgh_menu')
        const setting_board_img = this.createNewElement('img','setting_board_img','setting_board_img', './../Assets/imgs/controlerG4.png')
        const sgh_menu_table = this.createNewElement('table','sgh_menu_table','sgh_menu_table')
        const setting_board_img_control = this.createNewElement('img','setting_board_img_control','setting_board_img_control', './../Assets/imgs/mesaG4.png')
        const setting_board_choices_control = this.createNewElement('div', 'sgh_choices_control', 'sgh_choices_control' )
        const choices_made_EL = this.createNewElement('span', 'sgh_choices_made', 'sgh_choices_made')
        const choices_amount_EL = this.createNewElement('span', 'sgh_choices_amount', 'sgh_choices_amount')

        const choicesMade = 0
        const choicesAmount = 5

        setting_board_img.setAttribute('alt', 'ilustração do menu')
        setting_board_img.setAttribute('tabindex', 1)
        setting_board_img.setAttribute('aria-label', 'Essa é sua mesa de som')
        setting_board_img_control.setAttribute('alt', 'Mixando audio')

        const sgh_menu_body = this.createNewElement('tbody','sgh_menu_body')
        const sgh_menu_head = this.createNewElement('thead', 'sgh_menu_head')
        const sgh_thead_row = this.createNewElement('tr','sgh_thead_row' )
        const table_header_data = this.createNewElement('th', 'sgh_thead_data')

        table_header_data.textContent = `Escolha até ${choicesAmount} faixas para tocar`
        table_header_data.setAttribute('tabindex', 1)

        sgh_thead_row.append(table_header_data)
        sgh_menu_head.append(sgh_thead_row)
        sgh_menu_table.append(sgh_menu_head, sgh_menu_body)
        
        const samples = sightsData[this.location.name].samples
        
        createAndSetMenuRows(samples, sgh_menu_body)

        choices_made_EL.textContent = choicesMade
        choices_amount_EL.textContent = choicesAmount
        const bar = document.createTextNode('/')

        setting_board_choices_control.append(choices_made_EL, bar, choices_amount_EL)

        sgh_menu.append(setting_board_img, sgh_menu_table, setting_board_img_control, setting_board_choices_control)
        this.element.appendChild(sgh_menu)
        
        const sgh_sounds_board_wrapper = this.createNewElement('div','sgh_sounds_board_wrapper container',)
        const sgh_sounds_board = this.createNewElement('div','sgh_sounds_board')

        for(let i = 0; i < 20; i++){
            let sample_img_wrapper = this.createNewElement('div', 'sample_img_wrapper container')
        
            sgh_sounds_board.append(sample_img_wrapper)
        }
        
        const sgh_soundControl_wrapper = this.createNewElement('div', 'sgh_soundControl_wrapper container')
        const play_pause_btn = this.createNewElement('button', 'play_pause_btn', 'play_pause_btn')
        const play_pause_icon = this.createNewElement('i', 'fa-solid fa-play')
        const trash_btn = this.createNewElement('button', 'trash_btn', 'trash_btn')
        const trash_icon = this.createNewElement('i', 'fa-solid fa-trash')
        const home_btn = this.createNewElement('button', 'home_btn', 'home_btn')
        const home_icon = this.createNewElement('i', 'fa-solid fa-house')
        
        let initialControlsTabindex = this.optionsAmount + 2

        play_pause_btn.setAttribute('tabindex', initialControlsTabindex++)
        trash_btn.setAttribute('tabindex', initialControlsTabindex++)
        home_btn.setAttribute('tabindex', initialControlsTabindex)
        
        play_pause_btn.append(play_pause_icon)
        trash_btn.appendChild(trash_icon)
        home_btn.appendChild(home_icon)
        sgh_soundControl_wrapper.append(home_btn,play_pause_btn, trash_btn)
        sgh_sounds_board_wrapper.append(sgh_sounds_board, sgh_soundControl_wrapper)
        this.element.append(sgh_sounds_board_wrapper)
    }
    setContainerElements(){
        const background_URL = sightsData[this.location.name].bgUrl
        this.setBackground(background_URL)
        
        const sight = document 
        const play_pause_btn = sight.getElementById('play_pause_btn')
        const trash_btn = sight.getElementById('trash_btn')
        const home_btn = sight.getElementById('home_btn')
        const sgh_menu_row = sight.querySelectorAll('.sgh_menu_row')

        trash_btn.addEventListener('click', () => this.handleTrashToReset())
        play_pause_btn.addEventListener('click',(e) => this.handlePlayAndPauseBtn(e, this.chosenAnimalsNameArr))
        home_btn.addEventListener('click', (e) => this.callHomeScene(App))
        sight.addEventListener('keydown', this.handleKeyDown)
        sight.addEventListener('keyup', this.handleControlersSelection)
        if(sgh_menu_row){

            sgh_menu_row.forEach((row, i) => {
                row.addEventListener('focus', (e) => this.onTableElementFocus(e))
                row.addEventListener('click', (e) => this.chooseAnimal(e ,i))
            })
        }
        [play_pause_btn, trash_btn, home_btn].forEach(btn => {
            btn.addEventListener('focus', e => this.onControlsElementFocus )
        })
    }

    createNewElement(el, cl = '', id = '', src = ''){
        const element = document.createElement(el)

        if(cl) element.classList.add(...cl.split(' ')) 
        if(id)  element.setAttribute('id', id);
        if(src) element.setAttribute('src', src);

        return element
    }
    resetSampleBoard(){
        const activeSamples = document.querySelectorAll('.sample_img')
        if(!activeSamples) return

        activeSamples.forEach(sample => removeElementFromDOM(sample))
        
        function removeElementFromDOM(element){
            if(typeof element === 'string'){
                element = document.getElementById(element)
                
                if(!element){    
                    element = document.querySelector(element)
                } 
            }
            
            if(element && element.parentNode){
                element.parentNode.removeChild(element)
            } else {
                console.warn("Elemento não encontrado ou já foi removido do DOM.")
            }
        }
        this.chosenAnimalsNameArr = []
        this.chosenContainerIdxArr = []
        this.updateChoicesInterface()
    }
    playAudio(audioBuffer, volume = .05, loop = false){   
            const src = this.audioContext.createBufferSource()
            src.buffer = audioBuffer
            src.loop = loop
    
            let newVolume = gameData.isMute === true ? 0 : volume
            this.gainNode.gain.value = newVolume 
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
    playAnimalSound(audioBuffer, animalSoundName, volume = 0.3, delay = 0, loop = true) {
        let src, gainNode;

        // Verifica se o áudio já está sendo reproduzido
        if (animalSoundName in this.currentAudio) {
            let pausedAt = this.currentAudio[animalSoundName].config.pausedAt || 0;
    
            src = this.audioContext.createBufferSource();
            gainNode = this.currentAudio[animalSoundName].config.gainNode;
    
            src.buffer = audioBuffer;
            src.loop = loop;
    
            // Ajusta o volume com base no mute e no volume passado como parâmetro
            let adjustedVolume = gameData.isMute ? 0 : volume;
            gainNode.gain.value = adjustedVolume;
    
            src.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
    
            // Inicia a reprodução com o delay e o ponto de pausa
            src.start(delay, pausedAt);
    
            // Atualiza o estado do áudio
            this.currentAudio[animalSoundName] = {
                config: {
                    startTime: delay,
                    pausedAt: undefined,
                    gainNode: gainNode,
                    volume: adjustedVolume
                },
                audio: src
            };
        } else {
            // Cria novos nós de áudio se o som não estiver sendo reproduzido
            src = this.audioContext.createBufferSource();
            gainNode = this.audioContext.createGain();
    
            src.buffer = audioBuffer;
            src.loop = loop;
    
            // Ajusta o volume com base no mute e no volume passado como parâmetro
            let adjustedVolume = gameData.isMute ? 0 : volume;
            gainNode.gain.value = adjustedVolume;
    
            src.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
    
            // Inicia a reprodução com o delay
            src.start(delay, 0);
    
            // Armazena o estado do áudio
            this.currentAudio[animalSoundName] = {
                config: {
                    startTime: delay,
                    pausedAt: undefined,
                    gainNode: gainNode,
                    volume: adjustedVolume
                },
                audio: src
            };
        }
    
        // Retorna o source e o gainNode para manipulação futura
        return { source: src, gainNode: gainNode };
    }
    stopAnimalSound(soundName){
        if(soundName in this.currentAudio){
            let pausedAt = this.currentAudio[soundName].audio.context.currentTime
            
            this.currentAudio[soundName].audio.stop()
            this.currentAudio[soundName].config.pausedAt = pausedAt
            this.isPLaying = false
        } else {
            throw new Error('It is not possible to stop an inexisted audio')
        }

    }
    resetContainerToNewScene(classStr){
        let classNm = classStr.split(' ').map(str => capitalize(str)).join('_')
        const mainC = document.getElementById('main')
        mainC.innerHTML = " "
        classNm += ' container'
        mainC.className = classNm
        
        new App(this, classNm)

        function capitalize(str) {
            if (!str) return "";
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    }
    disposeAudioContext(){
        if(this.audioContext){
            this.audioContext.close()
            this.audioContext = null
        }
    }
    setBackground(url) {
        this.element.style.backgroundImage = `url(${url})`
    }
    handlePlayAndPauseBtn(e, arry) {
            if (arry.length === 0){
                this.popUpMessage("Escolha pelo menos uma faixa para tocar!")
                return;
            } 

            const icon = play_pause_btn.children[0];
            const isBtnOnPlayingMode = icon.classList.contains('fa-play');
        
            icon.classList.toggle('fa-play', !isBtnOnPlayingMode);
            icon.classList.toggle('fa-pause', isBtnOnPlayingMode);
        
            play_pause_btn.style.color = isBtnOnPlayingMode ? colors.redDeep_main : colors.blue_main;
            play_pause_btn.style.borderColor = isBtnOnPlayingMode ? colors.redDeep_main : colors.blue_main;
        
            if (isBtnOnPlayingMode) {
                this.chosenAnimalsNameArr.forEach(obj => this.playAnimalSound(gameAssets[obj.slot], obj.slot, obj.volume, obj.delay, obj.loop));
                this.isPLaying = true
            } else {
                this.chosenAnimalsNameArr.forEach(obj => this.stopAnimalSound(obj.slot));
            }
    }
    handleTrashToReset(e) {
        if(this.isPLaying){
            this.handlePlayAndPauseBtn(e, this.chosenAnimalsNameArr)
            this.chosenAnimalsNameArr.forEach(obj => {
                this.stopAnimalSound(obj.slot)
            })
        }
        this.resetSampleBoard()
    }
    controlersSelection(e) {
        e.preventDefault( )
        const ctrWrapper = document.querySelector('.sgh_soundControl_wrapper')
        let key = e.key
        let isThereOptselected = document.querySelector('.rowOnFocus')
        let isChoicesFilled = this.chosenAnimalsNameArr.length >= 5
        switch(key){
            case 'Enter':
                e.preventDefault( )
                if(this.optFlag){
                    if(isThereOptselected && !isChoicesFilled){
                        isThereOptselected.click()
                    }
                    if(isChoicesFilled) {
                        this.popUpMessage("Numero maximo de escolhas atingido")
                    }
                } else if(this.ctrFlag){
                    e.preventDefault()

                    let activeElmIsIn;
                    ctrWrapper ? activeElmIsIn = ctrWrapper.contains(document.activeElement) : true
                    if(activeElmIsIn) document.activeElement.click()

                    aux++
                }
                break;
            
            case 'Backspace':
                this.handleTrashToReset()
                break;

            case 'Escape':
                this.callHomeScene(App)
                break
            default:
                break;
        }
    }
    resetCTRFlag()  {
        this.ctrFlag = false;
    }
    optionNavigation(e) {

        let key = e.key
        const optionOnFocus = document.querySelector('.rowOnFocus')
        const optionsAmount = document.querySelectorAll('.sgh_menu_opt').length

        const initialIndex = 0
        let lastIndex = optionsAmount - 1
        let lastOpt, lastOptIdx;

        if(key === 'ArrowDown' || key === 'ArrowUp'){
            this.resetCTRFlag()
            this.optFlag = true

            switch(key){
                case 'ArrowDown':
                
                e.preventDefault()
                
                if(optionOnFocus){
                        lastOptIdx = Number(optionOnFocus.getAttribute('index'))

                        let nextIdx = (lastOptIdx + 1 + optionsAmount) % optionsAmount

                        let nextOpt = document.querySelector(`.sgh_menu_row[index="${nextIdx}"]`)
                        if(nextOpt) nextOpt.focus()

                    } else {
                        
                        let firstOpt = document.querySelector(`.sgh_menu_row[index="${initialIndex}"]`)
                        if(firstOpt){
                            firstOpt.focus()
                        } else {
                            console.warn("Primeiro elemento NÃO ENCONTRADO !")
                        }
                    }
                break;

                case 'ArrowUp':

                    e.preventDefault()

                    if(optionOnFocus){
                        lastOptIdx = Number(optionOnFocus.getAttribute('index'))
                        let prevIdx = (lastOptIdx - 1 + optionsAmount) % optionsAmount

                        let prevOpt = document.querySelector(`.sgh_menu_row[index="${prevIdx}"]`)
                        if(prevOpt) prevOpt.focus()
                   
                    } else {
                        lastOpt = document.querySelector(`.sgh_menu_row[index="${lastIndex}"]`)
                        if(lastOpt) lastOpt.focus()
                    }
                break;
            }
        } 
    }
    controlsNavigation(e) {
        let key = e.key

        // evita erros na reprodução dos audios selecionados
        if(key === 'Enter'){
            e.preventDefault()
        }

        if(key !== 'ArrowRight' && key !== 'ArrowLeft') return
        if(key === 'ArrowRight' || key !== 'ArrowLeft') this.optFlag = false

        const controlsAmount = 3
        let nextIdx
        const soundControls_wrapper = document.querySelector('.sgh_soundControl_wrapper')
        
        if(!soundControls_wrapper){
            console.warn(`O elemento '.sgh_soundControl_wrapper' não foi encontrado`)
            return
        }
        
        if(!this.ctrFlag){
            soundControls_wrapper.children[this.initialControlsIndex].focus()
            this.ctrFlag = true
            this.ctrCurrentIdx = this.initialControlsIndex
            return
        }

        switch(key){
            case "ArrowRight":
                nextIdx = (this.ctrCurrentIdx + 1 + controlsAmount) % controlsAmount
                soundControls_wrapper.children[nextIdx].focus()
                this.ctrCurrentIdx = nextIdx
                break;
                
            case "ArrowLeft":

                document.activeElement.blur()

                nextIdx = (this.ctrCurrentIdx - 1 + controlsAmount) % controlsAmount
                soundControls_wrapper.children[nextIdx].focus()
                this.ctrCurrentIdx = nextIdx
                break;
        }
    }
    onTableElementFocus(e) {
        const rowOnFocus = document.querySelector('.rowOnFocus')
        let isArrayFilled  = this.chosenAnimalsNameArr.length >= 5

        if(rowOnFocus){
            rowOnFocus.classList.remove('rowOnFocus')
        } 
        e.target.classList.add('rowOnFocus')
        this.ctrFlag = false
        this.optFlag = true
    }
    onControlsElementFocus(e){
        this.ctrFlag = true
        this.optFlag = false
    }
    chooseAnimal(e){
        // console.clear()
        let isChoicesFilled = this.chosenAnimalsNameArr.length >= 5
        if(isChoicesFilled){
            this.popUpMessage("Numero maximo de escolhas atingido")
            return
        }

        const samples = sightsData[this.location.name].samples

        const animalName = e.target.textContent.split(' ').map(str => str.toLocaleLowerCase()).join(' ');
        const animalObjArray = Object.values(samples)

        let animalObj = animalObjArray.find((obj) => obj.alt === animalName)
        
        if(this.chosenAnimalsNameArr.some(item => item.slot === animalObj.soundName)){
            return
        }

        const samplesWrapper = document.querySelectorAll('.sample_img_wrapper')
        let {delay, volume, loop} = animalObj

        let img = this.createNewElement('img', 'sample_img', undefined, animalObj.img_src)
        img.setAttribute('alt', animalObj.alt)
        let slot = samplesWrapper[this.randomNumberExcluding(this.chosenContainerIdxArr)]
        slot.innerHTML = ''
        slot.appendChild(img)
        this.chosenAnimalsNameArr.push({
            slot: animalObj.soundName,
            delay : delay,
            volume: volume,
            loop: loop
        })
        this.updateChoicesInterface()
        e.target.classList.add('rowOnFocus')
    }
    updateChoicesInterface(){
        const choicesMadeEl = document.querySelector('.sgh_choices_made')
        let amount = this.chosenAnimalsNameArr.length
        if(choicesMadeEl){
            choicesMadeEl.textContent = amount
            choicesMadeEl.style.color = amount >= 5 ? colors.red_negative : colors.white  
        }
    }
    randomNumberExcluding(list) {
        let randomNumber
        do {
           randomNumber =  Math.floor(Math.random() * 20) + 1
        } while (randomNumber === 5 || randomNumber === 10 || list.includes(randomNumber - 1))
        
        list.push(randomNumber - 1)
        return randomNumber - 1
    }
    removeEventsRegistered(){
        const sight = document 
        const play_pause_btn = sight.getElementById('play_pause_btn')
        const trash_btn = sight.getElementById('trash_btn')
        const home_btn = sight.getElementById('home_btn')
        const sgh_menu_row = sight.querySelectorAll('.sgh_menu_row')

        trash_btn.removeEventListener('click', () => this.handleTrashToReset())
        play_pause_btn.removeEventListener('click',(e) => this.handlePlayAndPauseBtn(e, this.chosenAnimalsNameArr))
        home_btn.removeEventListener('click', (e) => this.callHomeScene(App))
        sight.removeEventListener('keydown', this.handleKeyDown)
        sight.removeEventListener('keyup', this.handleControlersSelection)
        if(sgh_menu_row){
            sgh_menu_row.forEach((row, i) => {
                row.removeEventListener('focus', (e) => this.onTableElementFocus(e ,i))
                row.removeEventListener('click', (e) => this.chooseAnimal(e ,i))
            })
        }
    }
    popUpMessage(message, nxtElem, delay = 2500, isVisible = true, isDurable = true, chaining = false){   // EXIBE MENSAGEM NO POPUP VISÍVEL
        const popUp = document.getElementById('popUpMessage')
        const popupText = document.querySelector('.popupText')
        const nextFocusElement = document.querySelector(nxtElem)
        let display = popUp.style.display
        
        popUp?.classList.toggle('animated', !popUp.classList.contains('animated'))

        if(display != 'flex')   popUp.style.display = 'flex'
        
        //o torna visível na interface e nas ferramentas de accessbilidade
        popUp.removeAttribute('hidden') // por isso está fora do if 
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
    callHomeScene(homeScene){
        this.removeEventsRegistered()
        this.stopCurrentAudio()
        this.element.remove()

        new homeScene(true)
    }
}

function capitalizeStr(str) {
    if(!str || typeof str !== 'string') return
    return str.charAt(0).toLocaleUpperCase() + str.slice(1).toLocaleLowerCase()
}
export{
    Sights
}